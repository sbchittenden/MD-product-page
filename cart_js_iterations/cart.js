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

    // plate quantity elements
    var plateQuantities = [];

    /////////////////////////////////////////////////////////
    // ** addtoPlate(nameOfItem, qtyOfItem, priceOfItem) **//
    // function to create cart row and cart row elements  //
    ////////////////////////////////////////////////////////

    function addToPlate(nameOfItem, qtyOfItem, priceOfItem) {
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
        cartRow.appendChild(removeBtn);
        cartRow.appendChild(qtyDiv);
        cartRow.appendChild(itemPrice);
        cartRow.appendChild(rowSubtotal);

        // add to plate
        plate.appendChild(cartRow);


    }

    //////////////////////////////////////////////////
    // ******* getItemDetails(item) *************** //
    // function to get name, qty, and price of item //
    //////////////////////////////////////////////////

    function getItemDetails(item) {
        // get item name 
        var itemName = item.querySelector('.product_name').innerHTML;
        // get item price
        var itemPrice = item.querySelector('.product_price').innerHTML;
        // remove $ from price and convert to number
        itemPrice = +(itemPrice.slice(1));
        // get array of select option elements
        var itemOptionList = item.getElementsByTagName('option');
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

        // store item details in array 
        var parameterArray = [itemName, itemQty, itemPrice];

        // return parameter array
        return parameterArray;
    }



    ////////////////////////////////////////////
    // item addToPlate button event listeners //
    ////////////////////////////////////////////

    egg.querySelector('.button').addEventListener('click', function() {
        var itemDetails = getItemDetails(egg);
        addToPlate(itemDetails[0], itemDetails[1], itemDetails[2]);
    });

    bacon.querySelector('.button').addEventListener('click', function() {
        var itemDetails = getItemDetails(bacon);
        addToPlate(itemDetails[0], itemDetails[1], itemDetails[2]);
    });

    sausage.querySelector('.button').addEventListener('click', function() {
        var itemDetails = getItemDetails(sausage);
        addToPlate(itemDetails[0], itemDetails[1], itemDetails[2]);
    });

    waffle.querySelector('.button').addEventListener('click', function() {
        var itemDetails = getItemDetails(waffle);
        addToPlate(itemDetails[0], itemDetails[1], itemDetails[2]);
    });

    pancake.querySelector('.button').addEventListener('click', function() {
        var itemDetails = getItemDetails(pancake);
        addToPlate(itemDetails[0], itemDetails[1], itemDetails[2]);
    });

    hashbrowns.querySelector('.button').addEventListener('click', function() {
        var itemDetails = getItemDetails(hashbrowns);
        addToPlate(itemDetails[0], itemDetails[1], itemDetails[2]);
    });

    frenchToast.querySelector('.button').addEventListener('click', function() {
        var itemDetails = getItemDetails(frenchToast);
        addToPlate(itemDetails[0], itemDetails[1], itemDetails[2]);
    });

    oj.querySelector('.button').addEventListener('click', function() {
        var itemDetails = getItemDetails(oj);
        addToPlate(itemDetails[0], itemDetails[1], itemDetails[2]);
    });

    coffee.querySelector('.button').addEventListener('click', function() {
        var itemDetails = getItemDetails(coffee);
        addToPlate(itemDetails[0], itemDetails[1], itemDetails[2]);
    });

    cereal.querySelector('.button').addEventListener('click', function() {
        var itemDetails = getItemDetails(cereal);
        addToPlate(itemDetails[0], itemDetails[1], itemDetails[2]);
    });

    donut.querySelector('.button').addEventListener('click', function() {
        var itemDetails = getItemDetails(donut);
        addToPlate(itemDetails[0], itemDetails[1], itemDetails[2]);
    });

    grapefruit.querySelector('.button').addEventListener('click', function() {
        var itemDetails = getItemDetails(grapefruit);
        addToPlate(itemDetails[0], itemDetails[1], itemDetails[2]);
    });

    // mutation observer to watch plate div for any DOM changes
    var plateWatch = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {

            ////////////////////
            // plate elements //
            ////////////////////

            // addition of items to plate updates plateQuantities array
            plateQuantities = plate.getElementsByClassName('qty_input');

            // get nodeList of remove button elements from plate
            var removeButtons = plate.getElementsByClassName('cart_button');


            ///////////////////////////////////
            // plate element event listeners //
            ///////////////////////////////////

            // add event listeners for all plate quantity inputs
            for (var i = 0; i < plateQuantities.length; i++) {
                plateQuantities[i].addEventListener('change', function() {
                    // get value from new qty input
                    var newQty = this.value;

                    // if newQty is 0 remove item from plate
                    if (newQty === '0') {
                        plate.removeChild(this.parentNode.parentNode.parentNode);
                    }

                    // get item subtotal div
                    var subtotalDiv = this.parentNode.parentNode.nextSibling.nextSibling;

                    // get item price
                    var itemPrice = this.parentNode.parentNode.nextSibling.innerHTML;

                    // remove '$' and convert item price to a number
                    itemPrice = +(itemPrice.slice(1));

                    // get current item subtotal
                    var subtotal = subtotalDiv.innerHTML;

                    // remove $ from current item subtotal and convert to number
                    subtotal = +(subtotal.slice(1));

                    // calculate new item subtotal
                    subtotal = (itemPrice * newQty).toFixed(2);

                    // insert new item subtotal in to item subtotal div
                    subtotalDiv.innerHTML = '$' + subtotal;
                });
            }

            // add event listeners for remove from plate buttons
            for (var k = 0; k < removeButtons.length; k++) {
                removeButtons[k].addEventListener('click', function() {
                    var rowToRemove = this.parentNode.parentNode;
                    plate.removeChild(rowToRemove);
                });
            }





        });
    });

    // configuration of the plateWatch observer:
    var plateConfig = { attributes: true, childList: true, characterData: true };

    // pass in the plate div node, as well as the observer options
    plateWatch.observe(plate, plateConfig);









})(window));
