const crypto = require("crypto");
const path = require("path");

module.exports = {

    logPath: () => {
        let pad = (num) => {
            return (num > 9 ? "" : "0") + num;
        }

        let time = new Date();
        let period  = time.getFullYear() + "" + pad(time.getMonth() + 1);
        return path.join(process.cwd(), "logs", period, pad(time.getDate())) + "-access.log";
    },

    crypto: (password) => {
        let shaSum = crypto.createHash("sha256");
        shaSum.update(password);
        return shaSum.digest("hex");
    }

};
