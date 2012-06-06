function monitorDetails(data) {
    var monitorSection = data.data.sections;
    var monitorSectionLength = monitorSection.length;
    var monitorInfo = data.data.monitor;
    var monitorTitle = monitorInfo.title;
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
    var itemID;
    var frContent = "";
    var tweeterImage = "";
    var bookMarkClass = ""
    var articleID = ""
    allSectionMenu("#monitorDetailsPage")

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

        for (var j = 0; j < sectionBaseResultsLength; j++) {
            sectionResult = monitorSectionResult[referResultID];

            docID = (sectionResult.id) ? sectionResult.id : "";
            itemID = (sectionResult.itemId) ? sectionResult.itemId : "";
            docSource = (sectionResult.source) ? sectionResult.source : "";
            docTitle = (sectionResult.title) ? sectionResult.title : "";
            docIcon = (sectionResult.favicon) ? sectionResult.favicon : "";
            docDate = (sectionResult.timestamp) ? sectionResult.timestamp : "";
            docDate = (docDate != "") ? docDate.split(201, 1) : docDate;


            sectionResultClass = (sectionResult.type == "TWEETS") ? "search_item_tweet" : "search_item"
            articleID = docID.split(":")
            articleID = articleID[0] + "_" + articleID[1]

            liOption += '<div id="' + articleID + '" class=' + sectionResultClass + '>'


            if ((monitorSectionType == "HIGHLIGHTS") || (monitorSectionType == "SEARCH")) {
                bookMarkClass = (sectionResult.isBookmarked) ? "bookmark_active bookmark_common_h" : "bookmark bookmark_common_h"
                liOption += '<div class="' + bookMarkClass + '" docID = "' + docID + '" sectionType = "' + sectionResult.type + '" itemID = "' + itemID + '">&nbsp;</div>'
            }

            if (sectionResult.type == "TWEETS") {
                tweeterImage = sectionResult.extra.userImage;
                liOption += '<div class="tweet_img"><img src="' + tweeterImage + '"></div>'
                liOption += '<div onclick=\'monitorArticleSection("' + docID + '", "' + sectionResult.type + '", "' + sectionResult.type + '")\'>' + docTitle + '</div>'
                liOption += '<div class="source"><span class="date">' + docDate + '</span></div>'
            }

            else {
                liOption += '<div class="titlearea" onclick=\'monitorArticleSection("' + docID + '", "' + sectionResult.type + '")\'>'
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
            monitorSectionId = (monitorSection[i].id) ? (monitorSection[i].id) : "";

            frContent += '<div class="moresearch"><input type="button" value="More &#187;' + monitorSectionTitle + '" class="monitorDetails_h btn grey" sectionType="' + monitorSectionType + '" monitorId="' + monitorId + '"sectionId = "' + monitorSectionId + '" /></div>'
        }

        frContent += '</div>'
    }
    $("#monitorDetailsPage .container").html(frContent)
    checkBookMarkItem()
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
        case 'SEARCH':
            monitorSectionHeader = "blue";
            break;
        default:
            monitorSectionHeader = "red";
            break;
    }

    return monitorSectionHeader;
}

function monitorDetailsSearchResults(searchID) {
    $.mobile.changePage("#monitorDetailsSections");
    $("#monitorDetailsSections").html(loading)
    changeHeader("", "monitorDetailsSearchResults")

    if (environment == "test") {
        var url = URL + "/FRMobileService/authentication.jsp?fn=getSearchResults&id=" + searchID + "&subq=docs&start=0&rows=30&code=" + code
        callAJAX(url, "monitorDetailsSearchResults", "", "", "", searchID)
    }
    else if (environment == "dev") {
        searchResults(searchPageJSON)
    }
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
    changeHeader("")
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
    $("#monitorDetailsSections .container").html(frContent)
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
    changeHeader("")
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
    $("#monitorDetailsSections .container").html(frContent)
    console.log("Length of the results : " + resultsLength)

}

function allSectionMenu(sectionID, calledFrom) {
    var baseArea = ""

    if (calledFrom != "search_keyword") {
        baseArea += '<div class="all_selection margin37"><input type="button" class="btn blue" value="All Selections"> </div>'
    }
    else {
        baseArea += '<div class="margin37"></div>'
    }
    baseArea += '<div class="container">'
    baseArea += '</div>'
    $(sectionID).html(baseArea)
}

function monitorArticleSection(articleID, sectionType, sectionTitle) {
    currentItem = articleID.split(":")
    currentItem = currentItem[0] + "_" + currentItem[1]
    changeHeader("", "monitorArticleSection")
    $.mobile.changePage("#articleDetails")
    $("#articleDetails .container").html(loading)
    closeMenu()
    console.log(">>>>>> Article ID : " + articleID)

    if (environment == "test") {
        var url = URL + "/FRMobileService/authentication.jsp?fn=getDetails&ids=" + articleID + "&code=" + code
        callAJAX(url, "monitorArticleSection", "", sectionType, sectionTitle)
    }
    else if (environment == "dev") {
        var articleDetails_json = "";

        switch (sectionType) {
            case 'ARTICLE' :
                articleDetails_json = articleDetails_document;
                break;
            case 'TWEETS' :
                articleDetails_json = articleDetails_tweet;
                break;
            case 'MT' :
                articleDetails_json = articleDetails_MT;
                break;
            case 'EVENT' :
                articleDetails_json = articleDetails_events;
                break;
            default:
                console.log("No Operation for this event :(")
        }

        monitorArticleDetails(articleDetails_json, sectionType, sectionTitle)
    }
}

function monitorArticleDetails(data, sectionType, sectionTitle) {
    switch (sectionType) {
        case 'ARTICLE' :
            monitorArticleDetails_document(data, sectionTitle)
            break;
        case 'TWEETS' :
            monitorArticleDetails_tweet(data)
            break;
        case 'MT' :
            monitorArticleDetails_MT(data)
            break;
        case 'EVENT' :
            monitorArticleDetails_events(data)
            break;
        default:
            console.log("No Operation for this event :(")
    }

}










