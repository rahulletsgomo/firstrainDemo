function callAJAX(url, callingFunction, docIcon, sectionType, sectionTitle, searchToken) {
    console.log(">>>>> Calling Function : " + callingFunction)
    try {
        $.ajax({
            url:url,
            type:"GET",
            dataType:"JSON",
            async:true,
            success:function (data) {
                if (data.status != "SUCCESS") {
                    var alertMsg = (callingFunction == "validateUser") ? "Login Password do not match : " : "Data is not in Successful state : ";
                    alert(alertMsg + data.status)
                }
                else {

                    methodToCall(callingFunction, data, docIcon, sectionType, sectionTitle, searchToken)
                }
            },
            error:function (e) {
                alert("Unable to get the data : " + e.status + ", from " + callingFunction)
            }
        });
    }
    catch (e) {
        alert("Unable to get into ajax function : " + e)
    }
}

function methodToCall(callingFunction, data, docIcon, sectionType, sectionTitle, searchToken) {
    switch (callingFunction) {
        case "validateUser":
            console.log(">>>>>> Data : " + data)
            userID = "U:";
            userID += data.data.userID;
            console.log(">>>>>> User Id : " + userID)
            code = data.data.code;
            console.log(">>>>>> Code : " + code)
            landingPage();
            break;
        case "landingPage":
            insertActiveMonitor(data)
            insertFirstReads(data)
            $.mobile.changePage("#homePage");
            changeHeader("homePage")
            loaded();
            break;
        case "getDocumentDetails":
            setDocumentInfo(data, docIcon);
            changeHeader("")
            $.mobile.changePage("#documentDetailsPage")
            scrollDocumentDetails(".newscontainer", "#documentDetailsWrapper", "#documentDetailsScroller");
//            scrollDocumentDetails();
            break;
        case "getMonitorDetails":
            monitorDetails(data);
            getMonitorHasMoreSectionsPage();
            break;
        case "monitorDetailsSearchResults":
            searchResults(data, callingFunction, searchToken);
            break;
        case "monitorDetailsTweetResults":
            changeHeader("")
            tweetResults(data);
            break;
        case "monitorDetailsMT_EventsResults":
            changeHeader("")
            mt_eventsResults(data);
            break;
        case "monitorArticleSection":
            monitorArticleDetails(data, sectionType, sectionTitle);
            break;
        case "search_keyword":
            searchResults(data, callingFunction, searchToken)
            break;
        case "checkBookMarkItem":
            console.log(">>>>>>> Bookmarked document : " + JSON.stringify(data))
            break;
        case "handleLoadMore":
            searchResults(data, "handleLoadMore")
            break;
        default :
            console.log("Nothing to show here ...")
    }
}