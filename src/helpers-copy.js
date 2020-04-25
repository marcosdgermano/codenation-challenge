const api = require('./api.js');
const fs = require('fs');
const request = require('async-request');
const { alphabet, getUrl } = require('./utils');

const getMessage = async () => {
    try {
        const response = await request(getUrl);
        console.log('response >>>>>>>', response.statusCode);
        return JSON.parse(response.body);
    } catch(e) {
        console.log('err >>>>>>>>>', e);
        return null;
    }
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