const verifier = require("email-verify");
const fs = require("fs");
const { promisify } = require("util");
const readline = require("readline");
const Queue = require("p-queue");
const cliSpinners = require("cli-spinners");
const ora = require("ora");
const verify = promisify(verifier.verify);

const pickRandomValue = obj => {
  const keys = Object.keys(obj);

  const randomValue = Math.round(Math.random() * (keys.length - 1));

  return obj[keys[randomValue]];
};

const spinner = ora({ text: "wtf...", spinner: pickRandomValue(cliSpinners) });

const queue = new Queue({ concurrency: 10 });

const tool = readline.createInterface({
  input: fs.createReadStream("info.txt")
});

const outputFile = 'results.txt'
const output = fs.createWriteStream(outputFile);

let firstLine = true;

tool.on("line", line => {
  spinner.start();

  queue.add(() =>
    verify(line)
      .then(info => info.success)
      .catch(() => false)
      .then(result => {
        spinner.text = `${line} is ${result ? "valid" : "invalid"}`;
        output.write(`${line}, ${+result}\n`);
      })
  );

  if (firstLine) {
    firstLine = false;

    queue.onIdle().then(() => {
      spinner.stopAndPersist({ symbol: "✅", text: `results in ${outputFile}` });
    });
  }
});
