// shopping cart 'plate' div where added products are listed
var plate = document.getElementById('plate');

// initialize the onPlate object (has various methods for building the cart rows)
var toPlate = {};

// initialize the Cart object (has methods for manipulating items on plate)
var inCart = {};

// initialize cartDiscount object to hold discount methods
var cartDiscount = {};

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

/////////////////////
// toPlate methods //
/////////////////////

toPlate.createItemRow = function(productID) {
    // create item row in cart
    var cartRow = document.createElement('div');
    // add necessary class name for layout
    cartRow.className = 'row cart_row';
    // add productID as row ID
    cartRow.id = productID;
    return cartRow;
};

toPlate.createItemNameDiv = function(productName) {
    // create item name div and add necessary class name for layout
    var itemNameDiv = document.createElement('div');
    itemNameDiv.className = 'col-1-2 item_name';
    // add name of item to itemName div
    itemNameDiv.innerHTML = productName;
    return itemNameDiv;
};

toPlate.addRemoveEvent = function(productObj) {
    // retrieve remove button element from cart row
    var button = document.getElementById('remove_' + productObj.productID);
    // add an event listener to remove parent row on click
    button.addEventListener('click', function() {
        var parentNode = document.getElementById(productObj.productID);
        plate.removeChild(parentNode);
        inCart.removeCurrentItem(productObj);
        productObj.plateQty = 0;
        inCart.updateCartSubtotal();
        inCart.updateCartTotal();
    });
};

toPlate.createRemoveButton = function(productID) {
    // create containing div for button
    var removeBtn = document.createElement('div');
    removeBtn.className = 'col-1-8';
    // create button element
    var button = document.createElement('button');
    // add layout classes
    button.className = 'button cart_button';
    // add remove id based on product ID
    button.id = 'remove_' + productID;
    // add 'remove' button for plate row
    button.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i> Remove';
    // append button to removeBtn div
    removeBtn.appendChild(button);
    return removeBtn;
};

toPlate.createItemQtyDiv = function(productObj) {
    // create quantity div
    var qtyDiv = document.createElement('div');
    // add layout classes
    qtyDiv.className = 'col-1-8 quantity';
    // create label element for qty div
    var qtyLabel = document.createElement('label');
    // create text node for label text
    var qtyLabelText = document.createTextNode('Qty:');
    // append qtyLabelText to qtyLabel
    qtyLabel.appendChild(qtyLabelText);
    // create input element for quantity div
    var qtyInput = document.createElement('input');
    // add layout classes
    qtyInput.className = 'qty_input';
    // set item quantity value attribute
    qtyInput.setAttribute('value', productObj.getQty());
    // update product object's plateQty to reflect current qty total
    productObj.plateQty = productObj.getQty();
    // set input attributes
    qtyInput.setAttribute('type', 'text');
    qtyInput.setAttribute('maxlength', 5);
    // append quantity input to quantity label
    qtyLabel.appendChild(qtyInput);
    // append quantity label to quantity div
    qtyDiv.appendChild(qtyLabel);
    return qtyDiv;
};

toPlate.createItemPriceDiv = function(productPrice) {
    // create item price div
    var itemPrice = document.createElement('div');
    // add layout classes
    itemPrice.className = 'col-1-8 item_price';
    // set item price
    itemPrice.innerHTML = '$' + (productPrice).toFixed(2);
    return itemPrice;
};

toPlate.createItemSubtotalDiv = function(productPrice, plateQty) {
    // create row subtotal div
    var rowSubtotal = document.createElement('div');
    // add layout classes
    rowSubtotal.className = 'col-1-8 row_subtotal';
    // calculate row subtotal
    var rowSub = (productPrice * plateQty).toFixed(2);
    // set row subtotal
    rowSubtotal.innerHTML = '$' + rowSub;
    return rowSubtotal;
};

toPlate.buildPlateRow = function(productObj) {
    // call various methods of Plate to create cart row from product object
    var row = toPlate.createItemRow(productObj.productID);
    var itemName = toPlate.createItemNameDiv(productObj.productName);
    var removeBtn = toPlate.createRemoveButton(productObj.productID);
    var qty = toPlate.createItemQtyDiv(productObj);
    var price = toPlate.createItemPriceDiv(productObj.productPrice);
    var subtotal = toPlate.createItemSubtotalDiv(productObj.productPrice, productObj.plateQty);
    // append the various elements to the cart row
    row.appendChild(itemName);
    row.appendChild(removeBtn);
    row.appendChild(qty);
    row.appendChild(price);
    row.appendChild(subtotal);
    return row;
};

