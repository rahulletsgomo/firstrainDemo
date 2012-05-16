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
    $("#landingPage").css({
        position:"absolute",
        left:"150px"
    });
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

function changePage(changePageTo) {
    documentDetailsScroll.destroy();
    documentDetailsScroll = null;
    $.mobile.changePage("#" + changePageTo)
}