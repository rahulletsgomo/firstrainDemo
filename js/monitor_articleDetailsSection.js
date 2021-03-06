function monitorArticleDetails_document(data, sectionTitle) {
    $("#articleDetails .container").html(processing)

    var articleInfo = data.data.results[0];
    var articleTitle = (articleInfo.title) ? (articleInfo.title) : ""
    var articleID = (articleInfo.id) ? (articleInfo.id) : ""
    var itemID = (articleInfo.itemId)
    var isBookMarked = (articleInfo.isBookmarked) ? (articleInfo.isBookmarked) : ""
    var articleBookMarkInfo = ""
    var articleUrl = (articleInfo.url) ? (articleInfo.url) : ""
    var articleSource = (articleInfo.source) ? (articleInfo.source) : ""
    var articleDate = (articleInfo.timestamp) ? (articleInfo.timestamp) : ""
    articleDate = articleDate.split(201, 1)
    var articleImage = (articleInfo.image) ? (articleInfo.image) : ""
    var articleFavIcon = (articleInfo.favicon) ? (articleInfo.favicon) : ""
    var articleSummary = (articleInfo.summary) ? (articleInfo.summary) : ""
    var articleTweet = (articleInfo.extra.tweetList) ? (articleInfo.extra.tweetList) : ""
    var articleTweetsTotal = articleTweet.length
    var articleMatchedContent = (articleInfo.extra.matchedContentTypes) ? (articleInfo.extra.matchedContentTypes) : ""
    var articleMatchedContentTypesTotal = articleMatchedContent.length
    var articleMatchedCompany = (articleInfo.matchedCompanies) ? (articleInfo.matchedCompanies) : ""
    var articleMatchedCompaniesTotal = articleMatchedCompany.length
    var articleMatchedTopic = (articleInfo.matchedTopics) ? (articleInfo.matchedTopics) : ""
    var articleMatchedTopicsTotal = articleMatchedTopic.length
    var tweetArea = ""

    var frContent = ""
    if (String(sectionTitle) == "undefined") {
        frContent += '<div class="item_header red"><span class="itemcounter"></span><span>FirstReads</span></div>'
    }
    else {
        frContent += '<div class="item_header blue"><span class="itemcounter"></span><span>' + sectionTitle + '</span></div>'
    }
    frContent += '<div class="outer">'
    frContent += '<div class="doc_content" >'
    frContent += '<div class="doc_title">'

    articleBookMarkInfo = (isBookMarked) ? "bookmark_active bookmark_common_h" : "bookmark bookmark_common_h"
    frContent += '<div class="' + articleBookMarkInfo + '"calledFrom = "detailSection" docID = "' + articleID + '" itemID = "' + itemID + '">&nbsp;</div>'

    frContent += '<div class="titlearea">'
    frContent += '<div class="title">' + articleTitle + '</div>'
    frContent += '<div class="source"><span class="favicon"><img src="' + articleFavIcon + '" alt=""></span><span class="favicon_name">' + articleSource + '</span><span class="date">' + articleDate + '</span></div>'
    frContent += '</div>'
    frContent += '</div>'
    frContent += '<div class="doc_summery">'
    if (articleImage != "") {
        frContent += '<span><img src="' + articleImage + '"/></span>'
    }
    frContent += articleSummary
    frContent += '</div>'

    if (articleTweetsTotal > 0) {
        var tweetImg
        var tweetTitle
        frContent += '<div class="relatedtweet">'
        frContent += '<div class="title">Related Tweet:</div>'
        for (var i = 0; i < articleTweetsTotal; i++) {
            tweetImg = (articleTweet[i].extra.userImage) ? (articleTweet[i].extra.userImage) : ""
            tweetTitle = (articleTweet[i].title) ? (articleTweet[i].title) : ""
            frContent += '<div class="tweet margin10 floatleft" onclick=\'callChildBrowser({url:"www.google.com"})\'>'
            frContent += '<span class="tweet_img"><img  src="' + tweetImg + '"></span>'
            frContent += '<span>'
            frContent += tweetTitle
            frContent += '</span>'
            frContent += '</div>'
        }
        frContent += '</div>'
    }


    frContent = articleMatchedCompanyInfo(articleMatchedTopicsTotal, frContent, articleMatchedTopic, "matchedTopic");
    frContent = articleMatchedCompanyInfo(articleMatchedContentTypesTotal, frContent, articleMatchedContent, "matchedContent");
    frContent = articleMatchedCompanyInfo(articleMatchedCompaniesTotal, frContent, articleMatchedCompany, "matchedCompany");
    frContent += '</div>'
    frContent += '<div class="documentActionButtons">'
    frContent += '<span><input type="button" class="btn grey document" value="Email"></span>'
    frContent += '<span><input type="button" class="btn grey document" value="Open"></span>'
    frContent += '</div>'

    //scrollDocumentDetails(".articleContainer", "#articleDetailsWrapper", "#articleDetailsScroller");
    $("#articleDetails .container").addClass("margin37")
    $("#articleDetails .container").html(frContent)
    checkBookMarkItem("detailSection")

}

