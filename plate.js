// ========== shopping cart object =========== //
var shoppingCart = {
    discountCodes: {
        'TAKE10OFF': 0.1,
        'DONUTLOVER15': 0.15,
        'BREAKFAST5': 0.05
    },
    activeCode: undefined,
    cartItems: [],
    cartSubtotal: 0,
    cartDiscount: 0,
    cartTotal: 0
};

// ========== add event listeners to page function ========= // 
function activatePage() {
    // nodeList of all add_to_plate buttons
    var addButtons = document.getElementsByClassName('add_to_plate');

    // plate div element
    var plate = document.getElementById('plate');

    // discount code input element
    var discountInput = document.getElementById('discount_code');

    // add discount button element
    var discountBtn = document.getElementById('discount_button');

    // shopping cart wrap
    var breakfastPlate = document.getElementById('shopping_cart');

    // show/hide cart button
    var cartToggle = document.getElementById('cart_toggle');

    // continue shopping button
    var continueShopping = document.getElementById('continue_shop');

    // blackout div
    var fade = document.getElementById('blackout');

    // loop counter
    var i;

    // === add event listeners to add to plate buttons === //
    for (i = 0; i < addButtons.length; i++) {
        addButtons[i].addEventListener('click', addToCart);
    }

    // === event listener for show/hide cart ==== //
    cartToggle.addEventListener('click', function() {
        var visibility = breakfastPlate.className;
        if (visibility === 'hide') {
            breakfastPlate.className = 'show';
            fade.className = 'show';
        } else if (visibility === 'show') {
            breakfastPlate.className = 'hide';
            fade.className = 'hide';
        }
    });

    // ===== continue shopping button functionality ====== //
    continueShopping.addEventListener('click', function() {
        var shoppingCart = document.getElementById('shopping_cart');
        breakfastPlate.className = 'hide';
        fade.className = 'hide';
    });

    // ====== event listener for click on #blackout div (off of cart) ===== //
    fade.addEventListener('click', function(){
        breakfastPlate.className = 'hide';
        fade.className = 'hide';
    });

    // ======= discount button event listener ====== //
    discountBtn.addEventListener('click', function() {
        var code = discountInput.value;
        var currentDiscount = shoppingCart.cartDiscount;
        var discount = getDiscount(code);
        if (discount > currentDiscount) {
            shoppingCart.activeCode = code;
            updateCartDiscount(discount);
            updateCartTotal();
            writeCartTotals();
        } else {
            console.log('old discount amount is higher');
        }
    });
}

// ========= addToCart function ======= //
function addToCart(event) {
    // get parent element of clicked button
    var parentDiv = event.target.parentNode;
    // create the item object from properties of referenced product
    var item = makeItem(parentDiv);
    // shopping cart item array
    var items = shoppingCart.cartItems;

    // add item to cart or update existing qty
    addOrUpdateItem(item, items);
    writeCartTotals();
}

// ======= updatePlate function ===== //
function updatePlate(event) {
    // get cartItems array
    var items = shoppingCart.cartItems;
    // get parent element of changed input
    var parentDiv = event.target.parentNode.parentNode.parentNode;
    // discount code input element
    var discountInput = document.getElementById('discount_code');
    // get row subtotal div
    var rowSubtotal = parentDiv.querySelector('.row_subtotal');
    // create an item object from row properties
    var updated = changeItem(parentDiv);
    console.log(updated);
    // index of item in shopping cart item array
    var existingItem;
    var itemIndex;
    // loop counter
    var i;

    // loop through items array to find item in items array
    for (i = 0; i < items.length; i++) {
        if (updated[0] === items[i].name) {
            itemIndex = i;
        }
    }
    existingItem = items[itemIndex];
    // updated exisiting item with new qty value
    existingItem.qty = updated[1];
    console.log(items);
    // update existing object's subtotal
    existingItem.subtotal = existingItem.qty * existingItem.price;
    // if new qty is 0 remove item from plate
    if (existingItem.subtotal === 0) {
        plate.removeChild(parentDiv);
        updateCartDiscount(0); // reset cart discount on item removal
        discountInput.value = '';
        shoppingCart.activeCode = undefined;
        numOfItemsInCart();
    }
    // updated row subtotal HTML
    rowSubtotal.innerHTML = '$' + existingItem.subtotal.toFixed(2);
    // update shopping cart subtotal and total
    updateCartSubtotal();
    updateCartTotal();
    numOfItemsInCart();
    // update plate subtotal and total
    writeCartTotals();
}

