const express = require('express');
const validator = require('validator');
const router = express.Router();

const wordCounter = {};
const blacklist = ['*', '%', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', "'", '"']

router.get('/', (req, res) => {
    res.send('server up and running');
})

router.get('/word/:word', (req, res) => {
    const word = req.params.word;

    if (!wordCounter[word]) {
        res.send({ count: 0 });
    } else { res.send({ count: wordCounter[word] }); }
})

router.get('/total', (req, res) => {
    let total = 0;

    Object.keys(wordCounter).forEach(word => total += wordCounter[word]);
    res.send({ text: "Total count", count: total });
})

router.get('/ranking', (req, res) => {
    const wordObjArray = []

    Object.keys(wordCounter).forEach(word => wordObjArray.push({ [word]: wordCounter[word] }));
    const ranked = wordObjArray.sort(count => count);

    if (ranked.length <= 5) {
        res.send({ ranking: ranked });
    } else {
        res.send({ ranking: ranked.slice(0, 5) });
    }

})

router.get('/popular', (req, res) => {
    const popular = { text: null, count: 0 };

    Object.keys(wordCounter).forEach(word => {
        if (wordCounter[word] > popular.count) {
            popular.text = word;
            popular.count = wordCounter[word];
        }
    });

    res.send(popular);
})

router.post('/word/:word', (req, res) => {
    let word = validator.blacklist(req.params.word, blacklist);

    if (!wordCounter[word]) {
        wordCounter[word] = 0;
    }

    wordCounter[word]++;

    res.send({ text: `Added ${word}`, currentCount: wordCounter[word] });
})

router.post('/words/:sentence', (req, res) => {
    const sentence = req.params.sentence;
    const words = sentence.split(' ');

    let numNewWords = 0;
    let numOldWords = 0;

    const cleanWords = words.map(w => validator.blacklist(w, blacklist));

    cleanWords.forEach(w => {

        if (!wordCounter[w]) {
            numNewWords++;
            wordCounter[w] = 0;
        } else { numOldWords++; }

        wordCounter[w]++;
    })

    res.send({ text: `Added ${numNewWords} words, ${numOldWords} already existed`, currentCount: -1 });
})

module.exports = router;