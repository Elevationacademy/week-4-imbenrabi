const express = require('express');
const path = require('path');

const store = [
    { name: "table", inventory: 3, price: 800 },
    { name: "chair", inventory: 16, price: 120 },
    { name: "couch", inventory: 1, price: 1200 },
    { name: "picture frame", inventory: 31, price: 70 }
]


const app = express();
const port = process.env.PORT;

//serving static files
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, '../node_modules')));

app.get('/', function (req, res) {
    console.log("request logged");
    res.send('Server is up and running smoothly');
})

app.get('/priceCheck/:name', (req, res) => {
    const name = req.params.name;
    const item = store.find(item => item.name === name);

    if (!item) {
        res.send({ price: null });
    }

    res.send({ price: item.price })
})

app.get('/buy/:name', (req, res) => {
    const name = req.params.name;
    const item = store.find(item => item.name === name);

    if (!item || item.inventory === 0) {
        res.send('Item out of stock');
    }

    item.inventory--
    res.send(item)
})

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
})