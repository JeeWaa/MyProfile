/*    item page    */

/*save*/

$("#txtItemCode").val("I-001");

$("#saveItemButton").click(function () {

    let codeI = $("#txtItemCode").val();
    let nameI = $("#txtItemName").val();
    let companyI = $("#txtItemCompany").val();
    let priceI = $("#txtItemPrice").val();
    let qtyI = $("#txtItemQty").val();

    let i = new Item(codeI,nameI,companyI,priceI,qtyI);

    itemData.push(i);

    loadAllItem();

    $("#itemTableBody>tr").click(function () {

        let itemCode = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let itemCompany = $(this).children(":eq(2)").text();
        let itemPrice = $(this).children(":eq(3)").text();
        let itemQty = $(this).children(":eq(4)").text();

        $("#txtItemCode").val(itemCode);
        $("#txtItemName").val(itemName);
        $("#txtItemCompany").val(itemCompany);
        $("#txtItemPrice").val(itemPrice);
        $("#txtItemQty").val(itemQty);

    });

    itemLoadComboBox();
    itemCode();
    addItemCount();
    allItemCount();
    clearItem();

    $("#saveItemButton").attr('disabled',true);

});

/*update*/

$("#updateItemButton").click(function () {

    var selectCode = $("#txtItemCode").val();
    var response = searchItem(selectCode);

    if (response) {
        let codeI = $("#txtItemCode").val();
        let nameI = $("#txtItemName").val();
        let companyI = $("#txtItemCompany").val();
        let priceI = $("#txtItemPrice").val();
        let qtyI = $("#txtItemQty").val();

        let i = new Item(codeI,nameI,companyI,priceI,qtyI);

        let code = selectItemIndex(selectCode);
        itemData.splice(code,1);

        itemData.push(i);

        loadAllItem();
        itemLoadComboBox();
        clearItem();

        $("#saveItemButton").attr('disabled',true);
        $("#updateItemButton").attr('disabled',true);
        $("#deleteItemButton").attr('disabled',true);
    }else {
        clearItem();
    }
});

/*delete*/

$("#deleteItemButton").click(function () {

    var selectCode = $("#txtItemCode").val();
    let i = selectItemIndex(selectCode);

    itemData.splice(i,1);

    loadAllItem();
    itemLoadComboBox();
    removeItemCount();
    allItemCount();
    clearItem();

    $("#saveItemButton").attr('disabled',true);
    $("#updateItemButton").attr('disabled',true);
    $("#deleteItemButton").attr('disabled',true);

});

/*search*/

$("#itemSearchButton").click(function () {

    var searchCode = $("#searchItemCode").val();
    var response = searchItem(searchCode);

    clearSearchItem();

    if (response) {
        $("#txtItemCode").val(response.getItemCode());
        $("#txtItemName").val(response.getItemName());
        $("#txtItemCompany").val(response.getItemCompany());
        $("#txtItemPrice").val(response.getItemPrice());
        $("#txtItemQty").val(response.getItemQty());

        $("#saveItemButton").attr('disabled',true);
        $("#updateItemButton").attr('disabled',false);
        $("#deleteItemButton").attr('disabled',false);
    }else {
        clearItem();
    }

});

/*validation*/

$("#saveItemButton").attr('disabled',true);
$("#updateItemButton").attr('disabled',true);
$("#deleteItemButton").attr('disabled',true);

const iCode = /^(I-)[0-9]{3,5}$/;
const iName = /^[A-z]{3,20}$/;
const iCompany = /^[A-z,0-9]{3,30}$/;
const iPrice = /^[0-9]{2,}(.00)$/;
const iQty = /^[0-9]{2,}$/;

$("#txtItemCode").on('keyup', function (event) {
    saveItemButton();
    if (event.key == "Enter") {
        itemValidationFocus();
    }
});

$("#txtItemName").on('keyup', function (event) {
    saveItemButton();
    if (event.key == "Enter") {
        itemValidationFocus();
    }
});

$("#txtItemCompany").on('keyup', function (event) {
    saveItemButton();
    if (event.key == "Enter") {
        itemValidationFocus();
    }
});

$("#txtItemPrice").on('keyup', function (event) {
    saveItemButton();
    if (event.key == "Enter") {
        itemValidationFocus();
    }
});

$("#txtItemQty").on('keyup', function (event) {
    saveItemButton();
    if (event.key == "Enter") {
        itemValidationFocus();
    }
});

$("#txtItemCode,#txtItemName,#txtItemCompany,#txtItemPrice,#txtItemQty").on('blur', function () {
    itemValidation();
});

/*function*/

