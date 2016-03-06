/**
 * Created by BreezeDust on 16/3/6.
 */
var crypto = require("crypto");
var Buffer = require("buffer").Buffer;
function md5(text) {
    var buf = new Buffer(text);
    var str = buf.toString("binary");
    return crypto.createHash("md5").update(str).digest("hex");
}

exports.md5=md5;
