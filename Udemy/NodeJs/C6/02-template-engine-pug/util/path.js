const path = require("path");

// deprecated
// module.exports = path.dirname(process.mainModule.filename);

// newer
module.exports = path.dirname(require.main.filename);