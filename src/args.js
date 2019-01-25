const usage = require("command-line-usage");
const commandLineArgs = require("command-line-args");
const package = require("../package.json");

const options = [
  {
    name: "file",
    typeLabel: "{underline file}",
    description: "The input file with emails.",
    type: String,
    defaultOption: true
  },
  {
    name: "output",
    typeLabel: "{underline file}",
    description: "The output file.",
    type: String,
    alias: "o",
    defaultValue: "result.csv"
  },
  {
    name: "concurrency",
    typeLabel: "{underline number}",
    description: "Concurrency.",
    type: Number,
    alias: "c",
    defaultValue: 20
  },
  {
    name: "help",
    description: "Print this usage guide.",
    alias: "h",
    type: Boolean
  }
];

const sections = [
  {
    header: "Email-verificator",
    content: package.description
  },
  {
    header: "Options",
    optionList: options
  },
  {
    header: "Usage",
    content: [
      "$ email-verificator {bold -o} {underline mails.csv} {underline mails-to-test.csv}",
      "$ email-verificator {bold -c} {underline 50} {underline mails.csv}",
      "$ email-verificator {bold --help}"
    ]
  }
];

const help = usage(sections);

module.exports = {
  usage: () => console.log(help),
  arg: () => commandLineArgs(options)
};
