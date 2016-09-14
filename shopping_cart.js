((function(window) {

    ///////////////////
    // Shopping cart //
    ///////////////////

    // retrieve product divs
    var egg = document.getElementById('FriedEgg');
    var bacon = document.getElementById('Bacon');
    var sausage = document.getElementById('BreakfastSausage');
    var waffle = document.getElementById('Waffle');
    var pancake = document.getElementById('Pancake');
    var hashbrowns = document.getElementById('Hashbrowns');
    var frenchToast = document.getElementById('FrenchToast');
    var oj = document.getElementById('OrangeJuice');
    var coffee = document.getElementById('Coffee');
    var cereal = document.getElementById('Cereal');
    var donut = document.getElementById('Donut');
    var grapefruit = document.getElementById('Grapefruit');

    // get plate div (item listing section)
    var plate = document.getElementById('plate');


    /////////////////////
    // product objects //
    /////////////////////

    var Egg = {
        productName: 'Fried Egg',
        productPrice: 2.00,
        productQty: 1,
        onPlate: false
    };
    var Bacon = {
        productName: 'Bacon',
        productPrice: 1.00,
        productQty: 1,
        onPlate: false
    };
    var Sausage = {
        productName: 'Breakfast Sausage',
        productPrice: 1.25,
        productQty: 1,
        onPlate: false
    };
    var Waffle = {
        productName: 'Waffle',
        productPrice: 2.50,
        productQty: 1,
        onPlate: false
    };
    var Pancake = {
        productName: 'Pancake',
        productPrice: 2.00,
        productQty: 1,
        onPlate: false
    };
    var Hashbrowns = {
        productName: 'Hashbrowns',
        productPrice: 2.00,
        productQty: 1,
        onPlate: false
    };
    var FrenchToast = {
        productName: 'French Toast',
        productPrice: 3.75,
        productQty: 1,
        onPlate: false
    };
    var Oj = {
        productName: 'Orange Juice',
        productPrice: 1.50,
        productQty: 1,
        onPlate: false
    };
    var Coffee = {
        productName: 'Coffee',
        productPrice: 1.00,
        productQty: 1,
        onPlate: false
    };
    var Cereal = {
        productName: 'Cereal',
        productPrice: 3.25,
        productQty: 1,
        onPlate: false
    };
    var Donut = {
        productName: 'Donut',
        productPrice: 1.50,
        productQty: 1,
        onPlate: false
    };
    var Grapefruit = {
        productName: 'Grapefruit',
        productPrice: 2.75,
        productQty: 1,
        onPlate: false
    };

    // plate row object constructor
    var PlateRow = function(object) {
        this.productRowID = object.productName.replace(' ', '') + '_row';
        this.productName = object.productName;
        this.quantity = object.productQty;
        this.price = object.productPrice;
    };


    // get item quantity function
    function getQuantity(element) {
        var itemOptionList = element.getElementsByTagName('option');
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
    }

    // add item to plate function
    var addToPlate = function(object) {
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

    };


    // test event
    donut.querySelector('.button').addEventListener('click', function() {
        if (Donut.onPlate === false) {
            console.log("no donut row yet");
            Donut.productQty = getQuantity(donut);
            var donutOnPlate = new PlateRow(Donut);
            Donut.onPlate = true;
            addToPlate(donutOnPlate);
        } else {
            console.log("donut already on plate!");
            Donut.productQty += getQuantity(donut);
            console.log(Donut.productQty + ' is the new Donut object qty');
            var oldRow = document.getElementById('Donut_row');
            plate.removeChild(oldRow);
            var donutOnPlate = new PlateRow(Donut);
            Donut.onPlate = true;
            addToPlate(donutOnPlate);
        }

    });















})(window));
