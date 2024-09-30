/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1727365783637_8529';

  // add your middleware config here
  config.middleware = ['errorHandler'];

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/youtubeclone',
      options: {},
      // mongoose global plugins, expected a function or an array of function and options
      plugins: [],
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.jwt = {
    secret: '014d9d6c-7f3c-11ef-a273-033fd029655f',
    expiresIn: '1d',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
