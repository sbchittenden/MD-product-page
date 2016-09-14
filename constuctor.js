function Product(name, price, qty, productID) {
	this.productName = name;
	this.productPrice = price;
	this.productQty = qty;
	this.productID = productID;
	this.getQuantity = function() {
		return productQty;
	};
	this.addToPlate = function(object) {
        // create plate row
        var cartRow = document.createElement('div');
        cartRow.className = 'row cart_row';
        cartRow.id = object.productRowID;

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
        // create button element
        var removeButton = document.createElement('button');
        // removeButton.id = object.removeID;
        removeButton.className = 'button cart_button';
        removeButton.id = object.removeID;
        // add inner content to removeButton
        removeButton.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i> Remove'
            // add 'remove' button for plate row
        removeBtn.appendChild(removeButton);

        // create item price div
        var itemPrice = document.createElement('div');
        itemPrice.className = 'col-1-8 item_price';

        // create row subtotal div
        var rowSubtotal = document.createElement('div');
        rowSubtotal.className = 'col-1-8 row_subtotal';

        // build row with function parameters

        // add name of item to itemName div
        itemName.innerHTML = object.productName;
        // set item quantity
        qtyInput.setAttribute('value', object.quantity);
        qtyInput.setAttribute('type', 'text');
        qtyInput.setAttribute('maxlength', 5)
            // set item price
        itemPrice.innerHTML = '$' + (object.price).toFixed(2);

        // calculate row subtotal
        var rowSub = (object.price * object.quantity).toFixed(2);
        // set row subtotal
        rowSubtotal.innerHTML = '$' + rowSub;

        // append quantity input to quantity label
        qtyLabel.appendChild(qtyInput);
        // append quantity label to quantity div
        qtyDiv.appendChild(qtyLabel);

        // build plate row
        cartRow.appendChild(itemName);
        cartRow.appendChild(removeBtn);
        cartRow.appendChild(qtyDiv);
        cartRow.appendChild(itemPrice);
        cartRow.appendChild(rowSubtotal);

        // add to plate
        plate.appendChild(cartRow);
        plate.className = "full";
    };
};	