function checkBookMarkItem(calledFrom) {
    var docID = ""
    var itemID = ""
    var sectionType = ""
    var url = ""

    $(".bookmark_common_h").click(function () {


        docID = $(this).attr("docID")
        sectionType = $(this).attr("sectionType")
        itemID = $(this).attr("itemID")

        if (String(calledFrom) != "undefined") {
            isCurrentItemChanged = true
        }
        console.log("Current State of isItemChanged : " + isCurrentItemChanged)

        if ($(this).hasClass("bookmark")) {
            $(this).removeClass("bookmark")
            $(this).addClass("bookmark_active")

            if (environment == "test") {
                url = URL + "/FRMobileService/authentication.jsp?fn=clip&type=Clipped&refersTo=" + docID + "&code=" + code
                callAJAX(url, "checkBookMarkItem")

            }
        }
        else if ($(this).hasClass("bookmark_active")) {
            $(this).removeClass("bookmark_active")
            $(this).addClass("bookmark")

            if (environment == "test") {
                url = URL + "/FRMobileService/authentication.jsp?fn=unclip&itemId=" + itemID + "&code=" + code
                callAJAX(url, "checkBookMarkItem")
            }
        }
    })

}


function closeMenu() {
    if (isMenuOpen) {
        hideMenu();
        isMenuOpen = false;
    }
}

var startCount = 30;
function handleLoadMore(keyword) {

//    $(".loadMore_h").click(function () {
//        console.log(">>>>>> Inside the click event")
////        $(".loadMore_h").html("Loading ...")
//
//        if (environment == "dev") {
//            console.log(">>>>>> Inside the dev environment for loadMore feature")
////            $("#monitorDetailsSections .container .additionalContent").append("Rahul")
////            $("#monitorDetailsSections .container .loadMore_h").html("Rahul")
//            searchResults(searchPage_keyWord, "handleLoadMore")
//        }
//
//        else if (environment == "test") {
//            var url = URL + "/FRMobileService/authentication.jsp?fn=getSearchResults&id=" + keyword + "&subq=docs&start=" + startCount + "&rows=30&code=" + code
//            startCount++
//            callAJAX(url, "handleLoadMore")
//            console.log(">>>>>>>>> URL to search for is : " + url)
//        }
//    })

}

