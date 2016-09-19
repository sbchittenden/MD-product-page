// ========== shopping cart object =========== //
var shoppingCart = {
    discountCodes: {
        TAKE10OFF: 0.1,
        DONUTLOVER15: 0.15,
        BREAKFAST5: 0.05
    },
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
    var discountInput = document.getElementById('dicsount_code');

    // add discount button element
    var discountBtn = document.getElementById('discount_button');

    // shopping cart wrap
    var breakfastPlate = document.getElementById('shopping_cart');

    // show/hide cart button
    var cartToggle = document.getElementById('cart_toggle');
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
        } else if (visibility === 'show') {
            breakfastPlate.className = 'hide';
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
    shoppingCart.cartSubtotal = existingItem.subtotal;
    updateCartTotal();
    writeCartTotals();
    // 
}

// ======== function to update item already in plate ====== //

function changeItem(node) {
    var plateItemChanges = []; // get elements from node
    var name = node.getElementsByClassName('item_name')[0].innerHTML;
    var qty = node.getElementsByClassName('qty_input')[0].value;
    qty = +(qty);
    plateItemChanges.push(name, qty);
    return plateItemChanges;
}

// ========= function to create an item object ========= //

function makeItem(node) {
    // get elements from node
    var name = node.getElementsByClassName('product_name')[0].innerHTML;
    var price = node.getElementsByClassName('product_price')[0].innerHTML;
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
        // update cart subtotal
        updateCartSubtotal();
        updateCartTotal();
        // update cart discount amount

        // update cart total
    } else {
        // update existing object's qty
        items[existing].qty += item.qty;
        // update existing object's subtotal
        items[existing].subtotal += item.qty * item.price;
        updateCartSubtotal();
        updateCartTotal();
    }

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
    subtotal = subtotals.reduce(function(a, b) {
        return a + b });
    shoppingCart.cartSubtotal = subtotal;
}

// ========== function to calculate shopping cart discount =========== //

function updateCartDiscount() {

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

    // append item divs to the plate row div
    itemRow.appendChild(itemName);
    itemRow.appendChild(removeBtn);
    itemRow.appendChild(itemQty);
    itemRow.appendChild(itemPrice);
    itemRow.appendChild(itemSubtotal);

    return itemRow;
}


// ========== call activatePage function ======= //

activatePage();

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
