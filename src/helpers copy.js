const api = require('./api.js');
const request = require('request');
const fs = require('fs');
const { alphabet } = require('./utils');

const getMessage = async () => {
    let response;
    
    await request.get('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=57861f6450c8f07d0d0d281b22ee269ab650feee', async (err, res, body) => {
        if (err) {
            console.log('err >>>>>>>>>', e);
            response = null;
        }
        await console.log('body >>>>>>>>', JSON.parse(body));
        response = JSON.parse(body);
    });

    console.log('response >>>>>>>>', response);
    return response;
}

const getIndex = (baseIndex) => {
    if (baseIndex < 0) {
        return 26 + baseIndex;
    }
    return baseIndex;
}

const decode = ({ cifrado, numero_casas }) => {
    const codedMessage = cifrado;
    const shift = numero_casas;
    let decodedMessage = '';

    [...codedMessage].forEach(char => { 
        let decodedChar = char;

        if (alphabet.includes(char)) {
            const index = getIndex(alphabet.indexOf(char) - shift);
            decodedChar = alphabet[index];
        }

        decodedMessage += decodedChar;
    });
    
    return decodedMessage;
}

const saveJSON = (fileName, data) => {
    const jsonData = JSON.stringify(data);

    if (fs.existsSync(fileName)) {
        fs.unlinkSync(fileName)
    }

    fs.writeFile(fileName, jsonData, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log('Save was successful')
    });
} 

exports.getMessage = getMessage;
exports.decode = decode;
exports.saveJSON = saveJSON;