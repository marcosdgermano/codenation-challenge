const sha1 = require('js-sha1');
const fs = require('fs');
const request = require('request');
const { getMessage, decode, saveJSON } = require('./src/helpers.js');
const { postUrl } = require('./src/utils');

const resolveChallenge = async () => {
    const message = await getMessage();
    console.log('message >>>>>>>>>>', message);
    message.decifrado = decode(message);
    message.resumo_criptografico = sha1(message.decifrado);
    saveJSON('answer.json', message);
}


resolveChallenge();

const formData = {
    answer: fs.createReadStream("answer.json"),
};

request.post({ url: postUrl, formData }, function optionalCallback(err, httpResponse, body) {
    if (err) {
        return console.error("upload failed:", err);
    }
    console.log("Upload successful!  Server responded with:", body);
});
