const sha1 = require('js-sha1');
const fs = require('fs');
const FormData = require('form-data');
const api = require('./src/api');
const { getMessage, decode, saveJSON } = require('./src/helpers.js');

const main = async () => {
    const message = await getMessage();
    console.log('codedMessage >>>>>', message.cifrado);
    message.decifrado = decode(message);
    console.log('decodedMessage >>>>>', message.decifrado);
    message.resumo_criptografico = sha1(message.decifrado);
    console.log('sha1 >>>>>', message.resumo_criptografico);
    saveJSON('answer.json', message);

 
    var form = new FormData();
    form.append('my_buffer', new Buffer(10));
    form.append('file', fs.createReadStream('answer.json'));

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    api.post('/submit-solution?token=57861f6450c8f07d0d0d281b22ee269ab650feee', form, config)
    .then(response => {
        console.log('response >>>>>>', response);
      })
    .catch(e => {
        console.log('error >>>>>>', e.response);
    });
}

main();