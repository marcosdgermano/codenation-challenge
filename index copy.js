const sha1 = require('js-sha1');
const fs = require('fs');
const FormData = require('form-data');
const api = require('./src/api');
const { getMessage, decode, saveJSON } = require('./src/helpers-copy.js');

const main = async () => {
    const message = await getMessage();
    console.log('message >>>>>>>', message);
    message.decifrado = decode(message);
    message.resumo_criptografico = sha1(message.decifrado);
    saveJSON('answer.json', message);
}

main();

let formData = new FormData();
formData.append('file', formData);

api.post('/submit-solution?token=57861f6450c8f07d0d0d281b22ee269ab650feee', formData)
    .then(response => {
        console.log('response >>>>>>', response);
      })
    .catch(e => {
        console.log('error >>>>>>', e);
    });
