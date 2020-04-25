const sha1 = require('js-sha1');
const fs = require('fs');
const asyncRequest = require('async-request');
const FormData = require('form-data');
// const request = require('request');
const { getMessage, decode, saveJSON } = require('./src/helpers-copy.js');
const { postUrl } = require('./src/utils');

const resolveChallenge = async () => {
    const message = await getMessage();
    message.decifrado = decode(message);
    message.resumo_criptografico = sha1(message.decifrado);
    saveJSON('answer.json', message);
}

const main = async () => {
    await resolveChallenge();

    // const formData = {
    //     answer: fs.createReadStream("answer.json"),
    // };

    const formData = new FormData();
    formData.append('answer', fs.createReadStream("answer.json"));

    const request = asyncRequest.defaults({ headers: { 'content-type': 'multipart/form-data' } });
    console.log('request >>>>>>>>>>>', request.defaults());
    let response;

    try {
        request.post({ url: postUrl, formData }, function optionalCallback(err, httpResponse, body) {
            if (err) {
                return console.error("upload failed:", err);
            }
            console.log("Upload successful!  Server responded with:", body);
        });
        // response = await request(postUrl, {
        //     method: 'POST',
        //     data: {
        //         formData
        //     },
        // });
        // console.log('eoq >>>>>>>>>>', response);
    } catch(err) {
        console.log('err >>>>>>>>>>', err);
    }
}

main();


// resolveChallenge();

// const formData = {
//     answer: fs.createReadStream("answer.json"),
// };

// request.post({ url: postUrl, formData }, function optionalCallback(err, _, body) {
//     if (err) {
//         return console.error("upload failed:", err);
//     }
//     console.log("Upload successful!  Server responded with:", body);
// });
