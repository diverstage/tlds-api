const got = require('got');
const writeJsonFile = require('write-json-file');
const {decode: decodePunycode} = require('punycode/');
const isPunycode = require('is-punycode');

const update = async () => {
  const {body} = await got('https://data.iana.org/TLD/tlds-alpha-by-domain.txt');

  const bodyArray = body
    .toLowerCase()
    .split('\n')

  const data = bodyArray
    .slice(1, -1)
    .map(item => isPunycode(item) ? decodePunycode(item.slice(4)) : item)
    .map(item => item.toLowerCase())
    .sort();

  const json = {
    'updated_at': bodyArray[0],
    data
  }

  await writeJsonFile('dist/v1/index.min.json', json, {indent: 0});
  await writeJsonFile('dist/v1/index.json', json, {indent: 2});
  console.log(`Saved ${json.length} TLDs! ${bodyArray[0]}`);
};

function defaultTask(done) {
  update();
  done();
}

exports.default = defaultTask