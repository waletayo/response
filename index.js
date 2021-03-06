const jwt = require("jsonwebtoken");
const Q = require("q");
const bcrypt = require("bcryptjs");

function log(tag, value) {
    console.log("-------------------------------------------------------------------------------");

    console.log(tag, value);

    console.log("-------------------------------------------------------------------------------");

}

function apiResponse(success, code, message, data = undefined, server_err = undefined) {
    switch (success) {
        case true: {
            return {
                success: success,
                code: code,
                message: message,
                data: data
            };
        }
        case false: {
            return {
                success: success,
                code: code,
                message: message,
                server_error: server_err
            };
        }
    }
}

//generate OTP
function generateOTCode(size = 6, alpha = false) {
    let characters = alpha ? '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' : '0123456789';
    characters = characters.split('');
    let selections = '';
    for (let i = 0; i < size; i++) {
        let index = Math.floor(Math.random() * characters.length);
        selections += characters[index];
        characters.splice(index, 1);
    }
    return selections;
};


function fileExt(files) {
    return files.split('.').pop();
}

function signToken(id, secret) {
    return jwt.sign({id}, secret);
}

function hashedPassword(password, saltRounds) {
    return new Q.Promise(async (resolve, reject) => {
        await bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) reject(err);
            password = hash;
            console.log("pass", password);
            resolve(hash)

        })

    })

}

function comparepassword(password, login_password) {
    return new Q.Promise(async (resolve, reject) => {
        await bcrypt.compare(password, login_password, function (err, isMatch) {
            if (err) reject(err);
            resolve(isMatch)
        })
    })

}

module.exports.generateOTCode = generateOTCode;
module.exports.signToken = signToken;
module.exports.hashedPassword = hashedPassword;
module.exports.comparepassword = comparepassword;
module.exports.fileExt = fileExt;
module.exports.ApiResponse = apiResponse;
module.exports.log = log;
