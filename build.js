'use strict';

const { findAll, getText } = require('domutils');
const fetch = require('isomorphic-unfetch');
const { parseDOM } = require('htmlparser2');
const pkg = require('./package.json');

const GITHUB_API_URL = 'https://api.github.com/';
const userAgent = `${pkg.name}/${pkg.version} (${pkg.homepage})`;

(async function () {
  const gist = await fetchGist(pkg.config.gistId);
  const [file] = Object.values(gist.files);
  const records = parseHtml(file.content);
  const dict = records.reduce((acc, [prefix, type]) => {
    return Object.assign(acc, { [prefix]: type });
  }, {});
  console.log(JSON.stringify(dict, null, 2));
}());

function parseHtml(html) {
  const doc = parseDOM(html);
  const rows = findAll(el => el.name === 'tr', doc);
  return rows.map(row => {
    const cells = findAll(el => el.name === 'td', [row]);
    return cells.map(cell => getText(cell));
  });
}

function fetchGist(gistId) {
  const gistUrl = new URL(`/gists/${gistId}`, GITHUB_API_URL);
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': userAgent
  };
  return fetchJson(gistUrl, { headers });
}

async function fetchJson(url, options) {
  const resp = await fetch(url, options);
  if (resp.status >= 200 && resp.status < 300) {
    return resp.json();
  }
  const err = new Error(resp.statusText);
  err.response = resp;
  throw err;
}