function callChildBrowser(url) {
    PG_childBrowser(url)
}

function articleMatchedCompanyInfo(articleMatchedCompaniesTotal, frContent, articleMatchedCompany, calledFrom) {
    if (articleMatchedCompaniesTotal > 0) {
        var linkName = ""
        var linkID = ""
        var articleTitle = ""
        switch (calledFrom) {
            case 'matchedTopic':
                articleTitle = "Topics MENTIONED:"
                break;
            case 'matchedContent':
                articleTitle = "RELATED CONTENT:"
                break;
            case 'matchedCompany':
                articleTitle = " COMPANIES:"
                break;
            default :
                console.log("No operation for this event :(")
        }
        frContent += '<div class="relatedCompanies">'
        frContent += '<div class="title">' + articleTitle + '</div>'
        for (var articleMatchedCompanyType = 0; articleMatchedCompanyType < articleMatchedCompaniesTotal; articleMatchedCompanyType++) {
            linkName = (calledFrom == "matchedContent") ? articleMatchedCompany[articleMatchedCompanyType].name : articleMatchedCompany[articleMatchedCompanyType].title
            linkID = articleMatchedCompany[articleMatchedCompanyType].id
            frContent += '<div class="company" onclick=\'search_keyword("' + linkName + '")\'>'
            frContent += linkName
            frContent += '</div>'
        }
        frContent += '</div>'
    }
    return frContent;
}

