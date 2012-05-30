function monitorArticleDetails_document(data) {
    console.log(">>>>>>> Inside monitorArticleDetails_document")
    $("#articleDetails .container").html(processing)

    var articleTitle = (data.data.results[0].title) ? (data.data.results[0].title) : ""
    var articleUrl = (data.data.results[0].url) ? (data.data.results[0].url) : ""
    var articleSource = (data.data.results[0].source) ? (data.data.results[0].source) : ""
    var articleDate = (data.data.results[0].timestamp) ? (data.data.results[0].timestamp) : ""
    articleDate = articleDate.split(201, 1)
    var articleImage = (data.data.results[0].image) ? (data.data.results[0].image) : ""
    var articleFavIcon = (data.data.results[0].favicon) ? (data.data.results[0].favicon) : ""
    var articleSummary = (data.data.results[0].summary) ? (data.data.results[0].summary) : ""
    var articleTweet = (data.data.results[0].extra.tweetList) ? (data.data.results[0].extra.tweetList) : ""
    var articleTweetsTotal = articleTweet.length
    var articleMatchedContent = (data.data.results[0].extra.matchedContentTypes) ? (data.data.results[0].extra.matchedContentTypes) : ""
    var articleMatchedContentTypesTotal = articleMatchedContent.length
    var articleMatchedCompany = (data.data.results[0].matchedCompanies) ? (data.data.results[0].matchedCompanies) : ""
    var articleMatchedCompaniesTotal = articleMatchedCompany.length
    var articleMatchedTopic = (data.data.results[0].matchedTopics) ? (data.data.results[0].matchedTopics) : ""
    var articleMatchedTopicsTotal = articleMatchedTopic.length
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
        frContent += '<span><img width="64" height="64" src="' + articleImage + '"/></span>'
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
            frContent += '<div class="tweet">'
            frContent += '<span class="tweet_img"><img src="' + tweetImg + '"></span>'
            frContent += '<span>'
            frContent += tweetTitle
            frContent += '</span>'
            frContent += '</div>'
            frContent += '</div>'
        }
    }


    frContent = articleMatchedCompanyInfo(articleMatchedTopicsTotal, frContent, articleMatchedTopic, "matchedTopic");
    frContent = articleMatchedCompanyInfo(articleMatchedContentTypesTotal, frContent, articleMatchedContent, "matchedContent");
    frContent = articleMatchedCompanyInfo(articleMatchedCompaniesTotal, frContent, articleMatchedCompany, "matchedCompany");
    frContent += '</div>'
    frContent += '<div class="documentActionButtons">'
    frContent += '<span><input type="button" class="btn grey document" value="Email"></span>'
    frContent += '<span><input type="button" class="btn grey document" value="Open"></span>'
    frContent += '</div>'
    frContent += '</div>'

    $("#articleDetails .container").html(frContent)

}

function articleMatchedCompanyInfo(articleMatchedCompaniesTotal, frContent, articleMatchedCompany, calledFrom) {
    if (articleMatchedCompaniesTotal > 0) {
        var companyName = ""
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
            companyName = (calledFrom == "matchedContent") ? articleMatchedCompany[articleMatchedCompanyType].name : articleMatchedCompany[articleMatchedCompanyType].title
            frContent += '<div class="company">'
            frContent += companyName
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
    var screenName = (tweetInfo.extra.screenName) ? (tweetInfo.extra.screenName) : ""
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
    frContent += '<span class="floatright"><span class="favicon"></span>' + screenName + '</span>';
    frContent += timeLabel;
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
        frContent += '<div class="source"><span class="favicon"><img src="' + documentFavIcon + '" alt="source" /></span>' + documentSource + '</div>'
        frContent += '<div>'
        frContent += documentFavSummary
        frContent += '</div>'
    }
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
    console.log(frContent)

}


function monitorArticleDetails_MT(data) {
    console.log(">>>>>>>>> monitorArticleDetails_MT data : " + data)
}

function monitorArticleDetails_events(data) {
    console.log(">>>>>>>>> monitorArticleDetails_events data : " + data)
}
