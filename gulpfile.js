const got = require('got');
const writeJsonFile = require('write-json-file');
const {decode: decodePunycode} = require('punycode/');
const isPunycode = require('is-punycode');

const update = async () => {
  const {body} = await got('https://data.iana.org/TLD/tlds-alpha-by-domain.txt');

  const data = body
    .toLowerCase()
    .split('\n')
    .slice(1, -1)
    .map(item => isPunycode(item) ? decodePunycode(item.slice(4)) : item)
    .map(item => item.toLowerCase())
    .sort();

  await writeJsonFile('docs/v1/index.min.json', data, {indent: 0});
  await writeJsonFile('docs/v1/index.json', data, {indent: 2});
  console.log(`Saved ${data.length} TLDs!`);
};

function defaultTask(done) {
  update();
  done();
}

exports.default = defaultTask