function monitorArticleDetails_document(data) {
    console.log(">>>>>>> Inside monitorArticleDetails_document")

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
    var articleMatchedCompany = data.data.results[0].matchedCompanies
    var articleMatchedCompaniesTotal = articleMatchedCompany.length
    var articleMatchedTopic = data.data.results[0].matchedTopics
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


    frContent = articleMatchedCompanyInfo(articleMatchedTopicsTotal, frContent, articleMatchedTopic, "matchedTopic");
    frContent = articleMatchedCompanyInfo(articleMatchedContentTypesTotal, frContent, articleMatchedContent, "matchedContent");
    frContent = articleMatchedCompanyInfo(articleMatchedCompaniesTotal, frContent, articleMatchedCompany, "matchedCompany");
    frContent += '</div>'
    frContent += '<div class="documentActionButtons">'
    frContent += '<span><input type="button" class="btn grey document" value="Email"></span>'
    frContent += '<span><input type="button" class="btn grey document" value="Open"></span>'
    frContent += '</div>'
    frContent += '</div>'

//    console.log(">>>>> Article Details Content : " + frContent)
//    console.log(">>>>>> Data inside articleDetails container : " + $("#articleDetails .container").html())
    $("#articleDetails .container").html(frContent)
//    console.log(">>>>>> Data inside articleDetails container : " + $("#articleDetails .container").html())

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

