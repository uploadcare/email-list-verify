const verifier = require("email-verify");
const fs = require("fs");
const { promisify } = require("util");
const readline = require("readline");
const Queue = require("p-queue");
const verify = promisify(verifier.verify);

const queue = new Queue({ concurrency: 10 });

const tool = readline.createInterface({
  input: fs.createReadStream("info.txt")
});

const output = fs.createWriteStream("results.txt");

tool.on("line", line => {
  queue
    .add(() => verify(line))
    .then(info => info.success)
    .catch(() => false)
    .then(result => {
      output.write(`${line}, ${+result}\n`);
    });
});
