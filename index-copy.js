const sha1 = require('js-sha1');
const fs = require('fs');
const request = require('request');
const { getMessage, decode, saveJSON } = require('./src/helpers.js');

const resolveChallenge = async () => {
    const message = await getMessage();
    console.log('message >>>>>>>>>>', message);
    message.decifrado = decode(message);
    message.resumo_criptografico = sha1(message.decifrado);
    saveJSON('answer.json', message);
}


resolveChallenge();

// const url = 'https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=57861f6450c8f07d0d0d281b22ee269ab650feee';

// const formData = {
//     answer: fs.createReadStream("answer.json"),
// };

// request.post({ url, formData }, function optionalCallback(err, httpResponse, body) {
//     if (err) {
//         return console.error("upload failed:", err);
//     }
//     console.log("Upload successful!  Server responded with:", body);
// });
