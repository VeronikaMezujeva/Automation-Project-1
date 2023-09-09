const {defineConfig} = require("cypress");

module.exports = defineConfig({
  projectId: 'j6t9d7',
    pageLoadTimeout: 15000,

    env: {
        firstCookieValue: "firstValue",
    },

    e2e: {
        setupNodeEvents(on, config) {
            return config;
        }
    },
});
