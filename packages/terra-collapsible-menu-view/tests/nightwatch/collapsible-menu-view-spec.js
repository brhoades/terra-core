/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const screenshot = require('terra-toolkit').screenshot;

module.exports = {
  before: (browser, done) => {
    browser.resizeWindow(browser.globals.width, browser.globals.height, done);
  },

  afterEach: (browser, done) => {
    screenshot(browser, 'terra-collapsible-menu-view', done);
  },

  'Displays a default collapsible-menu-view': (browser) => {
    browser
      .url(`http://localhost:${browser.globals.webpackDevServerPort}/#/tests/collapsible-menu-view-tests/default`)
      .assert.elementPresent('.terra-CollapsibleMenuView');
  },
};
