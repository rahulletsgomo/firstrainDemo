function goBack() {
    history.go(-1);
    $("#signInLoading").css("visibility", "hidden");
}

function manipulateMenu() {
    $("#openMenu_h").toggle(function () {
        showMenu()
    }, function () {
        hideMenu()
    })
}

function showMenu() {
    console.log(">>>> Show menu")
    $(".Menu").css({
        visibility:"visible"
    });
    isMenuOpen = true
}

function hideMenu() {
    console.log(">>>>>>>> Inside hideMenu")
    $(".Menu").css({
        visibility:"hidden"
    });
    isMenuOpen = false;
}

function clearDocumentScroll() {
    documentDetailsScroll.destroy();
    documentDetailsScroll = null;
}

function goBack() {
    closeMenu()
    var currentPage = $.mobile.activePage.attr('id')
    if ((currentPage == "documentDetailsPage") || (currentPage == "monitorDetailsPage")) {
        changeHeader("homePage")
    }
}

function showHomePage() {
    $.mobile.changePage("#homePage")
    closeMenu()
    changeHeader("homePage")
}

function changeHeader(targetLocation) {
    var headerContent = "";
    switch (targetLocation) {
        case "homePage" :
            headerContent += '<div class="menu_icon" id="openMenu_h"><img src="img/menu1.png"/></div>';
            headerContent += '<div><span class="header search">FirstRain</span></div><div><span class="subheader"></span></div>';
            $(".header_region").html(headerContent);
            manipulateMenu();
            break;

        case "" :
            console.log(">>>>> Inside back condition")
            headerContent += '<a href="" data-rel="back" onclick="goBack()"><div class="back_button"><img src="img/back2.png" width="50" height="30"/></div></a>';
            headerContent += '<div class="menu_icon" id="openMenu_h"><img src="img/menu1.png"/></div>';
            headerContent += '<div><span class="header search">FirstRain</span></div><div><span class="subheader"></span></div>';
            $(".header_region").html(headerContent);
            manipulateMenu();
            break;

        default:
            console.log("Nowhere to go :(")
    }
}

