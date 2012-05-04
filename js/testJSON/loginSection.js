$("#signinButton").live("click", validateUser);
$("#signInLoading").attr("style", "visibility:true");

function validateUser() {
    var url = URL + "/DataProvider/validateUser?username=vandana&password=firstrain";
    callAJAX(url, "validateUser")
    landingPage();
}

function landingPage() {
    var url = URL + "/DataProvider/landingPage?userId="+localStorage.userID+"&count=10&rows=40";
    callAJAX(url, "landingPage");
}


function insertFirstReads(data) {
    var docList = data.data.docList;
    var docCount = data.data.docList.length;
    getCurrentNode = 0;
    getCurrentNodeNumber = getCurrentNode + 1;

    getFirstReads(docList, docCount);

    $("#docArea").bind("swipeleft", function () {
        getFirstReads(docList, docCount, "left")
    })

    $("#docArea").bind("swiperight", function () {
        getFirstReads(docList, docCount, "right")
    })

}

function getFirstReads(docList, docCount, swipeDirection) {

    if (swipeDirection == "left") {
        if (getCurrentNode == (docCount - 1)) {
            getFirstReads(docList, docCount, "right")
        }
        getCurrentNode++;
        getCurrentNodeNumber++;
    }

    if (swipeDirection == "right") {
        if (getCurrentNode == 0) {
            getFirstReads(docList, docCount, "left")
        }
        getCurrentNode--;
        getCurrentNodeNumber--;
    }

    $("#currentDoc").html(getCurrentNodeNumber)
    $("#docLength").html(docCount)
    var docTitle = docList[getCurrentNode].title
    var docSourceName = docList[getCurrentNode].source.name
    var docIcon = docList[getCurrentNode].favicon
    var docSummary = docList[getCurrentNode].summary
    $("#docTitle").html(docTitle)
    $("#docSourceName").html(docSourceName)
    $("#docIcon").attr("src", docIcon)
    $("#docSummary").html(docSummary)

}

function getMonitorDetails(monitorID) {
    var checkURL = URL + "/DataProvider/searchResults?userId="+localStorage.userID+"&type=monitor&itemcount=30&id="+monitorID+"&subq=mt,docs,events,tweets";
    callAJAX(checkURL, "getMonitorSearchResults")
    alert(">>>>>> Called from : " + monitorID)
//    localStorage.monitorID = monitorID
//    window.location.href = "monitorDetails.html";
}

function insertActiveMonitor(data) {
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

