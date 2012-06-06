function manipulateMenu() {
    $("#openMenu_h").toggle(function () {
        showMenu()
    }, function () {
        hideMenu()
    })
}

function showMenu() {
    $(".Menu").css({
        visibility:"visible"
    });
    isMenuOpen = true
}

function hideMenu() {
    $(".Menu").css({
        visibility:"hidden"
    });
    isMenuOpen = false;
}

function clearDocumentScroll() {
    documentDetailsScroll.destroy();
    documentDetailsScroll = null;
}

function goBack(calledFrom) {
    if ((calledFrom == "monitorArticleSection") || (calledFrom == "monitorDetailsSearchResults")) {
        console.log("Currently selected Item [goBack] : " + currentItem)
        if (isCurrentItemChanged) {
            console.log(">>>>>>> Inside the required condition")
            if ($("#" + currentItem + " .bookmark_common_h").hasClass("bookmark")) {
                $("#" + currentItem + " .bookmark_common_h").removeClass("bookmark")
                $("#" + currentItem + " .bookmark_common_h").addClass("bookmark_active")
            }
            else if ($("#" + currentItem + " .bookmark_common_h").hasClass("bookmark_active")) {
                $("#" + currentItem + " .bookmark_common_h").removeClass("bookmark_active")
                $("#" + currentItem + " .bookmark_common_h").addClass("bookmark")
            }
            isCurrentItemChanged = false;
        }
    }
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

function changeHeader(targetLocation, calledFrom) {
    var headerContent = "";
    switch (targetLocation) {
        case "homePage" :
            headerContent += '<div class="menu_icon" id="openMenu_h"><img src="img/menu1.png"/></div>';
            headerContent += '<div><span class="header">FirstRain</span></div><div><span class="subheader"></span></div>';
            $(".header_region").html(headerContent);
            manipulateMenu();
            break;

        case "" :
            headerContent += '<a href="" data-rel="back" onclick=\'goBack("' + calledFrom + '")\'><div class="back_button"><img src="img/back2.png" width="50" height="30"/></div></a>';
            headerContent += '<div class="menu_icon" id="openMenu_h"><img src="img/menu1.png"/></div>';
            headerContent += '<div><span class="header">FirstRain</span></div><div><span class="subheader"></span></div>';
            $(".header_region").html(headerContent);
            manipulateMenu();
            break;

        default:
            console.log("Nowhere to go :(")
    }
}

