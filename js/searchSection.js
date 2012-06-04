function search_keyword(keyword) {
    $.mobile.changePage("#monitorDetailsSections");
//    $("#monitorDetailsSections .container").html(loading)

    $("#monitorDetailsSections").html(loading)
    closeMenu()
    if (environment == "test") {
        var url = URL + "/FRMobileService/authentication.jsp?fn=getSearchResults&q=" + keyword + "&code=" + code
        console.log(">>>>> Search using : " + url)
        callAJAX(url, "search_keyword")
    }
    if (environment == "dev") {
        searchResults(searchPage_keyWord, "search_keyword")
//        setSearchData(searchPage_keyWord)
    }
//    monitorDetails(searchPage_keyWord, "search_keyword")
}

//This function will process the results of search
function searchResults(data, calledFrom) {
    console.log(">>>>>>>> Inside search Results !!!!")
    allSectionMenu("#monitorDetailsSections", calledFrom)

    var frContent = ''
    var searchTopic = data.data.searches[0].title
    var searchSection = data.data.sections
    var searchSectionTitle = ""
    var searchSectionResult = data.data.results;
    var searchSectionResultID = "";
    var searchSectionResultType = "";
    var searchSectionsLength = searchSection.length
    var searchBucketLength = 0
    var searchBucket = ""
    var searchBucketTitle = ""
    var searchBucketSource = ""
    var searchBucketFavIcon = ""
    var searchBucketDate = ""
    var itemID = ""
    var bookMarkClass = ""
    var isBookMark = ""
    var referSearchResult = 0;


    for (var i = 0; i < searchSectionsLength; i++) {
        searchBucketLength = searchSection[i].buckets.length;
        for (var j = 0; j < searchBucketLength; j++) {
            searchBucket = searchSection[i].buckets[j]
            searchSectionTitle = searchBucket.title
            frContent += '<div class="item_header blue"><span>' + searchSectionTitle + '</span></div>'
            frContent += '<div class="outer">'
            for (var k = 0; k < searchBucket.baseResults.length; k++) {
                searchBucketTitle = searchSectionResult[referSearchResult].title
                searchSectionResultID = searchSectionResult[referSearchResult].id
                itemID = searchSectionResult[referSearchResult].itemId
                searchSectionResultType = searchSectionResult[referSearchResult].type
                searchBucketFavIcon = searchSectionResult[referSearchResult].favicon
                searchBucketSource = searchSectionResult[referSearchResult].source
                searchBucketDate = searchSectionResult[referSearchResult].timestamp
                isBookMark = searchSectionResult[referSearchResult].isBookmarked
                searchBucketDate = searchBucketDate.split(201, 1)
                frContent += '<div class="search_item">'

                bookMarkClass = (isBookMark) ? "bookmark_active bookmark_common_h" : "bookmark bookmark_common_h"
                frContent += '<div class="' + bookMarkClass + '" docID = "' + searchSectionResultID + '" itemID = "' + itemID + '">&nbsp;</div>'

                frContent += '<div class="titlearea" onclick=\'monitorArticleSection("' + searchSectionResultID + '", "' + searchSectionResultType + '", "' + searchSectionTitle + '")\'>'
                frContent += '<div class="title">' + searchBucketTitle + '</div>'
                frContent += '<div class="source"><span class="favicon"><img src ="' + searchBucketFavIcon + '" width=16 height=16 /></span>' + searchBucketSource + '<span class="date">' + searchBucketDate + '</span></div>'
                frContent += '</div>'
                frContent += '</div>'
//                frContent += '</div>'
//                console.log(">>>>> " + referSearchResult + " - " + searchSectionResult[referSearchResult].title)
                referSearchResult++;
            }
            frContent += '</div>'
//            frContent += '</div>'
//            console.log(">>>> : " + searchBucket.title + " : " + searchBucket.baseResults.length)
        }
    }
    $("#monitorDetailsSections .container").html(frContent)
    checkBookMarkItem();
    console.log(">>>> Total Search Results : " + referSearchResult)
//    console.log(">>>>>> Total number of buckets : " + searchResultSectionsLength)

}
