$(function () {
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
        var url = URL + "/DataProvider/landingPage?userId=" + userID + "&count=10&rows=40";
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
        changeHeader("documentDetailsPage")
        $.mobile.changePage("#documentDetailsPage");
        scrollDocumentDetails();
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
    alert(">>>>> Monitor Id : " + monitorID)
//    var checkURL = URL + "/DataProvider/searchResults?userId=" + userID + "&type=monitor&itemcount=30&id=" + monitorID + "&subq=mt,docs,events,tweets";
//    callAJAX(checkURL, "getMonitorSearchResults")
    console.log(">>>>>> Called from : " + monitorID)
}

function insertActiveMonitor(data) {
    var monitorList = data.data.topMonitorList;
    var monitorNames = "";
    for (var i = 0; i < monitorList.length; i++) {
        monitorNames += '<li class="ui-li ui-li-static ui-body-d" style="padding:2px 0 0 2px;" id = "' + monitorList[i].monitorId + '" onclick = "getMonitorDetails(this.id)">';
        monitorNames += '<div style="padding:10px;">';
        monitorNames += '<div style="float:right;>';
        monitorNames += '<label">';
        if (monitorList[i].mailBadge) {
            monitorNames += '<img src = "./img/mail_icon_red.png" style = "height:24px;margin-right: 12px;" />';
        }
        monitorNames += '<img src = "./img/r-icon_carrot.png" style = "height:24px" /></label>';
        monitorNames += '</div>';
        monitorNames += '<div style="width: 180px;">';
        monitorNames += '<label style="font-size:14px;text-shadow:none;">' + monitorList[i].monitorName + '</label>';
        monitorNames += '</div>';
        monitorNames += '</div></li>';
    }
    $("#activeMonitorList").html(monitorNames)
}