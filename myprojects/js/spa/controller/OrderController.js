/*    order page    */

/*load customer*/

$("#orderId").text('O-001');

$("#customerComboBox").click(function () {

    var comboBox = $(this).val();
    var response = comboBoxId(comboBox);

    if (response) {
        $("#customerId").val(response.getCustomerId());
        $("#customerName").val(response.getCustomerName());
        $("#customerAddress").val(response.getCustomerAddress());
        $("#customerNumber").val(response.getCustomerNumber());
        $("#customerEmail").val(response.getCustomerEmail());
    }else {

    }

});

/*load item*/

$("#itemComboBox").click(function () {

    var comboBox = $(this).val();
    var response = comboBoxCode(comboBox);

    if (response) {
        $("#itemCode").val(response.getItemCode());
        $("#itemName").val(response.getItemName());
        $("#itemCompany").val(response.getItemCompany());
        $("#itemPrice").val(response.getItemPrice());
        $("#itemQty").val(response.getItemQty());
    }else {

    }

});

/*add*/

let balance = 0;

$("#addButton").click(function () {

    let code = $("#itemCode").val();
    let name = $("#itemName").val();
    let company = $("#itemCompany").val();
    let price = $("#itemPrice").val();
    let qty = $("#itemQty").val();
    let enterQty = $("#enterQty").val();
    let total = price * enterQty;

    if (enterQty > qty) {
        alert("Enter valid Qty");
        clearEnterQty();
        $("#addButton").attr('disabled', true);
        return;
    }

    balance = balance + total;
    $("#total").text(balance);

    clearEnterQty();

    let tableRow = `<tr><td>${code}</td><td>${name}</td><td>${company}</td><td>${price}</td><td>${enterQty}</td><td>${total}</td></tr>`;
    $("#orderTableBody").append(tableRow);

    $("#orderTableBody>tr").on('dblclick',function () {
        $(this).remove();
    })

    $("#placeOrderButton").attr('disabled', false);
    $("#addButton").attr('disabled', true);

});

/*place*/

$("#placeOrderButton").click(function () {

    let idO = $("#orderId").text();
    let idC = $("#customerId").val();
    let balance = $("#total").text();

    let o = new Order(idO,idC,balance);

    orderData.push(o);

    clear();
    $("#orderTableBody>tr").remove();
    orderId();
    orderCount();
    loadAllOrder();

    $("#placeOrderButton").attr('disabled', true);

});

/*validation*/

$("#addButton").attr('disabled', true);
$("#placeOrderButton").attr('disabled', true);

const oQty = /^[0-9]{1,9}$/;

$("#enterQty").on('keyup', function (event) {

    qtyButton();

});

$("#enterQty").on('blur', function (event) {

    qtyValidation();

});



/*function*/

let oId = 2;
function orderId() {
    if (oId < 10) {
        $("#orderId").text('O-00'+oId);
        oId++;
    }else if (oId < 100) {
        $("#orderId").text('O-0'+oId);
        oId++;
    }else {
        $("#orderId").text('O-'+oId);
        oId++;
    }
}

function customerLoadComboBox() {
    $("#customerComboBox").empty();
    for (var i in customerData) {
        let comboBox = '<option id="i">'+customerData[i].getCustomerId()+'</option>';
        $("#customerComboBox").append(comboBox);
    }
}

function itemLoadComboBox() {
    $("#itemComboBox").empty();
    for (var i in itemData) {
        let comboBox = '<option id="i">'+itemData[i].getItemCode()+'</option>';
        $("#itemComboBox").append(comboBox);
    }
}

function comboBoxId(id) {
    for (let i=0 ; i<customerData.length ; i++) {
        if (customerData[i].getCustomerId() == id) {
            return customerData[i];
        }
    }
}

function comboBoxCode(code) {
    for (let i=0 ; i<itemData.length ; i++) {
        if (itemData[i].getItemCode() == code) {
            return itemData[i];
        }
    }
}

let order = 0;
function orderCount() {
    order++;
    $("#orderCount").text(order);
}

function clear() {
    $("#customerId").val("");
    $("#customerName").val("");
    $("#customerAddress").val("");
    $("#customerNumber").val("");
    $("#customerEmail").val("");
    $("#itemCode").val("");
    $("#itemName").val("");
    $("#itemCompany").val("");
    $("#itemPrice").val("");
    $("#itemQty").val("");
    $("#enterQty").val("");
}

function clearEnterQty() {
    $("#enterQty").val("");
}

function qtyValidation() {
    var qty = $("#enterQty").val();
    if (oQty.test(qty)) {
        $("#enterQty").css('border', '2px solid blue');
        return true;
    }else {
        $("#enterQty").css('border', '2px solid red');
        return false;
    }
}

function qtyButton() {
    var qty = qtyValidation();
    if (qty) {
        $("#addButton").attr('disabled', false);
    }else {
        $("#addButton").attr('disabled', true);
    }
}

function loadAllOrder() {
    $("#orderDetailTableBody").empty();
    for (var i in orderData) {
        let tableRow = `<tr><td>${orderData[i].getOrderId()}</td><td>${orderData[i].getCustomerId()}</td><td>${orderData[i].getBalance()}</td></tr>`;
        $("#orderDetailTableBody").append(tableRow);
    }
}