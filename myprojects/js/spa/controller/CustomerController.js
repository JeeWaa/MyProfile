/*    customer page    */

/*save*/

$("#txtCustomerId").val("C-001");

$("#saveCustomerButton").click(function () {

    let idC = $("#txtCustomerId").val();
    let nameC = $("#txtCustomerName").val();
    let addressC = $("#txtCustomerAddress").val();
    let numberC = $("#txtCustomerNumber").val();
    let emailC = $("#txtCustomerEmail").val();

    let c = new Customer(idC,nameC,addressC,numberC,emailC);

    customerData.push(c);

    loadAllCustomer();

    $("#customerTableBody>tr").click(function () {

        let customerId = $(this).children(":eq(0)").text();
        let customerName = $(this).children(":eq(1)").text();
        let customerAddress = $(this).children(":eq(2)").text();
        let customerNumber = $(this).children(":eq(3)").text();
        let customerEmail = $(this).children(":eq(4)").text();

        $("#txtCustomerId").val(customerId);
        $("#txtCustomerName").val(customerName);
        $("#txtCustomerAddress").val(customerAddress);
        $("#txtCustomerNumber").val(customerNumber);
        $("#txtCustomerEmail").val(customerEmail);

    });

    customerId();
    customerLoadComboBox();
    addCustomerCount();
    allCustomerCount();
    clearCustomer();

    $("#saveCustomerButton").attr('disabled',true);
});

/*update*/

$("#updateCustomerButton").click(function () {

    var selectId = $("#txtCustomerId").val();
    var response = searchCustomer(selectId);

    if (response) {
        let idC = $("#txtCustomerId").val();
        let nameC = $("#txtCustomerName").val();
        let addressC = $("#txtCustomerAddress").val();
        let numberC = $("#txtCustomerNumber").val();
        let emailC = $("#txtCustomerEmail").val();

        let c = new Customer(idC,nameC,addressC,numberC,emailC);

        let i = selectCustomerIndex(selectId);
        customerData.splice(i,1);

        customerData.push(c);

        loadAllCustomer();
        customerLoadComboBox();
        clearCustomer();

        $("#updateCustomerButton").attr('disabled',true);
        $("#deleteCustomerButton").attr('disabled',true);
    }else {
        clearCustomer();
    }
});

/*delete*/

$("#deleteCustomerButton").click(function () {

    var selectId = $("#txtCustomerId").val();
    let i = selectCustomerIndex(selectId);

    customerData.splice(i,1);

    loadAllCustomer();
    customerLoadComboBox();
    removeCustomerCount();
    allCustomerCount();
    clearCustomer();

    $("#saveCustomerButton").attr('disabled',true);
    $("#updateCustomerButton").attr('disabled',true);
    $("#deleteCustomerButton").attr('disabled',true);

});

/*search*/

$("#customerSearchButton").click(function () {

    var searchId = $("#searchCustomerId").val();
    var response = searchCustomer(searchId);

    clearSearchCustomer();

    if (response) {
        $("#txtCustomerId").val(response.getCustomerId());
        $("#txtCustomerName").val(response.getCustomerName());
        $("#txtCustomerAddress").val(response.getCustomerAddress());
        $("#txtCustomerNumber").val(response.getCustomerNumber());
        $("#txtCustomerEmail").val(response.getCustomerEmail());

        $("#saveCustomerButton").attr('disabled',true);
        $("#updateCustomerButton").attr('disabled',false);
        $("#deleteCustomerButton").attr('disabled',false);
    }else {
        clearCustomer();
    }

});

/*validation*/

$("#saveCustomerButton").attr('disabled',true);
$("#updateCustomerButton").attr('disabled',true);
$("#deleteCustomerButton").attr('disabled',true);

const cId = /^(C-)[0-9]{3,5}$/;
const cName = /^[A-z]{4,20}$/;
const cAddress = /^[A-z,0-9]{5,30}$/;
const cNumber = /^(07)[0-9]{8}$/;
const cEmail = /^[A-z,0-9]{6,20}(@gmail.com)$/;

$("#txtCustomerId").on('keyup', function (event) {
    saveCustomerButton();
    if (event.key == "Enter") {
        customerValidationFocus();
    }
});

$("#txtCustomerName").on('keyup', function (event) {
    saveCustomerButton();
    if (event.key == "Enter") {
        customerValidationFocus();
    }
});

$("#txtCustomerAddress").on('keyup', function (event) {
    saveCustomerButton();
    if (event.key == "Enter") {
        customerValidationFocus();
    }
});

$("#txtCustomerNumber").on('keyup', function (event) {
    saveCustomerButton();
    if (event.key == "Enter") {
        customerValidationFocus();
    }
});

$("#txtCustomerEmail").on('keyup', function (event) {
    saveCustomerButton();
    if (event.key == "Enter") {
        customerValidationFocus();
    }
});

$("#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerNumber,#txtCustomerEmail").on('blur', function () {
    customerValidation();
});

/*function*/