toPlate.addToPlate = function(row) {
    // add the cart row to the plate div
    plate.appendChild(row);
};

toPlate.replaceRow = function(newRow, oldRow) {
    // if a product exists in cart replace old row with new row
    plate.replaceChild(newRow, oldRow);
};

////////////////////
// inCart methods //
////////////////////

// currentItems array to hold objects currently on the plate (i.e. in the cart)
inCart.currentItems = [];
inCart.currentItemPrices = [];
inCart.discountTotal = 0;

// get array of current item product prices for discount codes
inCart.getCurrentItemPrices = function() {
    inCart.currentItems.forEach(function(item){
        inCart.currentItemPrices.push(item.productPrice);
    });
};

// add item into currentItems array
inCart.addCurrentItem = function(productObj) {
    // create currentItem object
    var currentItem = {};
    currentItem.productName = productObj.productName;
    currentItem.productID = productObj.productID;
    currentItem.productPrice = productObj.productPrice;
    currentItem.quantity = productObj.plateQty;
    // push currentItem object to currentItems array
    inCart.currentItems.push(currentItem);
};

// update item in currentItems array
inCart.updateCurrentItem = function(productObj) {
    // create updatedItem object
    var updatedItem = {};
    updatedItem.productName = productObj.productName;
    updatedItem.productID = productObj.productID;
    updatedItem.productPrice = productObj.productPrice;
    updatedItem.quantity = productObj.plateQty;
    // find matching object in currentItems array and replace with updatedItem
    inCart.currentItems.forEach(function(item) {
        if (item.productID === updatedItem.productID) {
            var index = inCart.currentItems.indexOf(item);
            inCart.currentItems.splice(index, 1, updatedItem);
        }
    });
    // test for updated qty
    inCart.currentItems.forEach(function(item) {
        console.log(item.productName + ' - ' + item.productID + ' has a new quantity of ' + item.quantity);
    });
    // end test code
};

inCart.removeCurrentItem = function(productObj) {
    // create removedItem object
    var removedItem = {};
    removedItem.productID = productObj.productID;
    // find matching object in currentItems array and remove from currentItems array
    inCart.currentItems.forEach(function(item) {
        if (item.productID === removedItem.productID) {
            var index = inCart.currentItems.indexOf(item);
            inCart.currentItems.splice(index, 1);
        }
    });
};

inCart.getSubtotal = function() {
    var itemSubtotals = [];
    var cartSubtotal;
    // push item subtotals of all objects in cart to the itemSubtotals array 
    inCart.currentItems.forEach(function(item) {
        itemSubtotals.push(item.productPrice * item.quantity);
    });
    // if itemSubtotals is not empty add all values together to get to cartSubtotal
    if (itemSubtotals.length > 0) {
        cartSubtotal = itemSubtotals.reduce(function(a, b) {
            return a + b;
        });
    } else {
        cartSubtotal = 0;
    }
    return cartSubtotal.toFixed(2);
};

inCart.updateCartSubtotal = function() {
    // get cart subtotal div
    var cartSubtotalDiv = document.getElementById('subtotalAmt');
    // update subtotal html with subtotal amount
    var subtotal = inCart.getSubtotal();
    cartSubtotalDiv.innerHTML = '$' + subtotal;
};

inCart.getDiscountAmount = function(discount, discountType) {
    if (discountType === 'total') {
        // get the discount amount from the cartDiscount object and multiply by cartSubtotal
        var cartDiscountAmt = discount * inCart.getSubtotal();
        console.log('cart discount amount is ' + cartDiscountAmt);
        inCart.discountTotal = cartDiscountAmt.toFixed(2);
    } else if (discountType === 'singleItem') {
        // get the highest price item from the currentItems array and multiply by discount
        var hiPricedItem;
        var sorted = inCart.currentItemPrices;
        sorted.sort(function(a,b){return a - b;});
        hiPricedItem = sorted[sorted.length - 1];
        inCart.discountTotal = (hiPricedItem * discount).toFixed(2);
    } else if (discountType === '011') {
        // check to see if any object in the currentItems array has productID of 011
        var hasDiscountID = false;
        var quantity;
        inCart.currentItems.forEach(function(item) {
            if (item.productID === '011') {
                hasDiscountID = true;
                quantity = item.quantity;
            }
        });
        if (hasDiscountID) {
            var itemSubtotal = 1.5 * quantity;
            inCart.discountTotal = (itemSubtotal * discount).toFixed(2);
        } else {
            inCart.discountTotal = 0;
        }
    }

};

