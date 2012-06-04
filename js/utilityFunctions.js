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

function closeMenu() {
    console.log(">>>>>>>>>> Inside closeMenu")
    if (isMenuOpen) {
        hideMenu();
        isMenuOpen = false;
    }
}