// ======== function to update item already in plate ====== //
function changeItem(node) {
    var plateItemChanges = []; // get elements from node
    var name = node.querySelector('.item_name').innerHTML;
    var qtyInput = node.querySelector('.qty_input');
    var qty = qtyInput.value;
    qty = +(qty);
    qtyInput.setAttribute('value', qty);
    plateItemChanges.push(name, qty);
    return plateItemChanges;
}

// ========= function to create an item object ========= //
function makeItem(node) {
    // get elements from node
    var name = node.querySelector('.product_name').innerHTML;
    var price = node.querySelector('.product_price').innerHTML;
    var optionList = node.getElementsByTagName('option');
    // initialize item object
    var item = {};
    var qty; // value of selected option element (item quantity)
    var i; // loop counter

    // convert price to a number
    price = +(price.replace('$', ''));

    // get value of selected option tag and assign to qty
    for (i = 0; i < optionList.length; i++) {
        if (optionList[i].selected) {
            qty = +(optionList[i].value);
        }
    }

    item.name = name;
    item.price = price;
    item.qty = qty;
    item.subtotal = price * qty;

    // return the new item object
    console.log(item);
    return item;
}

// ======== function to add or update item in shopping cart ======= //
function addOrUpdateItem(item, items) {
    // index of item in shopping cart item array
    var existing = -1;
    // loop counter
    var i;
    // loop through items array to see if new item exists
    for (i = 0; i < items.length; i++) {
        if (item.name === items[i].name) {
            existing = i;
        }
    }
    console.log(existing);
    // if the item exists in array, update qty
    if (existing === -1) {
        // add item object to shoppingCart.cartItems array
        items.push(item);
        console.log(shoppingCart.subtotal);
        // add item to the plate
        plate.appendChild(makePlateRow(item));
        // add plate qty event listener
        plateQtyEvent();
        // update cart subtotal and total
        updateCartSubtotal();
        updateCartTotal();
        // update number of items in cart display
        numOfItemsInCart();
        // update cart discount amount

        // update cart total
    } else {
        // update existing object's qty
        items[existing].qty += item.qty;
        // update existing object's subtotal
        items[existing].subtotal += item.qty * item.price;
        updatePlateQtyInput(item, items[existing].qty);
        updateCartSubtotal();
        updateCartTotal();
        numOfItemsInCart();
    }

}

// ======== updatePlateQtyInput() ======= //
function updatePlateQtyInput(item, qty) {
    console.log(item);
    var plateItems = plate.getElementsByClassName('item_name');
    var itemRow;
    var qtyInput;
    var rowSub;
    var i;
    for (i = 0; i < plateItems.length; i++) {
        if (plateItems[i].innerHTML === item.name) {
            itemRow = plateItems[i].parentNode;
        }
    }
    qtyInput = itemRow.querySelector('.qty_input');
    qtyInput.setAttribute('value', qty);
    qtyInput.value = qty;

    rowSub = itemRow.querySelector('.row_subtotal');
    rowSub.innerHTML = '$' + ((qty * item.price).toFixed(2));
}

// =========== function to calculate shopping cart subtotal ========== //
function updateCartSubtotal() {
    var subtotals = [];
    var subtotal;
    var items = shoppingCart.cartItems;
    var i;
    console.log(items);
    for (i = 0; i < items.length; i++) {
        subtotals.push(items[i].subtotal);
    }
    if (subtotals.length > 0) {
        subtotal = subtotals.reduce(function(a, b) {
            return a + b;
        });
        shoppingCart.cartSubtotal = subtotal;
    } else {
        shoppingCart.cartSubtotal = 0;
    }
}

// ========= function to determine discount amt ============== //
function getDiscount(code) {
    var discount, discountAmount, donutObj, donutQty, itemPrices = [],
        hiPrice, i;
    if (code === 'TAKE10OFF') {
        discount = 0.1;
        // push item prices to array
        shoppingCart.cartItems.forEach(function(obj) {
            itemPrices.push(obj.price);
        });
        // sort the item price array
        itemPrices.sort(function(a, b) {
            return a - b;
        });
        // get highest price
        hiPrice = itemPrices[itemPrices.length - 1];
        // calculate shopping cart discount with hi price
        discountAmount = hiPrice * discount;
    } else if (code === 'BREAKFAST5') {
        discount = 0.05;
        discountAmount = shoppingCart.cartSubtotal * discount;
    } else if (code === 'DONUTLOVER15') {
        discount = 0.15;
        for (i = 0; i < shoppingCart.cartItems.length; i++) {
            if (shoppingCart.cartItems[i].name === 'Donut') {
                donutQty = shoppingCart.cartItems[i].qty;
            }
        }
        console.log(donutQty);
        if (donutQty === undefined) {
            console.log('no donuts in cart!');
            discountAmount = 0;
        } else {
            discountAmount = donutQty * discount;
        }
    } else {
        console.log('invalid discount code');
        discountAmount = 0;
    }
    console.log(discountAmount);
    return discountAmount;
}


