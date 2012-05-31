function search_keyword(keyword) {
    if (environment == "test") {
        var url = URL + "/FRMobileService/authentication.jsp?fn=getSearchResults&q=" + keyword + "&code=" + code
        console.log(">>>>> Search using : " + url)
    }
    if (environment == "dev") {
        setSearchData(searchPage_keyWord)
    }
//    monitorDetails(searchPage_keyWord, "search_keyword")
}

function setSearchData(data) {
    var sectionsInfo = data.data.sections
    var sectionsTotal = sectionsInfo.length
    var sectionType = ""
    var sectionTitle = ""
    var sectionBucketsInfo = sectionsInfo.buckets
    var sectionBucketsTotal = sectionsInfo.buckets.length
    var sectionBucketsTitle = ""
    var referenceID = 0

    for (var section = 0; section < sectionsTotal; section++) {
        sectionType = sectionsInfo[section].type
        sectionTitle = sectionsInfo[section].title
        for (var bucket = 0; bucket < sectionBucketsTotal; bucket++) {
            sectionBucketsTitle = sectionBucketsInfo[bucket].title;
        }
    }
}