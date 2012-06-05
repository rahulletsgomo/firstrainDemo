function callAJAX(url, callingFunction, docIcon, sectionType, sectionTitle) {
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
                    if (callingFunction == "getMonitorSearchResults") {
                        console.log(">>>>>>>>> Inside the success state of getMonitorSearchResults !!!")
                    }
                    methodToCall(callingFunction, data, docIcon, sectionType, sectionTitle)
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

function methodToCall(callingFunction, data, docIcon, sectionType, sectionTitle) {
    switch (callingFunction) {
        case "validateUser":
            console.log(">>>>>> Data : " + data)
            userID += "U:";
            userID += data.data.userID;
            console.log(">>>>>> User Id : " + userID)
            code = "cnRGWVVka0puUTR6REhySjcwaTZnbytXK3NJVWhLRlRqR3FlOXI3ZUZoVlkxUjJjNnZDM3AwOTIyczZiSDRvWG1rcUU1UlR4VWY3Qg0KNkhXcW1pQnpqUT09"; //This is only for testing purpose
//            code = data.data.code;
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
            changeHeader("")
//            $.mobile.changePage("#monitorDetailsSections");
            searchResults(data);
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
            changeHeader("")
            searchResults(data, callingFunction)
            break;
        case "checkBookMarkItem":
            console.log(">>>>>>> Bookmarked document : " + JSON.stringify(data))
            break;
        default :
            console.log("Nothing to show here ...")
    }
}