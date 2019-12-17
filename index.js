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


module.exports.generateOTCode = generateOTCode;

module.exports.ApiResponse = apiResponse;
module.exports.log = log;