/**
 * Server Configuration
 */

const SERVER_CONFIG = {
  port: 3000,
  routes: {
    home: "/",
    download: "/download",
    streamData: "/stream-data",
    streamJson: "/stream-json",
    clientJs: "/client.js",
  },
};

module.exports = { SERVER_CONFIG };
