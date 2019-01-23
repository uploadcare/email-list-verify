#!/usr/bin/env node

const verifier = require("email-verify");
const fs = require("fs");
const { promisify } = require("util");
const readline = require("readline");
const Queue = require("p-queue");
const cliSpinners = require("cli-spinners");
const ora = require("ora");
const arg = require("arg");

const verify = promisify(verifier.verify);

const pickRandomValue = obj => {
  const keys = Object.keys(obj);

  const randomValue = Math.round(Math.random() * (keys.length - 1));

  return obj[keys[randomValue]];
};

const spinner = ora({ text: "wtf...", spinner: pickRandomValue(cliSpinners) });
const queue = new Queue({ concurrency: 20 });
let firstLine = true;

try {
  const args = arg({
    // Types
    "--help": Boolean,
    "--output": String,

    // Aliases
    "-h": "--help",
    "-o": "--output"
  });

  const inputFile = args["_"][0];
  const outputFile = args["--output"] || "result.txt";

  if (!inputFile) {
    throw Error(
      "Requires default argument for input file: email-verificator [FILE]"
    );
  }

  const output = fs.createWriteStream(outputFile);
  const tool = readline.createInterface({
    input: fs.createReadStream(inputFile)
  });

  tool.on("line", line => {
    queue.add(() =>
      verify(line)
        .then(info => ({ result: info.success, info: info.info }))
        .catch(error => ({ result: false, info: error.message }))
        .then(({ result, info }) => {
          spinner.text = info;
          output.write(`${line}, ${+result}\n`);
        })
    );

    if (firstLine) {
      firstLine = false;
      spinner.start();

      queue.onIdle().then(() => {
        spinner.stopAndPersist({
          symbol: "✅",
          text: `results in ${outputFile}`
        });
      });
    }
  });
} catch (err) {
  console.log(err.message);
}
