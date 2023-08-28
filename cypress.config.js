const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.test.gluk.pl/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  includeShadowDom: true,
  chromeWebSecurity: true,
  viewportHeight: 1080,
  viewportWidth: 1920, 
  video: false,

});
