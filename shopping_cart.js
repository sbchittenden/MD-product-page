var donutButton = document.getElementById('add_011');

var plate = document.getElementById('plate');

var donutObj = {};
var Plate = {};
var itemButton = {};

donutObj.productName = 'Donut';
donutObj.productDiv = document.getElementById('Donut');
donutObj.productPrice = 1.50;
donutObj.onPlate = false;
donutObj.productID = '011';
donutObj.plateQty = 0;
donutObj.getQty = function() {
    var itemOptionList = donutObj.productDiv.getElementsByTagName('option');
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
    return itemQty + this.plateQty;
};

Plate.createItemRow = function(productID) {
    // create plate row
    var cartRow = document.createElement('div');
    cartRow.className = 'row cart_row';
    cartRow.id = productID;
    return cartRow;
};

Plate.createItemNameDiv = function(productName) {
    // create item name div
    var itemNameDiv = document.createElement('div');
    itemNameDiv.className = 'col-1-2 item_name';
    // add name of item to itemName div
    itemNameDiv.innerHTML = productName;
    return itemNameDiv;
};

Plate.addRemoveEvent = function(productID) {
    var button = document.getElementById('remove_' + productID);
    button.addEventListener('click', function() {
        var parentNode = document.getElementById(productID);
        plate.removeChild(parentNode);
    });
};

Plate.createRemoveButton = function(productID) {
    // create containing div for button
    var removeBtn = document.createElement('div');
    removeBtn.className = 'col-1-8';
    // create button element
    var button = document.createElement('button');
    button.className = 'button cart_button';
    button.id = 'remove_' + productID;
    // add 'remove' button for plate row
    button.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i> Remove';
    // append button to removeBtn div
    removeBtn.appendChild(button);
    return removeBtn;
};

Plate.createItemQtyDiv = function(productObj) {
    // create quantity div
    var qtyDiv = document.createElement('div');
    qtyDiv.className = 'col-1-8 quantity';
    // create label element for qty div
    var qtyLabel = document.createElement('label');
    // create text node for label text
    var qtyLabelText = document.createTextNode('Qty:');
    // append qtyLabelText to qtyLabel
    qtyLabel.appendChild(qtyLabelText);
    // create input element for quantity div
    var qtyInput = document.createElement('input');
    qtyInput.className = 'qty_input';
    // set item quantity
    qtyInput.setAttribute('value', productObj.getQty());
    productObj.plateQty = productObj.getQty();
    qtyInput.setAttribute('type', 'text');
    qtyInput.setAttribute('maxlength', 5);
    // append quantity input to quantity label
    qtyLabel.appendChild(qtyInput);
    // append quantity label to quantity div
    qtyDiv.appendChild(qtyLabel);
    return qtyDiv;
};

Plate.createItemPriceDiv = function(productPrice) {
    // create item price div
    var itemPrice = document.createElement('div');
    itemPrice.className = 'col-1-8 item_price';
    // set item price
    itemPrice.innerHTML = '$' + (productPrice).toFixed(2);
    return itemPrice;
};

Plate.createItemSubtotalDiv = function(productPrice, plateQty) {
    // create row subtotal div
    var rowSubtotal = document.createElement('div');
    rowSubtotal.className = 'col-1-8 row_subtotal';
    // calculate row subtotal
    var rowSub = (productPrice * plateQty).toFixed(2);
    // set row subtotal
    rowSubtotal.innerHTML = '$' + rowSub;
    return rowSubtotal;
};

Plate.buildPlateRow = function(productObj) {
    var row = Plate.createItemRow(productObj.productID);
    var itemName = Plate.createItemNameDiv(productObj.productName);
    var removeBtn = Plate.createRemoveButton(productObj.productID);
    var qty = Plate.createItemQtyDiv(productObj);
    var price = Plate.createItemPriceDiv(productObj.productPrice);
    var subtotal = Plate.createItemSubtotalDiv(productObj.productPrice, productObj.plateQty);
    row.appendChild(itemName);
    row.appendChild(removeBtn);
    row.appendChild(qty);
    row.appendChild(price);
    row.appendChild(subtotal);
    return row;
};

Plate.addToPlate = function(row) {
    plate.appendChild(row);
};

Plate.replaceRow = function(newRow, oldRow) {
    plate.replaceChild(newRow, oldRow);
}

var addButton = function(button, productObj) {
    button.addEventListener('click', function() {
        var row = document.getElementById(productObj.productID);
        if (plate.contains(row)) {
            console.log('that row exists already!');
            oldRow = row;
            // var additionalQty = productObj.getQty();
            row = Plate.buildPlateRow(productObj);
            Plate.replaceRow(row, oldRow);
        } else {
            row = Plate.buildPlateRow(productObj);
            Plate.addToPlate(row);
            Plate.addRemoveEvent(productObj.productID);
        }
    });
};

addButton(donutButton, donutObj);
