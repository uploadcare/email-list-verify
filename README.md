# Email-list-verify

<a href="https://uploadcare.com/?utm_source=github&utm_campaign=email-list-verify">
    <img align="right" width="64" height="64"
         src="https://ucarecdn.com/2f4864b7-ed0e-4411-965b-8148623aa680/uploadcare-logo-mark.svg"
         alt="">
</a>

CLI-tool to Verify a list of emails in a file. `email-list-verify` is fast,
lightweight, and helps validate emails stored in a plain text file where each
email sits on a separate line (a single-column CSV does the trick too).

The validation accuracy is similar to that of the free services you can find
in organic search results. We tested the accuracy on the sample of 1000 emails.

The output CSV file will have two unnamed columns holding emails and check
results respectively.

In the check results you will get the three possible values:

* `true`, email is valid.
* `false`, email is invalid.
* `null`, email validation is disabled on a mail service provider, in many cases
  that can be considered `true`.

The `email-list-verify` script is multi-threaded and allows controlling its
concurrency via the `-c` option, see [CLI Usage](#cli-usage).

<!-- toc -->

* [Requirements](#requirements)
* [Install](#install)
* [CLI Usage](#cli-usage)
* [Security issues](#security-issues)
* [Feedback](#feedback)
* [Authors](#authors)
* [License](#license)

<!-- tocstop -->

<!-- Long description. -->

## Requirements

You will need NodeJS and npm to run `email-list-verify`,

* [Get NodeJs][ext-nodejs-get]
* [Get npm][ext-npm-get]

## Install

```bash
npm i -g email-list-verify
```

or

```bash
yarn add global email-list-verify
```

## CLI Usage

```bash
Usage

  $ email-list-verify -o mails.csv mails-to-test.csv
  $ email-list-verify -c 50 mails.csv
  $ email-list-verify --help

Options

  --file, file               The input file with emails.
  -o, --output file          The output file.
  -c, --concurrency number   Concurrency.
  -h, --help                 Print this usage guide.
```

While most of the options are straightforward, `-c` could use additional
explanation: it controls the number of threads for executing
`email-list-verify` and defaults to `20`. Depending on the speed of your
internet connection, you can set it to lower (slower) or higher values (faster).

## Security issues

If you think you ran into something in Uploadcare libraries which might have
security implications, please hit us up at
[bugbounty@uploadcare.com][uc-email-bounty] or Hackerone.

We'll contact you personally in a short time to fix an issue through co-op and
prior to any public disclosure.

## Feedback

Issues and PRs are welcome. You can provide your feedback or drop us a support
request at [hello@uploadcare.com][uc-email-hello].

## Authors

* [Elijah][dayton-link], Idea, Readme
* [Dmitry Ivakhnenko][jeetiss-link], Code
* [Siarhei Bautrukevich][bautrukevich-link], Review

## License

Released under the [MIT License](LICENSE).

[ext-nodejs-get]: https://nodejs.org/en/download/
[ext-npm-get]: https://www.npmjs.com/get-npm
[badge-stack-img]: https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat
[badge-stack-url]: https://stackshare.io/uploadcare/stacks/
[uc-email-bounty]: mailto:bugbounty@uploadcare.com
[uc-email-hello]: mailto:hello@uploadcare.com
[jeetiss-link]: https://github.com/jeetiss
[dayton-link]: https://github.com/dayton1987
[bautrukevich-link]: https://github.com/bautrukevich
