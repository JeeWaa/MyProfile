/*    sidebar    */

$("#home").click(function () {
    $("#homePage").css("display","block");
    $("#customerPage").css("display","none");
    $("#itemPage").css("display","none");
    $("#orderPage").css("display","none");
});
$("#customer").click(function () {
    $("#homePage").css("display","none");
    $("#customerPage").css("display","block");
    $("#itemPage").css("display","none");
    $("#orderPage").css("display","none");
});
$("#item").click(function () {
    $("#homePage").css("display","none");
    $("#customerPage").css("display","none");
    $("#itemPage").css("display","block");
    $("#orderPage").css("display","none");
});
$("#order").click(function () {
    $("#homePage").css("display","none");
    $("#customerPage").css("display","none");
    $("#itemPage").css("display","none");
    $("#orderPage").css("display","block");
});