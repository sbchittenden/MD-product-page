///////////////////
// Shopping cart //
///////////////////

// retrieve product name node list
var productName = document.querySelectorAll('.product_name');

// retrieve product price node list
var productPrice = document.querySelectorAll('product_price');

// retrieve product quantity select inputs
var productQuantity = document.querySelectorAll('product_qty');

// get egg button
var eggButton = document.getElementById('egg');

// retrieve 'add to plate' buttons
var addToPlateButton = document.querySelectorAll('add_to_plate');

// items on plate section of cart
var plate = document.getElementById('plate');

// function to add item to plate
function addToPlate(button_index) {
	// create new element
	var newCartRow = document.createElement('div');
	// add presentation classes
	newCartRow.className = "row cart_row";
	// add structure
	newCartRow.innerHTML = cartRowStructure;
	// append to plate div
	plate.appendChild(newCartRow);
}

// test event listener
eggButton.addEventListener('click', function(){
	addToPlate();
});

var cartRowStructure = '<div class="col-1-2 item_name">Item Name</div><div class="col-1-8" item_qty><label>Qty:<input type="text" value="1" maxlength="5	" class="qty_input"></label></div><div class="col-1-8"><button class="button cart_button"><i class="fa fa-times" aria-hidden="true"></i> Remove</button></div><div class="col-1-8 item_price">Item price</div><div class="col-1-8 subtotal">subtotal</div>';

var cartRow = '<div class="row cart_row">';



