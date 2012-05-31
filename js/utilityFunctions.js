function changeHeader(targetLocation) {
    var headerContent = "";
    switch (targetLocation) {
        case "homePage" :
            headerContent += '<div class="headerName">';
            headerContent += '<div id="openMenu"><img src="images/menu.png" alt="Menu" height="30"/></div>';
            headerContent += 'FirstRain';
            headerContent += '</div>';
            $(".customheader").html(headerContent);
//            $.mobile.changePage("#homePage");
            break;

        case "documentDetailsPage":
            headerContent += '<div class="headerName">';
            headerContent += '<div style="margin: 0px">FirstRain</div>';
            headerContent += '<div style="float: left; padding: 0px 0px 0px 10px; margin: -22px 0px 0px 0px">';
            headerContent += '<a href="" data-rel="back" onclick="clearDocumentScroll()">';
            headerContent += '<img src="images/backButton.png" alt="Go Back"/>';
            headerContent += '</a>';
            headerContent += '</div>';
            headerContent += '</div>';
            $(".customheader").html(headerContent);
//            $.mobile.changePage("#documentDetailsPage");
            break;

        default:
            console.log("Nowhere to go :(")
    }
}

function bookMarkItem(docID, sectionType) {
    console.log(">>>>>>>>>>> Current Class : " + $(this).class)
    console.log(">>>>> Doc Item to bookmark : " + docID)

    if (environment == "test") {
        var url = URL + "/FRMobileService/authentication.jsp?fn=clip&type=Clipped&refersTo=" + docID + "&code=" + code
        console.log(">>>>>>> Url to bookmark : " + url)
    }
}

function unBookMarkItem(docID, sectionType) {
    console.log(">>>>> Doc Item to unBookmark : " + docID)
    if (environment == "test") {
        var url = URL + "/FRMobileService/authentication.jsp?fn=unclip&itemId=" + docID + "&code=" + code
        console.log(">>>>>>> Url to bookmark : " + url)
    }
}
