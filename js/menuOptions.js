function goBack() {
    history.go(-1);
    $("#signInLoading").css("visibility", "hidden");
}

function manipulateMenu() {
    $("#openMenu").toggle(function () {
        console.log("Inside the first condition !!!!")
        showMenu()
    }, function () {
        console.log("Inside the second condition !!!!")
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
    console.log("Inside hideMenu function ...")
    console.log("Landing Page left position : " + $("#landingPage").css("left"))
    $("#landingPage").css({
        position:"absolute",
        left:"0px"
    });
    $("#menu").css({
        visibility:"hidden"
    })
}

function clearDocumentScroll() {
    if (version == "desktopWidget") {
        $.mobile.changePage("#homePage");
    }
    else{
        $()
    }
    changeHeader("homePage")
    documentDetailsScroll.destroy();
    documentDetailsScroll = null;
}

function changeHeader(targetLocation) {
    var headerContent = "";
    switch (targetLocation) {
        case "homePage" :
            headerContent += '<div id="openMenu"><img src="images/menu.png" alt="Menu" height="30"/></div>';
            $(".menuArea").html(headerContent);
            manipulateMenu();
            break;

        case "documentDetailsPage":
            headerContent += '<a id href="" onclick="clearDocumentScroll()">';
            headerContent += '<img src="images/backButton.png" alt="Go Back"/>';
            headerContent += '</a>';
            $(".menuArea").html(headerContent);
            break;

        default:
            console.log("Nowhere to go :(")
    }
}