function monitorArticleDetails_tweet(data) {
    var tweetInfo = data.data.results[0]
    var relatedDoc = (tweetInfo.relatedDocs) ? (tweetInfo.relatedDocs) : ""
    var relatedDocsTotal = (relatedDoc != "") ? relatedDoc.length : 0
    var tweetTitle = (tweetInfo.title) ? (tweetInfo.title) : ""
    var includedLink = (tweetInfo.url) ? (tweetInfo.url) : ""
    var userImage = (tweetInfo.extra.userImage) ? (tweetInfo.extra.userImage) : ""
    var tweetedBy = (tweetInfo.extra.description) ? (tweetInfo.extra.description) : ""
    var screenName = (tweetInfo.extra.screenName) ? (tweetInfo.extra.screenName) : ""
    var tweeterName = (tweetInfo.extra.name) ? (tweetInfo.extra.name) : ""
    var timeLabel = (tweetInfo.extra.timeLabel) ? (tweetInfo.extra.timeLabel) : ""
    var documentInfo = (tweetInfo.extra.document) ? (tweetInfo.extra.document) : ""
    var documentTitle = (documentInfo.title) ? (documentInfo.title) : ""
    var documentSource = (documentInfo.source) ? (documentInfo.source) : ""
    var documentFavIcon = (documentInfo.favicon) ? (documentInfo.favicon) : ""
    var documentFavImage = (documentInfo.image) ? (documentInfo.image) : ""
    var documentFavSummary = (documentInfo.summary) ? (documentInfo.summary) : ""
    var tweetedBy = (tweetInfo.extra.description) ? (tweetInfo.extra.description) : ""

    var frContent = ""
    frContent += '<div class="item_header tweet"><span class="itemcounter"></span><span>FirstTweets</span></div>';
    frContent += '<div class="outer">';
    frContent += '<div class="doc_content">';
    frContent += '<div class="search_item_tweet no_bg">';
    frContent += '<div>';
    frContent += '<div class="tweet_img"><img src="' + userImage + '"></div>';
    frContent += '<div>';
    frContent += tweetTitle;
    frContent += '</div>';
    frContent += '</div>';
    frContent += '<div class="source">';
    frContent += '<span class="floatright"><span class="favicon"></span>'
    frContent += '<span class="favicon_name">' + screenName + '</span>'
    frContent += '</span>'
    frContent += '<span class="floatleft date">' + timeLabel + '</span>';
    frContent += '</div>';
    frContent += '</div>';
    if (includedLink != "") {
        frContent += '<div class="includedlink">';
        frContent += '<div class="title">included link:</div>';
        frContent += '<div><a href="' + includedLink + '">' + includedLink + '</a></div>';
        frContent += '</div>';
    }
    if (documentInfo != "") {
        frContent += '<div class="doc_summery">'
        frContent += '<div class="title">' + documentTitle + '</div>'
        frContent += '<div class="source">'
        frContent += '<span class="favicon"><img width="16" height="16" src="' + documentFavIcon + '" alt="source" /></span>'
        frContent += '<span class="favicon_name">' + documentSource + '</span>'
        frContent += '</div>'
        frContent += '<div>'
        frContent += documentFavSummary
        frContent += '</div>'
        frContent += '</div>'
    }

    frContent += '<div class="tweetedby">'
    frContent += '<div class="title">tweetedby:</div>'
    frContent += '<div>'
    frContent += tweeterName + '<span class="socialmedia"> @' + screenName + '</span>'
    frContent += '<span class="lightGrey">' + tweetedBy + '</span>'
    frContent += '</div>'
    frContent += '</div>'

    if (relatedDocsTotal > 0) {
        frContent += '<div class="relateddocuments ">'
        frContent += '<div class="title">related documents:</div>'
        for (var relatedDoc = 0; relatedDoc < relatedDocsTotal; relatedDoc++) {
            frContent += '<div>'
            frContent += '<div class="bold"><a href="#">Windows 7 and Google Android: The Safer OS</a></div>'
            frContent += '<div> <img src=""> <span class="attribution">A little about</span></div>'
            frContent += '</div>'
            frContent += '</div>'
        }
    }
    frContent += '</div>'
    frContent += '<div class="documentActionButtons">'
    frContent += '<span><input type="button" class="btn grey document" value="Email"></span>'
    frContent += '<span><input type="button" class="btn grey document" value="Open"></span>'
    frContent += '</div>'

    frContent += '</div>'
    $("#articleDetails .container").addClass("margin37")
    $("#articleDetails .container").html(frContent)
}


