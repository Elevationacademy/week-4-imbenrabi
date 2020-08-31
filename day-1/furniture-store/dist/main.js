let MONEY = 100;
let CHAIR_PRICE = 0;

const fetchItemData = function () {
    let input = $("#item-input").val()
    $('#search-result').empty();

    $.get(`priceCheck/${input}`, function (item) {
        console.log(item)
        $('#search-result').append(`<div>Price: ${item.price}</div>`);
        $('#item-input').val('');

    })

}

const buyItem = function () {
    let input = $("#buy-input").val()
    $('#buy-result').empty();
    $('#buy-input').val('');

    $.get(`priceCheck/${input}`, function (item) {

        if (item.price > MONEY) {
            return $('#buy-result').append(`<div>Get a job!</div>`);
        }

        $.get(`buy/${input}`, function (item) {
            MONEY -= item.price;
            $('#wallet').empty();
            $('#wallet').append(`<p>Money: $${MONEY}</p>`);
            $('#buy-result').append(`<div>Congratulations, you've just bought ${item.name} for ${item.price}. There are ${item.inventory} left now in the store.</div>`);

        })

    })

}

$('#wallet').append(`<p>Money: $${MONEY}</p>`);
$('#search-btn').click(fetchItemData);
$('#buy-btn').click(buyItem);

setInterval(function () {
    $.get('/priceCheck/chair', (item) => {
        if (item.price >= CHAIR_PRICE) {
            CHAIR_PRICE = item.price;
            console.log('Waiting for the price to drop');
        } else {
            CHAIR_PRICE = item.price;
            console.log('bought a chair for less!');

        }
    })
}, 3000);