// ========== function to calculate shopping cart discount =========== //
function updateCartDiscount(discount) {
    shoppingCart.cartDiscount = discount;
}

// ========= function to calculate shopping cart total ============== //
function updateCartTotal() {
    shoppingCart.cartTotal = shoppingCart.cartSubtotal - shoppingCart.cartDiscount;
}

// ======= function to write innerHTML of cart subtotal, discount, and total ==== //
function writeCartTotals() {
    var subtotalAmt = document.getElementById('subtotalAmt');
    var discountAmt = document.getElementById('discountAmt');
    var totalAmt = document.getElementById('totalAmt');

    subtotalAmt.innerHTML = '$' + shoppingCart.cartSubtotal.toFixed(2);
    discountAmt.innerHTML = '- $' + shoppingCart.cartDiscount.toFixed(2);
    totalAmt.innerHTML = '$' + shoppingCart.cartTotal.toFixed(2);
}

// ========= function to generate plate row from cartItems object =========== //
function makePlateRow(item) {
    // create the HTML structure of the plate row
    var itemRow = document.createElement('div');
    itemRow.className = 'row cart_row';

    var itemName = document.createElement('div');
    itemName.className = 'col-1-2 item_name';

    var removeBtn = document.createElement('div');
    removeBtn.className = 'col-1-8';

    var itemQty = document.createElement('div');
    itemQty.className = 'col-1-8 quantity';

    var qtyInputLabel = document.createElement('label');

    var qtyInput = document.createElement('input');
    qtyInput.className = 'qty_input';
    qtyInput.setAttribute('type', 'text');
    qtyInput.setAttribute('maxlength', '5');

    var itemPrice = document.createElement('div');
    itemPrice.className = 'col-1-8 item_price';

    var itemSubtotal = document.createElement('div');
    itemSubtotal.className = 'col-1-8 row_subtotal';

    // insert values into plate row divs
    itemName.innerHTML = item.name;
    removeBtn.innerHTML = '<button class="button cart_button remove"><i class="fa fa-times" aria-hidden="true"></i> Remove</button>';
    qtyInput.setAttribute('value', item.qty);
    qtyInputLabel.appendChild(qtyInput);
    itemQty.appendChild(qtyInputLabel);
    itemPrice.innerHTML = '$' + item.price.toFixed(2);
    itemSubtotal.innerHTML = '$' + item.subtotal.toFixed(2);

    //////////////////////////////////////////
    // add event listener for remove button //
    //////////////////////////////////////////
    removeBtn.firstChild.addEventListener('click', function(event) {
        var discountInput = document.getElementById('discount_code');
        var itemIndex = shoppingCart.cartItems.indexOf(item);
        console.log(itemIndex);
        plate.removeChild(itemRow);
        shoppingCart.cartItems.splice(itemIndex, 1);
        updateCartSubtotal();
        updateCartDiscount(0); // reset cart discount on item removal
        discountInput.value = '';
        shoppingCart.activeCode = undefined;
        updateCartTotal();
        numOfItemsInCart();
        writeCartTotals();
    });

    // append item divs to the plate row div
    itemRow.appendChild(itemName);
    itemRow.appendChild(removeBtn);
    itemRow.appendChild(itemQty);
    itemRow.appendChild(itemPrice);
    itemRow.appendChild(itemSubtotal);

    return itemRow;
}

// ========= add event listener for plate quantity changes === //
function plateQtyEvent() {
    var i;
    if (plate.innerHTML !== undefined) {
        var quantityInputs = plate.getElementsByClassName('qty_input');
        for (i = 0; i < quantityInputs.length; i++) {
            quantityInputs[i].addEventListener('change', updatePlate);
        }

    }
}

// ========== function to control the item_in_cart_num display ====== //
function numOfItemsInCart() {
    var numberOfItems = 0;
    var itemInCartNumDiv = document.getElementById('item_in_cart_num');
    shoppingCart.cartItems.forEach(function(item) {
        numberOfItems += item.qty;
    });
    if (numberOfItems > 0) {
        itemInCartNumDiv.className = 'shown';
    } else {
        itemInCartNumDiv.className = 'hidden';
    }
    itemInCartNumDiv.innerHTML = numberOfItems;
}

// ========== call activatePage function ======= //
activatePage();
