const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  pluginOptions: {
    mode: 'production',
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false,
      enableBridge: false,
    },
  },
});