function monitorArticleDetails_MT(data) {
    var mtInfo = data.data.results[0];
    var mtTitle = (mtInfo.title) ? (mtInfo.title) : "";
    var mtRelatedCompaniesInfo = (mtInfo.matchedCompanies) ? (mtInfo.matchedCompanies) : "";
    var mtRelatedCompaniesTotal = (mtRelatedCompaniesInfo != "") ? mtRelatedCompaniesInfo.length : 0
    var mtRelatedCompanyTitle = ""
    var mtTimeStamp = (mtInfo.timestamp) ? (mtInfo.timestamp) : "";
    var mtDocSummary = "";
    var mtDocTitle = "";
    var mtDocSource = "";
    var frContent = ""

    if (mtTimeStamp != "") {
        mtTimeStamp = mtTimeStamp.split(201, 1)
    }

    frContent += '<div class="item_header green"><span class="itemcounter"></span><span>Management Changes</span></div>'
    frContent += '<div class="outer">'
    frContent += '<div class="doc_content">'
    frContent += '<div class="search_item no_bg pb5">'
    frContent += '<div>'
    frContent += '<div class="mt_img mtHireImage"></div>'
    frContent += '<div>'
    frContent += mtTitle
    frContent += '</div>'
    frContent += '</div>'
    frContent += '<div class="cb10"></div>'
    frContent += '<div class="source"><span class="date">' + mtTimeStamp + '</span></div>'
    frContent += '</div>'

    if (mtDocSummary != "") {
        frContent += '<div class="doc_summery">'
        frContent += '<div class="title">' + mtDocTitle + '</div>'
        frContent += '<div class="source"><span class="favicon"></span>' + mtDocSource + '</div>'
        frContent += '<div>'
        frContent += mtDocSummary
        frContent += '</div>'
        frContent += '</div>'
    }

    if (mtRelatedCompaniesTotal > 0) {
        frContent += '<div class="relatedCompanies">'
        frContent += '<div class="title">related Companies</div>'
        for (var mtRelatedCompany = 0; mtRelatedCompany < mtRelatedCompaniesTotal; mtRelatedCompany++) {
            mtRelatedCompanyTitle = mtRelatedCompaniesInfo[mtRelatedCompany].title
            frContent += '<div class="company">'
            frContent += mtRelatedCompanyTitle
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

    $("#articleDetails .container").addClass("margin37")
    $("#articleDetails .container").html(frContent)
}

function monitorArticleDetails_events(data) {
    var eventInfo = data.data.results[0]
    var eventTitle = eventInfo.title
    var eventDate = eventInfo.timestamp
    eventDate = eventDate.split(201, 1)
    var eventClosingPrice = eventInfo.extra.closingPrice
    var eventPrevClosingPrice = eventInfo.extra.previousClosingPrice
    var eventTradingVolume = eventInfo.extra.tradingVolume
    var eventPercentChange = eventInfo.extra.percentChange
    var eventMV52Week = eventInfo.extra.avg52Week
    var eventMV200Day = eventInfo.extra.avg200Day
    var eventMV100Day = eventInfo.extra.avg100Day
    var eventMV50Day = eventInfo.extra.avg50Day
    var frContent = ""

    frContent += '<div class="item_header green"><span class="itemcounter"></span><span>Major Stock and Financial Events</span></div>'
    frContent += '<div class="outer">'
    frContent += '<div class="doc_content">'
    frContent += '<div class="search_item no_bg pb5">'
    frContent += '<div>'
    frContent += '<div class="mt_img mtstockup_Image"></div>'
    frContent += '<div>'
    frContent += eventTitle
    frContent += '</div>'
    frContent += '</div>'
    frContent += '<div class="cb10"></div>'
    frContent += '<div class="source"><span class="date">' + eventDate + '</span></div>'
    frContent += '</div>'

    frContent += '<div class="doc_relateditem_con">'
    frContent += '<div class="title_red">Moving Averages:</div>'
    frContent += '<div class="Averages_con">'
    frContent += '<table CELLPADDING="4" CELLSPACING="0">'
    frContent += '<tr class="bottomborder">'
    frContent += '<td class="bottomborder">52 Week</td>'
    frContent += '<td class="bottomborder">200 day</td>'
    frContent += '<td class="bottomborder">100 day</td>'
    frContent += '<td class="bottomborder">50 day</td>'
    frContent += '</tr>'
    frContent += '<tr>'
    frContent += '<td><b>&#36;' + eventMV52Week + '</b></td>'
    frContent += '<td><b>&#36;' + eventMV200Day + '</b></td>'
    frContent += '<td><b>&#36;' + eventMV100Day + '</b></td>'
    frContent += '<td><b>&#36;' + eventMV50Day + '</b></td>'
    frContent += '</tr>'
    frContent += '</table>'
    frContent += '</div>'
    frContent += '</div>'
    frContent += '</div>'
    frContent += '<div class="documentActionButtons">'
    frContent += '<span><input type="button" class="btn grey document" value="Email"></span>'
    frContent += '<span><input type="button" class="btn grey document" value="Open"></span>'
    frContent += '</div>'
    frContent += '</div>'

    $("#articleDetails .container").addClass("margin37")
    $("#articleDetails .container").html(frContent)

}