inCart.updateDiscountDiv = function() {
    // get discount div
    var cartDiscountDiv = document.getElementById('discountAmt');
    // update discount HTML with discount amount
    cartDiscountDiv.innerHTML = '-$' + inCart.discountTotal;

};

inCart.getTotal = function() {
    // get subtotal and discount amounts
    var subtotal = inCart.getSubtotal();
    var discount = inCart.discountTotal;
    // return the subtotal minus discount amount
    console.log(subtotal - discount + 'is the cart total');
    return (subtotal - discount).toFixed(2);
};

inCart.updateCartTotal = function() {
    // get cart total div
    var cartTotalDiv = document.getElementById('totalAmt');
    // update total div innerHTML with cart total amount
    var total = inCart.getTotal();
    cartTotalDiv.innerHTML = '$' + total;
};

/////////////////////////////
// discount object methods //
/////////////////////////////

// initial cart discount is 0 (before any discount codes have been added);
cartDiscount.cartDiscountAmount = 0;
cartDiscount.cartDiscountType = false;
// valid discount code array
cartDiscount.discountCodes = [
    take10Off = {
        code: 'TAKE10OFF',
        discountAmt: 0.1,
        ofID: 'singleItem'
    },
    take15OffDonuts = {
        code: '15OFFDONUTS',
        discountAmt: 0.15,
        ofID: '011'
    },
    take5OffAll = {
        code: '5OFFBREAKFAST',
        discountAmt: 0.05,
        ofID: 'total'
    }
];

// cartDiscount.getDiscount = function() {
//     return cartDiscount.discountAmt;
// };

cartDiscount.applyDiscountCode = function() {
    // add event listener for discount button
    var discountBtn = document.getElementById('discount_button');
    discountBtn.addEventListener('click', function() {
        // get entered discount code from discount code input field
        var enteredCode = document.getElementById('discount_code').value;
        // array of valid codes (from cartDiscount.discountCodes array)
        var validCodes = [];
        // loop through valid discount codes and add to validCodes array
        cartDiscount.discountCodes.forEach(function(item) {
            validCodes.push(item.code);
        });
        // if entered code matches a valid code return the index of the valid code
        if (validCodes.indexOf(enteredCode) !== -1) {
            var code = cartDiscount.discountCodes[validCodes.indexOf(enteredCode)];
            console.log(code);
            // change cart discount type to ofID property of matching code
            cartDiscount.cartDiscountType = code.ofID;
            console.log(cartDiscount.cartDiscountType + ' is the discount type');
            // change cart discount percentage to matching code discount amount
            cartDiscount.cartDiscountAmt = code.discountAmt;
            console.log(cartDiscount.cartDiscountAmt + ' is the discount amount');

            inCart.getDiscountAmount(cartDiscount.cartDiscountAmt, cartDiscount.cartDiscountType);
            // update discount amount div
            inCart.updateDiscountDiv();
            // update cart total
            inCart.updateCartTotal();

        } else {
            // add an alert here that the discount code is invalid

        }
    });
};

/* 
the addButton function adds functionality to the 'add to plate' buttons:
a click event adds a new cart row for the button's product if it doesn't 
already exist. If the product has been previously added to the cart, the 
existing product row is rewritten with the updated quantity (previous qty + new qty)
*/

var addButton = function(button, productObj) {
    // event listener for 'add to plate' buttons
    button.addEventListener('click', function() {
        var row = document.getElementById(productObj.productID);
        // if the product has already been added to the plate (cart) then
        // rebuild row and replace old row (with additional qty added).
        // Else build new cart row
        if (plate.contains(row)) {
            oldRow = row;
            row = toPlate.buildPlateRow(productObj);
            toPlate.replaceRow(row, oldRow);
            toPlate.addRemoveEvent(productObj);
            inCart.updateCurrentItem(productObj);
            inCart.getCurrentItemPrices();
            inCart.updateCartSubtotal();
            inCart.updateDiscountDiv();
            inCart.updateCartTotal();
        } else {
            row = toPlate.buildPlateRow(productObj);
            toPlate.addToPlate(row);
            toPlate.addRemoveEvent(productObj);
            inCart.addCurrentItem(productObj);
            inCart.getCurrentItemPrices();
            inCart.updateCartSubtotal();
            inCart.updateDiscountDiv();
            inCart.updateCartTotal();
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

// add discount code event
cartDiscount.applyDiscountCode();
