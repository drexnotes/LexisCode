module.exports = {
  apps: [{
    name: 'OSD_API_SERVICE',
    script: "./src/server.js",
    instances: 1,
    watch: false,
    env_dev: {
      NODE_ENV: 'development'
    },
    env_staging: {
      NODE_ENV: 'staging'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
