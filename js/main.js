function modalbox() {
    var id = $("#forgotModalPage");
    var maskHeight = $(document).height();
    var maskWidth = $(document).width();
    $("#mask").css({"height":maskHeight, "width":maskWidth});
    $("#mask").fadeIn(500);
    $("#mask").fadeTo("slow", 0.8);
    $(id).css({"top":"15%"});
    $(id).css({"left":"6%"});
    $(id).fadeIn(500);
}

function modalclose() {
    $("#mask").fadeOut(500);
    $("#forgotModalPage").fadeOut(500);
}

$("#mask").click(function () {
    $("#mask").fadeOut(500);
    $("#forgotModalPage").fadeOut(500);
});

function menuModalbox() {
    var id = $("#optionsPopover");
    var maskHeight = $(document).height();
    var maskWidth = $(document).width();
    //$("#maskmenu").css({"height":maskHeight,"width":maskWidth});
    $("#maskmenu").fadeIn(500);
    $("#maskmenu").fadeTo("slow", 0.8);
    $(id).css({"top":"15%"});
    $(id).css({"left":"6%"});
    $(id).fadeIn(500);
}

function menuModalclose() {
    $("#maskmenu").fadeOut(500);
    $("#optionsPopover").fadeOut(500);
}

$("#maskmenu").click(function () {
    $("#maskmenu").fadeOut(500);
    $("#optionsPopover").fadeOut(500);
});