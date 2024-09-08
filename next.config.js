module.exports = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          dns: false,
          fs: false,
          path: false,
          net: false,
          tls: false,
          'timers/promises': false,
        };
      }
      return config;
    },
  };
  