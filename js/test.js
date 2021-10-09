'use strict';

const rootBlock = document.getElementById('js-container'); // <div class="row" id="js-container">
const cloneRoot = Object.assign(rootBlock.cloneNode(true)); // <div class="row" id="js-container">
const importBlock = cloneRoot.children[2]; // <div class="good_import">

removeElementsByClass('good_import');
removeElementsByClass('good_import');

function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  elements[0].parentNode.removeChild(elements[0]);
}

async function getToken() {
  const response = await fetch('https://izibabyshop.pp.ua/api/login_check', {
    method: 'POST',
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'anton@test.com',
      password: '3547'
    })
  });

  const json = await response.json();
  return json.token;
}

const token = getToken().then((res) => res);

async function getMembersByToken() {
  const response = await fetch('https://izibabyshop.pp.ua/api/user_imports', {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/ld+json, application/json',
      Authorization: `Bearer ${await token}`
    }
  });

  return await response.json();
}

const hydraMembers = getMembersByToken().then((res) => {
  const entries = Object.entries(res);
  return entries[3][1];
});

async function innerHTML() {
  const members = await hydraMembers;

  members.forEach(async (member) => {
    const sources = member.userImportSources;

    const cloneImportBlock = Object.assign(importBlock.cloneNode(true)); // <div class="good_import">
    const parentInsertBlock = cloneImportBlock.children[1].children[1]; // <div class="col col_2">
    const insertBlock = cloneImportBlock.children[1].children[1].children[0]; // <div class="two_cols_2">
    const insertBlockClone = Object.assign(insertBlock.cloneNode(true)); // <div class="two_cols_2">

    rootBlock.append(cloneImportBlock);

    while (insertBlock.firstChild) {
      insertBlock.removeChild(insertBlock.firstChild);
    }

    sources.forEach(async (source) => {
      const element = source.split('/');
      const source_ID = element[3];
      const URL = `https://izibabyshop.pp.ua/api/user_import_sources/${source_ID}`;

      const response = await fetch(URL, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          Accept: 'application/ld+json',
          Authorization: `Bearer ${await token}`
        }
      });

      const json = await response.json();
      const filePath = json.filePath;

      const cloneInsertBlock = Object.assign(insertBlockClone.cloneNode(true)); // <div class="two_cols_2">
      const paragraphContainer = cloneInsertBlock.getElementsByClassName('file_item'); // <div class="file_item">
      const paragraph = paragraphContainer[0].firstChild.nextSibling;

      paragraph.innerHTML = filePath;
      parentInsertBlock.prepend(cloneInsertBlock);
    });
  });
}

innerHTML();
