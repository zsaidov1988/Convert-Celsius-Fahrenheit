

const $ = (selector, node = document) => {
  return node.querySelector(selector);
}

const $$ = (selector, node = document) => {
  return node.querySelectorAll(selector);
}