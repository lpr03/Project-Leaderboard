// next.config.js
module.exports = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                child_process: false,
                fs: false,
                net: false,
                tls: false,
            };
        }

        return config;
    },
};
