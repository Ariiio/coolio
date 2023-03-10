const encryptor = require('./encryptor');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get('/', (req, res) => {
    res.send('To get to the documentation put "/documentation" after the base url');
});

app.get('/documentation', (req, res) => {
    res.send(`Welcome to the official Neodym documentation!<br /><br />Encrypt:<br />To encrypt something, simply eneter the base url (/) and add "/encrypt/[your text goes here]". You can add spaces by writing "%20" instead of a space. Once entered, you will have everything displayed, ready to be retrieved.<br /><br />Decrypt:<br />To decrypt something, simply eneter the base url (/) and add "/decrypt/[encrypted message]/[key]/[shift]". Once entered, the decrypted message will be displayed and is ready to be retrieved.<br /><br />Implementation (in python for easy example):<br />Here's the script<br /><br />import requests<br />r = requests.get('http://localhost:3000/encrypt/testing')<br />encryption_list = r.json()<br />print(encryption_list)<br /><br />This gives you an list as an output from which you can get needed data. Obvously you'd have to use a real url instead of the localhost used here<br /><br /><br /><br />Thank you for choosing and buying Neodym!`);
});

app.get('/encrypt/:inputText', (req, res) => {
    const text = req.params.inputText;
    const encrypted = encryptor.encrypt(text);
    try {
        res.json(encrypted);
    } catch (error) {
        res.json(error);
    }
});

app.get('/decrypt/:inputText/:inputKey/:inputShift', (req, res) => {
    const text = req.params.inputText;
    let shift = req.params.inputShift;
    shift = Number(shift);
    const key = req.params.inputKey;
    const decrypted = encryptor.decrypt(text, key, shift);
    try {
        res.json(decrypted);        
    } catch (error) {
        res.json(error);
    }
});

app.listen(PORT);