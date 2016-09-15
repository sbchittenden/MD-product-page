var plate = document.getElementById('plate');
var Plate = {};

/////////////////////////
// product constructor //
/////////////////////////
function Product(productName, elementID, productPrice, productID) {
    this.productName = productName;
    this.productDiv = document.getElementById(elementID);
    this.productPrice = productPrice;
    this.productID = productID;
    this.onPlate = false;
    this.plateQty = 0;
    this.addButton = document.getElementById('add_' + productID); 
    this.getQty = function() {
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
        return itemQty + this.plateQty;
    };
}
/////////////////////////////
// end product constructor //
/////////////////////////////

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
};

var addButton = function(button, productObj) {
    button.addEventListener('click', function() {
        var row = document.getElementById(productObj.productID);
        if (plate.contains(row)) {
            oldRow = row;
            row = Plate.buildPlateRow(productObj);
            Plate.replaceRow(row, oldRow);
            Plate.addRemoveEvent(productObj.productID);
        } else {
            row = Plate.buildPlateRow(productObj);
            Plate.addToPlate(row);
            Plate.addRemoveEvent(productObj.productID);
        }
    });
};

////////////////////////////////////////////////////////////////////////
// create product objects                                             //
////////////////////////////////////////////////////////////////////////

// Fried Egg
var egg = new Product('Fried Egg', 'Egg', 2.00, '001');
// Bacon
var bacon = new Product('Bacon', 'Bacon', 1.00, '002');
// Breakfast Sausage
var sausage = new Product('Breakfast Sausage', 'Sausage', 1.25, '003');
// Waffle
var waffle = new Product('Waffle', 'Waffle', 2.50, '004');
// Pancake
var pancake = new Product('Pancake', 'Pancake', 1.75, '005');
// Hashbrowns
var hashbrowns = new Product('Hashbrowns', 'Hashbrowns', 2.00, '006');
// French Toast
var frenchToast = new Product('French Toast', 'French', 3.75, '007');
// Orange Juice
var oj = new Product('Orange Juice', 'OJ', 1.50, '008');
// Coffee
var coffee = new Product('Coffee', 'Coffee', 1.00, '009');
// Cereal
var cereal = new Product('Bowl of Cereal', 'Cereal', 3.25, '010');
// Donut
var donut = new Product('Donut', 'Donut', 1.50, '011');
// Grapefruit
var grapefruit = new Product('Grapefruit', 'Grapefruit', 2.75, '012');

////////////////////////////////////
// initialize add to cart buttons //
////////////////////////////////////

addButton(egg.addButton, egg);
addButton(bacon.addButton, bacon);
addButton(sausage.addButton, sausage);
addButton(waffle.addButton, waffle);
addButton(pancake.addButton, pancake);
addButton(hashbrowns.addButton, hashbrowns);
addButton(frenchToast.addButton, frenchToast);
addButton(oj.addButton, oj);
addButton(coffee.addButton, coffee);
addButton(cereal.addButton, cereal);
addButton(donut.addButton, donut);
addButton(grapefruit.addButton, grapefruit);