let code = 2;
function itemCode() {
    if (code < 10) {
        $("#txtItemCode").val("I-00"+code);
        code++;
    }else if (code < 100) {
        $("#txtItemCode").val("I-0"+code);
        code++;
    }else {
        $("#txtItemCode").val("I-"+code);
        code++;
    }
}

function loadAllItem() {
    $("#itemTableBody").empty();
    for (var i in itemData) {
        let tableRow = `<tr><td>${itemData[i].getItemCode()}</td><td>${itemData[i].getItemName()}</td><td>${itemData[i].getItemCompany()}</td><td>${itemData[i].getItemPrice()}</td><td>${itemData[i].getItemQty()}</td></tr>`;
        $("#itemTableBody").append(tableRow);
    }
}

function searchItem(code) {
    for (let i=0 ; i<itemData.length ; i++) {
        if (itemData[i].getItemCode() == code) {
            return itemData[i];
        }
    }
}

function selectItemIndex(code) {
    for (let i=0 ; i<itemData.length ; i++) {
        if (itemData[i].getItemCode() == code) {
            return i;
        }
    }
}

let addItem = 0;
function addItemCount() {
    addItem++;
    $("#addItemCount").text(addItem);
}

let removeItem = 0;
function removeItemCount() {
    removeItem++;
    $("#removeItemCount").text(removeItem);
}

function allItemCount() {
    $("#itemCount").empty();
    let itemCount = 0;
    for (var i in itemData) {
        itemCount++;
        $("#itemCount").text(itemCount);
        $("#allItemCount").text(itemCount);
    }
}

function clearSearchItem() {
    $("#searchItemCode").val("");
}

function clearItem() {
    $("#txtItemName").val("");
    $("#txtItemCompany").val("");
    $("#txtItemPrice").val("");
    $("#txtItemQty").val("");

    $("#txtItemCode").css('border', '1px solid #aeaeda');
    $("#txtItemName").css('border', '1px solid #aeaeda');
    $("#txtItemCompany").css('border', '1px solid #aeaeda');
    $("#txtItemPrice").css('border', '1px solid #aeaeda');
    $("#txtItemQty").css('border', '1px solid #aeaeda');
}

function itemValidation() {
    var itmCode = $("#txtItemCode").val();
    if (iCode.test(itmCode)) {
        $("#txtItemCode").css('border', '2px solid blue');
        var itmName = $("#txtItemName").val();
        if (iName.test(itmName)) {
            $("#txtItemName").css('border', '2px solid blue');
            var itmCompany = $("#txtItemCompany").val();
            if (iCompany.test(itmCompany)) {
                $("#txtItemCompany").css('border', '2px solid blue');
                var itmPrice = $("#txtItemPrice").val();
                if (iPrice.test(itmPrice)) {
                    $("#txtItemPrice").css('border', '2px solid blue');
                    var itmQty = $("#txtItemQty").val();
                    if (iQty.test(itmQty)) {
                        $("#txtItemQty").css('border', '2px solid blue')
                        return true;
                    }else {
                        $("#txtItemQty").css('border', '2px solid red');
                        return false;
                    }
                }else {
                    $("#txtItemPrice").css('border', '2px solid red');
                    return false;
                }
            }else {
                $("#txtItemCompany").css('border', '2px solid red');
                return false;
            }
        }else {
            $("#txtItemName").css('border', '2px solid red');
            return false;
        }
    }else {
        $("#txtItemCode").css('border', '2px solid red');
        return false;
    }
}

function itemValidationFocus() {
    var itmCode = $("#txtItemCode").val();
    if (iCode.test(itmCode)) {
        var itmName = $("#txtItemName").val();
        $("#txtItemName").focus();
        if (iName.test(itmName)) {
            var itmCompany = $("#txtItemCompany").val();
            $("#txtItemCompany").focus();
            if (iCompany.test(itmCompany)) {
                var itmPrice = $("#txtItemPrice").val();
                $("#txtItemPrice").focus();
                if (iPrice.test(itmPrice)) {
                    var itmQty = $("#txtItemQty").val();
                    $("#txtItemQty").focus();
                    if (iQty.test(itmQty)) {
                    }else {
                        $("#txtItemQty").focus();
                    }
                }else {
                    $("#txtItemPrice").focus();
                }
            }else {
                $("#txtItemCompany").focus();
            }
        }else {
            $("#txtItemName").focus();
        }
    }else {
        $("#txtItemCode").focus();
    }
}

function saveItemButton() {
    let button = itemValidation();
    if (button) {
        $("#saveItemButton").attr('disabled',false);
    }else {
        $("#saveItemButton").attr('disabled',true);
    }
}