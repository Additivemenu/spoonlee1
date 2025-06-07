console.log("Hello c in es6");

import $ from "jquery"; // !use es6 to import jquery (but note jquery is in commonjs) -> webpack will handle all this for us
console.log($);

export default "c";
