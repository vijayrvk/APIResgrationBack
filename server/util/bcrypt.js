const bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(10);
const generator = require('generate-password');

const Bcrypt = function () { };

Bcrypt.prototype.encryptPassword = function (password) {
    return bcrypt.hashSync(password, salt);
};

Bcrypt.prototype.validatePassword = function (password, hash) {
    return bcrypt.compareSync(password, hash);
};

Bcrypt.prototype.randomPassword = function () {
    const password = generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
        uppercase: true
    });

    return password;
};

module.exports = new Bcrypt();
