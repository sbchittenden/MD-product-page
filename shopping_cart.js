var plate = document.getElementById('plate');

var donutObj = {};
var Plate = {};

donutObj.productName = 'Donut';
donutObj.productDiv = document.getElementById('Donut');
donutObj.productPrice = 1.50;
donutObj.onPlate = false;
donutObj.productID = '011';
donutObj.productQty = function() {
    var itemOptionList = this.productDiv.getElementsByTagName('option');
    // var to store item quantity
    var itemQty;
    // loop through item option list to find selected option
    for (var i = 0; i < itemOptionList.length; i++) {
        // if option selected is true
        if (itemOptionList[i].selected) {
            // get item qty and convert to number
            itemQty = +(itemOptionList[i].innerHTML);
        }
    }
    return itemQty;
};

Plate.createRow = function() {
    // create plate row
    var cartRow = document.createElement('div');
    cartRow.className = 'row cart_row';
    return cartRow;
};

Plate.createItemNameDiv = function() {
    // create item name div
    var itemNameDiv = document.createElement('div');
    itemNameDiv.className = 'col-1-2 item_name';
    return itemNameDiv;
};
