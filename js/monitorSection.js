function monitorDetails(data) {
    var monitorSectionLength = data.data.sections.length;
    var monitorSection = data.data.sections;
    var monitorTitle = data.data.monitor.title;
    var monitorSectionResult = data.data.results;
    var monitorSectionType = "";
    var monitorSectionTitle = "";
    var monitorSectionHeader = "";
    var monitorSectionId = "";
    var monitorId = data.data.monitor.id;
    var referResultID = 0;
    var liOption = "";
    var docSource;
    var docDate;
    var sectionResult;
    var sectionResultClass;
    var docTitle;
    var docIcon;
    var docID;
    var frContent = "";
    var tweeterImage = "";
    allSectionMenu("#monitorDetailsPage")


//    $(".current_monitor").html(monitorTitle)
    for (var i = 0; i < monitorSectionLength; i++) {
        monitorSectionType = monitorSection[i].type
        monitorSectionHeader = setMonitorHeaderType(monitorSectionType);
        if (monitorSectionType == "TWEETS") {
            frContent += '<div class="item_header tweet" style="margin-bottom: 0px"><span class="tweeticon_bird"></span><span>FirstTweets</span></div>'
        }
        else {
            frContent += '<div class="item_header ' + monitorSectionHeader + '"><span>' + monitorSection[i].title + '</span></div>'
        }
        frContent += '<div class="outer">'

        var sectionBaseResultsLength = monitorSection[i].baseResults.length

        frContent += '<div class="search_item">'
        for (var j = 0; j < sectionBaseResultsLength; j++) {
            sectionResult = monitorSectionResult[referResultID];

            docID = (sectionResult.id) ? sectionResult.id : "";
            docSource = (sectionResult.source) ? sectionResult.source : "";
            docTitle = (sectionResult.title) ? sectionResult.title : "";
            docIcon = (sectionResult.favicon) ? sectionResult.favicon : "";
            docDate = (sectionResult.timestamp) ? sectionResult.timestamp : "";
            docDate = (docDate != "") ? docDate.split(201, 1) : docDate;


            sectionResultClass = (sectionResult.type == "TWEETS") ? "search_item_tweet" : "search_item"
            liOption += '<div onclick=\'monitorArticleSection("' + docID + '")\' class=' + sectionResultClass + '>'


            if ((monitorSectionType == "HIGHLIGHTS") || (monitorSectionType == "SEARCH")) {
                liOption += '<div class="bookmark">&nbsp;</div>'
            }

            if (sectionResult.type == "TWEETS") {
                tweeterImage = sectionResult.extra.userImage;
                liOption += '<div class="tweet_img"><img src="' + tweeterImage + '"></div>'
                liOption += '<div>' + docTitle + '</div>'
                liOption += '<div class="source"><span class="date">' + docDate + '</span></div>'
            }

            else {
                liOption += '<div class="titlearea">'
                liOption += '<div class="title">' + docTitle + '</div>'
                liOption += '<div class="source">'
                if (docIcon != "") {
                    liOption += '<span class="favicon"><img src="' + docIcon + '" alt="Source Image" width=16 height=16 />&nbsp;&nbsp;</span>'
                }
                liOption += docSource
                liOption += '<span class="date">' + docDate + '</span>'
                liOption += '</div>'
                liOption += '</div>'
            }
            liOption += '</div>'

            frContent += liOption

            //Clear the previous variables before going to the next result
            docSource = ""
            docTitle = ""
            docIcon = ""
            liOption = ""

            referResultID++; //Move to the next result
        }


//        This will check for whether a has more button is required or not
        if (monitorSection[i].hasMore) {
            monitorSectionType = monitorSection[i].type;
            monitorSectionTitle = monitorSection[i].title;
            monitorSectionId = monitorSection[i].id;

            frContent += '<div class="moresearch"><input type="button" value="More &#187;' + monitorSectionTitle + '" class="monitorDetails_h btn grey" sectionType="' + monitorSectionType + '" monitorId="' + monitorId + '"sectionId = "' + monitorSectionId + '" /></div>'
        }


        frContent += '</div>'
        frContent += '</div>'
    }

    $(".container").html(frContent)
}

function setMonitorHeaderType(monitorSectionType) {
    var monitorSectionHeader;
    switch (monitorSectionType) {
        case 'MANAGEMENT_TURNOVER':
            monitorSectionHeader = "green";
            break;
        case 'EVENTS':
            monitorSectionHeader = "green";
            break;
        default:
            monitorSectionHeader = "red";
            break;
    }

    return monitorSectionHeader;
}

function monitorDetailsTweets(monitorId, sectionId, sectionType) {
    $.mobile.changePage("#monitorDetailsTweets");
}

