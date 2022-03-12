function Item(code,name,company,price,qty) {
    var itemCode = code;
    var itemName = name;
    var itemCompany = company;
    var itemPrice = price;
    var itemQty = qty;

    this.setItemCode = function (code) {
        itemCode = code;
    }
    this.getItemCode = function () {
        return itemCode;
    }
    this.setItemName = function (name) {
        itemName = name;
    }
    this.getItemName = function () {
        return itemName;
    }
    this.setItemCompany = function (company) {
        itemCompany = company;
    }
    this.getItemCompany = function () {
        return itemCompany;
    }
    this.setItemPrice = function (price) {
        itemPrice = price;
    }
    this.getItemPrice = function () {
        return itemPrice;
    }
    this.setItemQty = function (qty) {
        itemQty = qty;
    }
    this.getItemQty = function () {
        return itemQty;
    }
}