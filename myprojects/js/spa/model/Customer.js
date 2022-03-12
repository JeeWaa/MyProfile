function Customer(id,name,address,number,email) {
    var customerId = id;
    var customerName = name;
    var customerAddress = address;
    var customerNumber = number;
    var customerEmail = email;

    this.setCustomerId = function (id) {
        customerId = id;
    }
    this.getCustomerId = function () {
        return customerId;
    }
    this.setCustomerName = function (name) {
        customerName = name;
    }
    this.getCustomerName = function () {
        return customerName;
    }
    this.setCustomerAddress = function (address) {
        customerAddress = address;
    }
    this.getCustomerAddress = function () {
        return customerAddress;
    }
    this.setCustomerNumber = function (number) {
        customerNumber = number;
    }
    this.getCustomerNumber = function () {
        return customerNumber;
    }
    this.setCustomerEmail = function (email) {
        customerEmail = email;
    }
    this.getCustomerEmail = function () {
        return customerEmail;
    }
}