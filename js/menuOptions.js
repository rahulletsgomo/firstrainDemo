function goBack() {
    history.go(-1);
    $("#signInLoading").css("visibility", "hidden");
}

function manipulateMenu() {
    $("#openMenu").toggle(function () {
        showMenu()
    }, function () {
        hideMenu()
    })
}

function showMenu() {
    var menuHeight = $("#landingPage").css("height");
    $("#menu").css({
        visibility:"visible",
        height:menuHeight
    });
    $("#landingPage").animate({
        position:"absolute",
        left:"150px"
    }, 100);
}

function hideMenu() {
    $("#landingPage").css({
        border:"0px",
        position:"absolute",
        left:"0px"
    });
    $("#menu").css({
        visibility:"hidden"
    })

}