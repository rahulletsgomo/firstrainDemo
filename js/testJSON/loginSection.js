$(function () {
//    $("#signinButton").live("click", function () {
//        if (environment == "test") {
//            validateUser();
//        }
//        else if (environment == "dev") {
//            $.mobile.changePage("#homePage", {transition:"fade"})
//            landingPage();
//        }
//        $("#signInLoading").attr("style", "visibility:true");
//
//    });

    if (environment == "test") {
        $("#signinButton").live("click", function () {
            validateUser();
            $("#signInLoading").attr("style", "visibility:true");
        });
    }
    else if (environment == "dev") {
        $.mobile.changePage("#homePage", {transition:"fade"})
        landingPage()
    }
})

function validateUser() {
    var url = URL + "/DataProvider/validateUser?username=vandana&password=firstrain";
    callAJAX(url, "validateUser")
    landingPage();
}

function landingPage() {
    if (environment == "test") {
        var url = URL + "/DataProvider/landingPage?userId=" + localStorage.userID + "&count=10&rows=40";
        callAJAX(url, "landingPage");
    }
    else if (environment == "dev") {
        insertFirstReads(landingPageJSON)
        insertActiveMonitor(landingPageJSON)
    }
}


function insertFirstReads(data) {
    var docList = data.data.docList;
    var docCount = data.data.docList.length;
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

            docContent += '<li style="padding:2px 0 0 2px; height: 300px" id="' + docID + '" class="ui-li ui-li-static ui-body-d documentContent">';
            docContent += '<div style="padding:10px;">';
            docContent += '<div style="font-size:20px; width: 280px" id="docTitle">';
            docContent += docTitle;
            docContent += '</div>';
            docContent += '<div style="color:#5a91bb;height:30px;line-height:30px">';
            docContent += '<img id="docIcon" src="' + docIcon + '" style="height:15px"/>';
            docContent += '<span id="docSourceName">' + docSourceName + '</span>';
            docContent += '</div>';
            docContent += '<div style="padding-bottom:10px; width: 250px; height: 20px; overflow: hidden;" id="docSummary">';
            docContent += docSummary;
            docContent += '</div>';
            docContent += '</div>';
            docContent += '</li>';
            console.log(i + " done !");
        }
    $("#thelist").html(docContent);
    $.mobile.changePage("#homePage");

    $(".documentContent").bind("taphold", function () {
        getDocumentDetails(docID)
    })
}

function getDocumentDetails(docID) {
    alert(">>>>>> This is the document ID : " + docID)
//    $.mobile.changePage("documentDetails.html", {transition:"fade"})
}

function getMonitorDetails(monitorID) {
    var checkURL = URL + "/DataProvider/searchResults?userId=" + localStorage.userID + "&type=monitor&itemcount=30&id=" + monitorID + "&subq=mt,docs,events,tweets";
    callAJAX(checkURL, "getMonitorSearchResults")
    console.log(">>>>>> Called from : " + monitorID)
//    localStorage.monitorID = monitorID
}

function insertActiveMonitor(data) {
    console.log("Inside Active Monitors")
    var monitorList = data.data.topMonitorList;
    var monitorNames = "";
    for (var i = 0; i < monitorList.length; i++) {
        monitorNames += '<li class="ui-li ui-li-static ui-body-d" style="padding:2px 0 0 2px;" onclick = "getMonitorDetails(\'' + monitorList[i].monitorId + '\')">';
        monitorNames += '<div style="padding:10px;">';
        monitorNames += '<label style="font-size:14px;text-shadow:none;">' + monitorList[i].monitorName + '</label>';
        monitorNames += '<label style="float:right;">';
        monitorNames += '<img src = "../../img/r-icon_carrot.png" style = "height:24px" /></label>';
        monitorNames += '</div></li>';
    }
    $("#activeMonitorList").html(monitorNames)
}

