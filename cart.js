///////////////////
// Shopping cart //
///////////////////

// retrieve product card divs
var friedEgg = document.getElementById('FriedEgg');
var bacon = document.getElementById('Bacon');

// get plate div (item listing section)
var plate = document.getElementById('plate');

///////////////////////////////////////////////////////
// function to create cart row and cart row elements //
///////////////////////////////////////////////////////

function addToPlate (nameOfItem, qtyOfItem, priceOfItem) {
	// create plate row
	var cartRow = document.createElement('div');
	cartRow.className = 'row cart_row';

	// create item name div
	var itemName = document.createElement('div');
	itemName.className = 'col-1-2 item_name';

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

	// create containing div for button
	var removeBtn = document.createElement('div');
	removeBtn.className = 'col-1-8';
	// add 'remove' button for plate row
	removeBtn.innerHTML = '<button class="button cart_button"><i class="fa fa-times" aria-hidden="true"></i> Remove</button>';

	// create item price div
	var itemPrice = document.createElement('div');
	itemPrice.className = 'col-1-8 item_price';

	// create row subtotal div
	var rowSubtotal = document.createElement('div');
	rowSubtotal.className = 'col-1-8 row_subtotal';

	// build row with function parameters
	
	// add name of item to itemName div
	itemName.innerHTML = nameOfItem;
	// set item quantity
	qtyInput.setAttribute('value', qtyOfItem);
	qtyInput.setAttribute('type', 'text');
	qtyInput.setAttribute('maxlength', 5)
	// set item price
	itemPrice.innerHTML = '$' + (priceOfItem).toFixed(2);

	// calculate row subtotal
	var rowSub = (priceOfItem * qtyOfItem).toFixed(2);
	// set row subtotal
	rowSubtotal.innerHTML = '$' + rowSub;

	// append quantity input to quantity label
	qtyLabel.appendChild(qtyInput);
	// append quantity label to quantity div
	qtyDiv.appendChild(qtyLabel);

	// build plate row
	cartRow.appendChild(itemName);
	cartRow.appendChild(qtyDiv);
	cartRow.appendChild(removeBtn);
	cartRow.appendChild(itemPrice);
	cartRow.appendChild(rowSubtotal);

	// add to plate
	plate.appendChild(cartRow);


}
// test event
bacon.addEventListener('click', function(){
	addToPlate('Bacon', 3, 1.50);
});