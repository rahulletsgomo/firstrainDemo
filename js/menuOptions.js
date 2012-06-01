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
//    var menuHeight = $("#landingPage").css("height");
    $(".Menu").css({
        visibility:"visible"
    });
//    $("#landingPage").css({
//        position:"absolute",
//        left:"150px"
//    });
}

function hideMenu() {
    console.log(">>>>>>>> Inside hideMenu")
//    $("#landingPage").css({
//        position:"absolute",
//        left:"0px"
//    });
    $(".Menu").css({
        visibility:"hidden"
    });
}

function clearDocumentScroll() {
//    if (version == "desktopWidget") {
//        $.mobile.changePage("#homePage");
//    }
//    else{
//        $("#headerButton").attr("data-rel", "back")
//    }
//    changeHeader("homePage")
    var currentPage = $.mobile.activePage.attr('id')
    if ((currentPage == "documentDetailsPage") || (currentPage == "monitorDetailsPage")) {
        changeHeader("homePage")
    }
    documentDetailsScroll.destroy();
    documentDetailsScroll = null;
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
            console.log(">>>>> Current Page : " + $.mobile.activePage)
            headerContent += '<a href="" data-rel="back" onclick="clearDocumentScroll()"><div class="back_button"><img src="img/back2.png" width="50" height="30"/></div></a>';
            headerContent += '<div class="menu_icon" id="openMenu_h"><img src="img/menu1.png"/></div>';
            headerContent += '<div><span class="header search">FirstRain</span></div><div><span class="subheader"></span></div>';
            $(".header_region").html(headerContent);
            manipulateMenu();
            break;
//
//        case "documentDetailsPage":
//            headerContent += '<a id="headerButton" href="" onclick="clearDocumentScroll()">';
//            headerContent += '<img src="images/backButton.png" alt="Go Back"/>';
//            headerContent += '</a>';
//            $(".menuArea").html(headerContent);
//            break;
//
//        case "getMonitorDetails":
//            headerContent += '<a id="headerButton" href="" data-rel="back" onclick=\'changeHeader("homePage")\'>';
//            headerContent += '<img src="images/backButton.png" alt="Go Back"/>';
//            headerContent += '</a>';
//            $(".menuArea").html(headerContent);
//            break;

//        case "goBack":
//            headerContent += '<a id="headerButton" href="" data-rel="back">';
//            headerContent += '<img src="images/backButton.png" alt="Go Back"/>';
//            headerContent += '</a>';
//            $(".menuArea").html(headerContent);
//            break;

        default:
            console.log("Nowhere to go :(")
    }
}

function getCurrentPage(page) {

}