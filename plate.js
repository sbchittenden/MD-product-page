// ========== shopping cart object =========== //
var shoppingCart = {
    discountCodes: {
        TAKE10OFF: 0.1,
        DONUTLOVER15: 0.15,
        BREAKFAST5: 0.05
    },
    cartItems: [],
    cartSubtotal: 0,
    cartTotal: 0
};

// nodeList of all add_to_plate buttons
var addButtons = document.getElementsByClassName('add_to_plate');

// add event listeners to add to plate buttons
for (var i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener('click', addToCart);
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
    addOrUpdate(item, items);

    // generate shopping cart subtotal




}

// ========= function to create an item object ========= //
function makeItem(node) {
    // get elements from document
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
    return item;
}

// ======== function to add or update item in shopping cart ======= //
function addOrUpdate(item, items) {
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

    // if the item exists in array, update qty
    if (existing === -1) {
        // add item object to shoppingCart.cartItems array
        items.push(item);
        updateCartSubtotal(item.subtotal);
    } else {
        // update existing object's qty
        items[existing].qty += item.qty;
        // update existing object's subtotal
        items[existing].subtotal += item.qty * item.price;
        updateCartSubtotal(item.subtotal);
    }
}

// =========== function to calculate shopping cart subtotal ========== //
function updateCartSubtotal(itemSub) {
  shoppingCart.cartSubtotal += itemSub;
}







