#!/usr/bin/env node

const EmailValidator = require("email-deep-validator");
const fs = require("fs");
const { promisify } = require("util");
const readline = require("readline");
const Queue = require("p-queue");
const cliSpinners = require("cli-spinners");
const ora = require("ora");
const { usage, arg } = require("../src/args");

const emailValidator = new EmailValidator();
const verify = emailValidator.verify.bind(emailValidator);

const pickRandomValue = obj => {
  const values = Object.values(obj);
  return values[Math.floor(Math.random() * values.length)];
};

const spinner = ora({
  text: "starting...",
  spinner: pickRandomValue(cliSpinners)
});
let firstLine = true;

try {
  const args = arg();
  const inputFile = args.file;
  const outputFile = args.output;

  if (args.help || !inputFile) {
    return usage();
  }

  spinner.start();

  const output = fs.createWriteStream(outputFile);
  const input = readline.createInterface({
    input: fs.createReadStream(inputFile)
  });

  const queue = new Queue({ concurrency: args.concurrency });

  const extractResult = email => info => ({
    result: info.wellFormed && info.validDomain && info.validMailbox,
    info:
      info.wellFormed && info.validDomain && info.validMailbox
        ? `${email} is a valid address`
        : `${email} is an invalid address`
  });

  input.on("line", line => {
    queue.add(() =>
      verify(line)
        .then(extractResult(line))
        .catch(error => ({ result: false, info: error.message }))
        .then(({ result, info }) => {
          spinner.text = info;
          output.write(`${line}, ${result}\n`);
        })
    );

    if (firstLine) {
      firstLine = false;

      queue.onIdle().then(() => {
        spinner.stopAndPersist({
          symbol: "✅",
          text: `results in ${outputFile}`
        });
      });
    }
  });

  input.on("error", error => {
    console.log(error.message);
  });
} catch (err) {
  console.log(err.message);
}
