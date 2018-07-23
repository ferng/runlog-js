const jsdom = require('jsdom');

const options = {
  resources: 'usable',
  runScripts: 'dangerously',
  beforeParse(window) {
    window.alert = window.console.log.bind(window.console);
  },
};

const { JSDOM } = jsdom;
const { document } = (new JSDOM('', options)).window;

global.document = document;
global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};