let id = 2;
function customerId() {
    if (id < 10) {
        $("#txtCustomerId").val("C-00"+id);
        id++;
    }else if (id < 100) {
        $("#txtCustomerId").val("C-0"+id);
        id++;
    }else {
        $("#txtCustomerId").val("C-"+id);
        id++;
    }
}

function loadAllCustomer() {
    $("#customerTableBody").empty();
    for (var i in customerData) {
        let tableRow = `<tr><td>${customerData[i].getCustomerId()}</td><td>${customerData[i].getCustomerName()}</td><td>${customerData[i].getCustomerAddress()}</td><td>${customerData[i].getCustomerNumber()}</td><td>${customerData[i].getCustomerEmail()}</td></tr>`;
        $("#customerTableBody").append(tableRow);
    }
}

function searchCustomer(id) {
    for (let i=0 ; i<customerData.length ; i++) {
        if (customerData[i].getCustomerId() == id) {
            return customerData[i];
        }
    }
}

function selectCustomerIndex(id) {
    for (let i=0 ; i<customerData.length ; i++) {
        if (customerData[i].getCustomerId() == id) {
            return i;
        }
    }
}

let addCustomer = 0;
function addCustomerCount() {
    addCustomer++;
    $("#addCustomerCount").text(addCustomer);
}

let removeCustomer = 0;
function removeCustomerCount() {
    removeCustomer++;
    $("#removeCustomerCount").text(removeCustomer);
}

function allCustomerCount() {
    $("#customerCount").empty();
    let customerCount = 0;
    for (var i in customerData) {
        customerCount++;
        $("#customerCount").text(customerCount);
        $("#allCustomerCount").text(customerCount);
    }
}

function clearSearchCustomer() {
    $("#searchCustomerId").val("");
}

function clearCustomer() {
    $("#txtCustomerName").val("");
    $("#txtCustomerAddress").val("");
    $("#txtCustomerNumber").val("");
    $("#txtCustomerEmail").val("")

    $("#txtCustomerId").css('border', '1px solid #aeaeda');
    $("#txtCustomerName").css('border', '1px solid #aeaeda');
    $("#txtCustomerAddress").css('border', '1px solid #aeaeda');
    $("#txtCustomerNumber").css('border', '1px solid #aeaeda');
    $("#txtCustomerEmail").css('border', '1px solid #aeaeda');
}

function customerValidation() {
    var cusId = $("#txtCustomerId").val();
    if (cId.test(cusId)) {
        $("#txtCustomerId").css('border', '2px solid blue');
        var cusName = $("#txtCustomerName").val();
        if (cName.test(cusName)) {
            $("#txtCustomerName").css('border', '2px solid blue');
            var cusAddress = $("#txtCustomerAddress").val();
            if (cAddress.test(cusAddress)) {
                $("#txtCustomerAddress").css('border', '2px solid blue');
                var cusNumber = $("#txtCustomerNumber").val();
                if (cNumber.test(cusNumber)) {
                    $("#txtCustomerNumber").css('border', '2px solid blue');
                    var cusEmail = $("#txtCustomerEmail").val();
                    if (cEmail.test(cusEmail)) {
                        $("#txtCustomerEmail").css('border', '2px solid blue')
                        return true;
                    }else {
                        $("#txtCustomerEmail").css('border', '2px solid red');
                        return false;
                    }
                }else {
                    $("#txtCustomerNumber").css('border', '2px solid red');
                    return false;
                }
            }else {
                $("#txtCustomerAddress").css('border', '2px solid red');
                return false;
            }
        }else {
            $("#txtCustomerName").css('border', '2px solid red');
            return false;
        }
    }else {
        $("#txtCustomerId").css('border', '2px solid red');
        return false;
    }
}

function customerValidationFocus() {
    var cusId = $("#txtCustomerId").val();
    if (cId.test(cusId)) {
        var cusName = $("#txtCustomerName").val();
        $("#txtCustomerName").focus();
        if (cName.test(cusName)) {
            var cusAddress = $("#txtCustomerAddress").val();
            $("#txtCustomerAddress").focus();
            if (cAddress.test(cusAddress)) {
                var cusNumber = $("#txtCustomerNumber").val();
                $("#txtCustomerNumber").focus();
                if (cNumber.test(cusNumber)) {
                    var cusEmail = $("#txtCustomerEmail").val();
                    $("#txtCustomerEmail").focus();
                    if (cEmail.test(cusEmail)) {
                    }else {
                        $("#txtCustomerEmail").focus();
                    }
                }else {
                    $("#txtCustomerNumber").focus();
                }
            }else {
                $("#txtCustomerAddress").focus();
            }
        }else {
            $("#txtCustomerName").focus();
        }
    }else {
        $("#txtCustomerId").focus();
    }
}

function saveCustomerButton() {
    let button = customerValidation();
    if (button) {
        $("#saveCustomerButton").attr('disabled',false);
    }else {
        $("#saveCustomerButton").attr('disabled',true);
    }
}
