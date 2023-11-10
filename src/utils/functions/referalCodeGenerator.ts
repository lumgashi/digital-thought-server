function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElem(arr) {
  return arr[randomInt(0, arr.length - 1)];
}

function sequenceElem(config, sequenceOffset, charIndex) {
  return config.unique_charset[
    Math.floor(
      sequenceOffset /
        Math.pow(config.unique_charset.length, config.length - charIndex - 1),
    ) % config.unique_charset.length
  ];
}

function charset(name) {
  const charsets = {
    numbers: '0123456789',
    alphabetic: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    alphanumeric:
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  };
  return charsets[name];
}

function repeat(str, count) {
  let res = '';
  for (let i = 0; i < count; i++) {
    res += str;
  }
  return res;
}

function Config(config) {
  config = config || {};
  this.count = config.count || 1;
  this.length = config.length || 8;
  this.charset = config.charset || charset('alphanumeric');
  this.unique_charset = uniqueCharset(this.charset);
  this.prefix = config.prefix || '';
  this.postfix = config.postfix || '';
  this.pattern = config.pattern || repeat('#', this.length);

  if (config.pattern) {
    this.length = (config.pattern.match(/#/g) || []).length;
  }
}

function uniqueCharset(charset) {
  const map = {};
  const result = [];

  for (let i = 0; i < charset.length; i++) {
    const sign = charset[i];

    if (!map[sign]) {
      result.push(sign);
      map[sign] = true;
    }
  }

  return result.join('');
}

function generateOne(config, sequenceOffset) {
  let generateIndex = 0;

  const code = config.pattern
    .split('')
    .map(function (char) {
      if (char === '#') {
        if (isNaN(sequenceOffset)) {
          return randomElem(config.charset);
        }
        return sequenceElem(config, sequenceOffset, generateIndex++);
      } else {
        return char;
      }
    })
    .join('');
  return config.prefix + code + config.postfix;
}

function maxCombinationsCount(config) {
  return Math.pow(config.unique_charset.length, config.length);
}

function isFeasible(config) {
  return maxCombinationsCount(config) >= config.count;
}

function generate(config, sequenceOffset?: number) {
  config = new Config(config);
  let count = config.count;

  if (!isFeasible(config)) {
    throw new Error('Not possible to generate the requested number of codes.');
  }

  sequenceOffset = +sequenceOffset;

  if (!isNaN(sequenceOffset)) {
    if (sequenceOffset < 0) {
      sequenceOffset = 0;
    } else if (sequenceOffset >= maxCombinationsCount(config)) {
      sequenceOffset = maxCombinationsCount(config) - 1;
    }
  }

  const map = {};
  const codes = [];

  while (count > 0) {
    const code = generateOne(config, sequenceOffset);

    if (!map[code]) {
      codes.push(code);
      map[code] = true;
      count--;
    }

    sequenceOffset++;
  }

  return codes;
}

const referral_codes = {
  generate: generate,
  charset: charset,
};
export default referral_codes;