function monitorDetailsSearchResults(searchID) {
    console.log("Inside monitorDetailsSearchResults ....")
    if (environment == "test") {
        var url = URL + "/FRMobileService/authentication.jsp?fn=getSearchResults&id=" + searchID + "&subq=docs&start=0&rows=30&code=" + code
        callAJAX(url, "monitorDetailsSearchResults")
    }
    else if (environment == "dev") {
        $.mobile.changePage("#monitorDetailsSections");
        searchResults(searchPageJSON)
    }
}

//This function will process the results of search
function searchResults(data) {
    var frContent = ''
    var searchTopic = data.data.searches[0].title
    var searchSection = data.data.sections
    var searchSectionResult = data.data.results;
    var searchSectionsLength = searchSection.length
    var searchBucketLength = 0
    var searchBucket = ""
    var searchBucketTitle = ""
    var searchBucketSource = ""
    var searchBucketFavIcon = ""
    var searchBucketDate = ""
    var referSearchResult = 0;

    allSectionMenu("#monitorDetailsSections")

    for (var i = 0; i < searchSectionsLength; i++) {
        searchBucketLength = searchSection[i].buckets.length;
        for (var j = 0; j < searchBucketLength; j++) {
            searchBucket = searchSection[i].buckets[j]
            frContent += '<div class="item_header blue"><span>' + searchBucket.title + '</span></div>'
            frContent += '<div class="outer">'
            for (var k = 0; k < searchBucket.baseResults.length; k++) {
                searchBucketTitle = searchSectionResult[referSearchResult].title
                searchBucketFavIcon = searchSectionResult[referSearchResult].favicon
                searchBucketSource = searchSectionResult[referSearchResult].source
                searchBucketDate = searchSectionResult[referSearchResult].timestamp
                searchBucketDate = searchBucketDate.split(201, 1)
                frContent += '<div class="search_item">'
                frContent += '<div class="bookmark">&nbsp;</div>'
                frContent += '<div class="titlearea">'
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
    $(".container").html(frContent)
    console.log(">>>> Total Search Results : " + referSearchResult)
//    console.log(">>>>>> Total number of buckets : " + searchResultSectionsLength)

}

function monitorDetailsTweetResults(monitorID) {
    if (environment == "test") {
        var url = URL + "/FRMobileService/authentication.jsp?fn=getMonitorResults&id=" + monitorID + "&subq=tweets&start=0&rows=30&code=" + code
        callAJAX(url, "monitorDetailsTweetResults")
    }
    else if (environment == "dev") {
        tweetResults(monitorTweetsJSON)
    }
}

function tweetResults(data) {
    $.mobile.changePage("#monitorDetailsSections")
    var frContent = ""
    var headerTitle = data.data.sections[0].title
    var resultsLength = data.data.results.length
    var resultID = data.data;
    var tweeterName = ""
    var tweeterImage = ""
    var tweetTitle = ""
    var tweetDate = ""

    allSectionMenu("#monitorDetailsSections")

    frContent += '<div class="item_header tweet" style="margin-bottom: 0px"><span class="tweeticon_bird"></span><span>' + headerTitle + '</span></div>'
    frContent += '<div class="outer">'
    for (var i = 0; i < resultsLength; i++) {
        tweeterName = resultID.results[i].extra.name;
        tweeterImage = resultID.results[i].extra.userImage;
        tweetTitle = resultID.results[i].title;
        tweetDate = resultID.results[i].timestamp;
        tweetDate = tweetDate.split(201, 1);

        frContent += '<div class="search_item_tweet">'
        frContent += '<div class="tweet_img"><img src="' + tweeterImage + '"></div>'
        frContent += '<div>' + tweetTitle + '</div>'
        frContent += '<div class="source">' + tweeterName + '<span class="date">' + tweetDate + '</span></div>'
        frContent += '</div>'

    }
    frContent += '</div>'
    $(".container").html(frContent)
}

function monitorDetailsMT_EventsResults(monitorID, calledFrom) {
    if (environment == "test") {
        var subqField = (calledFrom == "events") ? "events" : "mt"
        var url = URL + "/FRMobileService/authentication.jsp?fn=getMonitorResults&id=" + monitorID + "&subq=" + subqField + "&start=0&rows=30&code=" + code
        callAJAX(url, "monitorDetailsMT_EventsResults")
    }
    else if (environment == "dev") {
        var jsonToUse = (calledFrom == "events") ? monitorEvents : monitorDetailsMT
        mt_eventsResults(jsonToUse)
    }
}

function mt_eventsResults(data) {
    $.mobile.changePage("#monitorDetailsSections")
    allSectionMenu()
    var sectionsTotal = data.data.results.length
    var sectionResult = data.data
    var sectionTitle = ""
    var sectionDate = ""
    var mtTitle = data.data.sections[0].title
    var frContent = ""
    frContent += '<div class="item_header green"><span>' + mtTitle + '</span></div>'
    frContent += '<div class="outer">'
    for (var i = 0; i < sectionsTotal; i++) {
        sectionTitle = sectionResult.results[i].title
        sectionDate = sectionResult.results[i].timestamp
        sectionDate = sectionDate.split(201, 1)

        frContent += '<div class="search_item">'
        frContent += '<div>'
        frContent += sectionTitle
        frContent += '</div>'
        frContent += '<div class="source"><span class="date">' + sectionDate + '</span></div>'
        frContent += '</div>'
    }
    frContent += '</div>'
    $(".container").html(frContent)
    console.log("Length of the results : " + resultsLength)

}

function allSectionMenu(sectionID) {
    var baseArea = ""
    baseArea += '<div class="all_selection" style="margin: 37px 0px 0px 0px"><input type="button" class="btn blue" value="All Selections"> </div>'
    baseArea += '<div class="container">'
    baseArea += '</div>'
    $(sectionID).html(baseArea)
}

function monitorArticleSection(articleID) {
    $.mobile.changePage("#articleDetails")
    console.log(">>>>>> Article ID : " + articleID)
    if (environment == "test") {
        var url = URL + "/FRMobileService/authentication.jsp?fn=getDetails&ids=" + articleID + "&code=" + code
    }
    else if (environment == "dev") {
        monitorArticleDetails_document(articleDetails_document)
    }
}

function monitorArticleDetails_document(data) {
    console.log(">>>>>>> Inside monitorArticleDetails_document")
    $(".container").html("")

    var articleTitle = data.data.results[0].title
    var articleUrl = data.data.results[0].url
    var articleSource = data.data.results[0].source
    var articleDate = data.data.results[0].timestamp
    articleDate = articleDate.split(201, 1)
    var articleImage = data.data.results[0].image
    var articleFavIcon = data.data.results[0].favicon
    var articleSummary = data.data.results[0].summary
    var articleTweet = data.data.results[0].extra.tweetList
    var articleTweetsTotal = articleTweet.length
    var articleMatchedContent = data.data.results[0].extra.matchedContentTypes
    var articleMatchedContentTypesTotal = articleMatchedContent.length
    var articleMatchedCompaniesTotal = data.data.results[0].matchedCompanies.length
    var articleMatchedTopicsTotal = data.data.results[0].matchedTopics.length
    var tweetArea = ""

    var frContent = ""
    frContent += '<div class="item_header red"><span class="itemcounter">3 0f 40</span><span>FirstReads</span></div>'
    frContent += '<div class="outer">'
    frContent += '<div class="doc_content">'
    frContent += '<div class="doc_title">'
    frContent += '<div class="bookmark">&nbsp;</div>'
    frContent += '<div class="titlearea">'
    frContent += '<div class="title">' + articleTitle + '</div>'
    frContent += '<div class="source"><span class="favicon"><img src="' + articleFavIcon + '" alt=""></span>' + articleSource + '<span class="date">' + articleDate + '</span></div>'
    frContent += '</div>'
    frContent += '<div class="doc_summery">'
    if (articleImage != "") {
        frContent += '<span><img src="imgs/demoimage.jpeg"/></span>'
    }
    frContent += articleSummary
    frContent += '</div>'

    if (articleTweetsTotal > 0) {
        var tweetImg
        var tweetTitle
        frContent += '<div class="relatedtweet">'
        frContent += '<div class="title">Related Tweet:</div>'
        for (var i = 0; i < articleTweetsTotal; i++) {
            tweetImg = articleTweet[i].extra.userImage
            tweetTitle = articleTweet[i].title
            frContent += '<div class="tweet">'
            frContent += '<span class="tweet_img"><img src="' + tweetImg + '"></span>'
            frContent += '<span>'
            frContent += tweetTitle
            frContent += '</span>'
            frContent += '</div>'
            frContent += '</div>'
        }
    }

    if (articleMatchedContentTypesTotal > 0) {
        var contentName = ""
        frContent += '<div class="relatedTopics">'
        frContent += '<div class="title">Related Content:</div>'
        for (var articleMatchedContentType = 0; articleMatchedContentType < articleMatchedContentTypesTotal; articleMatchedContentType++) {
            contentName = articleMatchedContent[articleMatchedContentType].name
            frContent += '<div class="topic">'
            frContent += contentName
            frContent += '</div>'
        }
        frContent += '</div>'
    }
    frContent += '</div>'
    frContent += '<div class="documentActionButtons">'
    frContent += '<span><input type="button" class="btn grey document" value="Email"></span>'
    frContent += '<span><input type="button" class="btn grey document" value="Open"></span>'
    frContent += '</div>'
    frContent += '</div>'

    $(".container").html(frContent)

}






