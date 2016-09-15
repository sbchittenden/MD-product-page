function Product(productName, elementID, productPrice, productID) {
    this.productName = productName;
    this.productDiv = document.getElementById(elementID);
    this.productPrice = productPrice;
    this.productID = productID;
    this.onPlate = false;
    this.plateQty = 0;
    this.getQty = function() {
        var itemOptionList = productDiv.getElementsByTagName('option');
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


donutObj.productName = 'Donut';
donutObj.productDiv = document.getElementById('Donut');
donutObj.productPrice = 1.50;
donutObj.onPlate = false;
donutObj.productID = '011';
donutObj.plateQty = 0;
donutObj.getQty = function() {
    var itemOptionList = donutObj.productDiv.getElementsByTagName('option');
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