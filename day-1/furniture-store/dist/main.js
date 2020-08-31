const changeColor = function (div) {
    div.style.backgroundColor = "#3498db"
}

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

    $.get(`buy/${input}`, function (item) {
        console.log(item)
        $('#buy-result').append(`<div>ongratulations, you've just bought ${item.name} for ${item.price}. There are ${item.inventory} left now in the store.</div>`);
        $('#buy-input').val('');

    })

}

$('#search-btn').click(fetchItemData);
$('#buy-btn').click(buyItem);

