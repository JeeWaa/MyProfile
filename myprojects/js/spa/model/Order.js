function Order(oId,cId,total) {
    var orderId = oId;
    var customerId = cId;
    var balance = total;

    this.setOrderId = function (oId) {
        orderId = oId;
    }
    this.getOrderId = function () {
        return orderId
    }
    this.setCustomerId = function (cId) {
        customerId = cId;
    }
    this.getCustomerId = function () {
        return customerId;
    }
    this.setBalance = function (total) {
        balance = total;
    }
    this.getBalance = function () {
        return balance;
    }
}