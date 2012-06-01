$(function () {
//    $.mobile.changePage("#testPage")
    $("#signinButton").live("click", function () {
        $("#signInLoading").attr("style", "visibility:true");
        validateUser();
    });
})

function validateUser() {
    if (environment == "test") {
        var userName = $("#usernameInput").val();
        var password = $("#truePWInput").val();
        var url = URL + "/FRMobileService/authentication.jsp?fn=getAuthentication&username=" + userName + "&password=" + password
        console.log(url)
        callAJAX(url, "validateUser")
    }
    else if (environment == "dev") {
        landingPage();
    }
}

function landingPage() {
    if (environment == "test") {
        var url = URL + "/DataProvider/ipad/landingPage?userId=" + userID + "&count=10&rows=40";
        console.log(">>>>> URL : " + url)
        callAJAX(url, "landingPage");
    }
    else if (environment == "dev") {
        insertFirstReads(landingPageJSON)
        insertActiveMonitor(landingPageJSON)
        loaded();
    }
}


function insertFirstReads(data) {
    var docList = data.data.docList;
    var docCount = data.data.docList.length;
    $("#docLength").html(docCount)
    getFirstReads(docList, docCount);
}

function getFirstReads(docList, docCount) {
    var docTitle = "";
    var docSourceName = "";
    var docIcon = "";
    var docSummary = "";
    var docID = "";
    var docContent = "";
    for (var i = 0; i < docCount; i++) {
        docTitle = docList[i].title
        docSourceName = docList[i].source.name
        docIcon = docList[i].favicon
        docSummary = docList[i].summary
        docID = docList[i].id

        docContent += '<li style="padding:2px 0 0 2px; height: 300px" rel="' + docIcon + '" id="' + docID + '" class="ui-body-d documentContent">';
        docContent += '<div style="padding:10px;">';
        docContent += '<div style="font-size:16px;font-weight: bold; " id="docTitle">';
        docContent += docTitle;
        docContent += '</div>';
        docContent += '<div style="color:#5a91bb;height:30px;line-height:30px">';
        docContent += '<img id="docIcon" src="' + docIcon + '" style="height:15px"/>';
        docContent += '<span style="margin-left: 5px" id="docSourceName">' + docSourceName + '</span>';
        docContent += '</div>';
        docContent += '<div style="padding-bottom:10px; height: 50px; overflow: hidden;" id="docSummary">';
        docContent += docSummary;
        docContent += '</div>';
        docContent += '</div>';
        docContent += '</li>';
    }
    $("#thelist").html(docContent);
    $.mobile.changePage("#homePage");
    currentPage = "homePage"
    changeHeader("homePage")
    $(".documentContent").bind("click", function () {
        var getCurrentDocID = this.id;
        var getCurrentDocIcon = $(this).attr("rel");
//        alert(getCurrentDocID + ", " +getCurrentDocIcon)
        getDocumentDetails(getCurrentDocID, getCurrentDocIcon)
    })
}

function getDocumentDetails(docID, docIcon) {
    if (environment == "test") {
        var url = URL + "/DataProvider/docDetails?userId=" + userID + "&docids=" + docID;
        console.log(">>>>>> Document Details : " + url)
        callAJAX(url, "getDocumentDetails", docIcon)
    }
    else if (environment == "dev") {
        setDocumentInfo(documentDetailsJSON, docIcon)
        changeHeader("")
        $.mobile.changePage("#documentDetailsPage");
        scrollDocumentDetails(".newscontainer", "#documentDetailsWrapper", "#documentDetailsScroller");
    }
}

function setDocumentInfo(documentDetails, docIcon) {
    var documentTitle = documentDetails.data[0].title;
    var documentSource = documentDetails.data[0].source.name;
    var documentSummary = documentDetails.data[0].summary;
    var documentMatchedContent = documentDetails.data[0].matchedContentTypes;
    var documentMatchedCompanies = documentDetails.data[0].matchedCompanies;
    var documentMatchedTopics = documentDetails.data[0].matchedTopics;
    var documentMatchedPeople = documentDetails.data[0].matchedPeople;
    $("#documentTitle").html(documentTitle)
    $("#documentSourceName").html(documentSource)
    $("#documentSummary").html(documentSummary)
    $("#documentIcon").attr("src", docIcon)
    iterateItems(documentMatchedContent, "documentRelatedContent");
    iterateItems(documentMatchedCompanies, "documentMentionedCompanies");
    iterateItems(documentMatchedTopics, "documentMentionedTopics");
    function iterateItems(documentType, documentContainer) {
        for (var i = 0; i < documentType.length; i++) {
            $("#" + documentContainer).append('<li class="related_item">' + documentType[i].name + '</li>');
        }
    }


}


function getMonitorDetails(monitorID) {
    changeHeader("")
    $.mobile.changePage("#monitorDetailsPage");
    $("#monitorDetailsPage").html(loading)
//    $("#monitorDetailsPage .container").html(frContent)
    console.log(">>>>>> Called from : " + monitorID)

    if (environment == "test") {
        var url = URL + "/FRMobileService/authentication.jsp?fn=getMonitorResults&id=" + monitorID + "&code=" + code;
        console.log(">>>>>> Monitor Details : " + url)
        callAJAX(url, "getMonitorDetails")
    }
    else if (environment == "dev") {
        monitorDetails(monitorResults);
        getMonitorHasMoreSectionsPage();
    }

}

function getMonitorHasMoreSectionsPage() {
    $(".monitorDetails_h").click(function () {
        var sectionType = $(this).attr("sectionType");
        var monitorID = $(this).attr("monitorId");
        var sectionID = $(this).attr("sectionId");
        console.log(">>>>>>> Called From section type = " + sectionType)
        switch (sectionType) {
            case 'SEARCH':
                monitorDetailsSearchResults(sectionID)
//                monitorDetailsMT_EventsResults(monitorID, "mt") //This is for testing purpose
                break;
            case 'TWEETS':
                monitorDetailsTweetResults(monitorID)
                break;
            case 'MANAGEMENT_TURNOVER':
                monitorDetailsMT_EventsResults(monitorID, "mt")
                break;
            case 'EVENTS':
                monitorDetailsMT_EventsResults(monitorID, "events")
                break;
            default:
                break;
        }
    })

}

function insertActiveMonitor(data) {
    var monitorList = data.data.topMonitorList;
    var monitorNames = "";
    monitorNames += '<div class="outer">'
    for (var i = 0; i < monitorList.length; i++) {
        var monitorClass = (monitorList[i].mailBadge) ? "active_monitor unread" : "active_monitor"
        monitorNames += '<div class="' + monitorClass + '" id = "' + monitorList[i].monitorId + '" onclick = "getMonitorDetails(this.id)">' + monitorList[i].monitorName + '</div>'
    }
    monitorNames += '</div>'
    // monitorNames += '<div><input type="button" class="btn blue p20"  value="All Monitors"></div>'
    $("#activeMonitorList").html(monitorNames)
}