'use strict';

const { findAll, getText } = require('domutils');
const fetch = require('isomorphic-unfetch');
const { parseDOM } = require('htmlparser2');
const pkg = require('./package.json');

const API_URL = 'https://api.github.com/';
const UA = `${pkg.name}/${pkg.version} (${pkg.homepage})`;

(async function () {
  const html = await fetchGist(pkg.config.gistId);
  const records = parseHtml(html);
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

async function fetchGist(gistId) {
  const gistUrl = new URL(`/gists/${gistId}`, API_URL);
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': UA
  };
  const gist = await fetchJson(gistUrl, { headers });
  const [file] = Object.values(gist.files);
  return file.content;
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
