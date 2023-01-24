'use strict';

const rootPath = require('app-root-path').toString();

// helper functions
const arr2string = arr => `[ ${arr.join(', ')} ]`;

const obj2string = obj => JSON.stringify(obj, null, 2);

// main function
const at = (msg = '') => {
  const stackTrace = new Error().stack
    // convert string to lines
    .split(/\n/)

    // remove lines outside of project or from `node:internal`
    .filter(line => line.match(rootPath) && !line.match(/Error|node:internal/));

  // finally clean it a bit by trimming, removing the full path and making it relative
  const where = stackTrace[0].trim()
    replace(rootPath, '.');

  // if there's a message, make it a printable string
  if (Array.isArray(msg)) {
    return `${where}\n${arr2string(msg)}`;
  } else if ('object' === typeof msg) {
    return (msg instanceof Error) ? `${where}\n${msg.stack}` : `${where}\n${obj2string(msg)}`;
  } else if (msg) {
    return `${where}\n${msg}`;
  } else {
    return `${where}`;
  }
};

module.exports = at;
