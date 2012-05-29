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
        $("#headerButton").attr("data-rel", "back")
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
            headerContent += '<a id="headerButton" href="" onclick="clearDocumentScroll()">';
            headerContent += '<img src="images/backButton.png" alt="Go Back"/>';
            headerContent += '</a>';
            $(".menuArea").html(headerContent);
            break;

        case "getMonitorDetails":
            headerContent += '<a id="headerButton" href="" data-rel="back" onclick=\'changeHeader("homePage")\'>';
            headerContent += '<img src="images/backButton.png" alt="Go Back"/>';
            headerContent += '</a>';
            $(".menuArea").html(headerContent);
            break;

        case "goBack":
            headerContent += '<a id="headerButton" href="" data-rel="back">';
            headerContent += '<img src="images/backButton.png" alt="Go Back"/>';
            headerContent += '</a>';
            $(".menuArea").html(headerContent);
            break;

        default:
            console.log("Nowhere to go :(")
    }
}