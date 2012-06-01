function callAJAX(url, callingFunction, docIcon, sectionType, sectionTitle) {
    console.log(">>>>> Calling Function : " + callingFunction)
    console.log(">>>>> Section Type : " + sectionType)
    try {
        $.ajax({
            url:url,
            type:"GET",
            dataType:"JSON",
            async:true,
            success:function (data) {
                if (data.status != "SUCCESS") {
                    var alertMsg = (callingFunction == "validateUser") ? "Login Password do not match : " : "Data is not in Successfull state : ";
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
            changeHeader("documentDetailsPage")
            $.mobile.changePage("#documentDetailsPage")
            scrollDocumentDetails(".newscontainer", "#documentDetailsWrapper", "#documentDetailsScroller");
//            scrollDocumentDetails();
            break;
        case "getMonitorDetails":
            changeHeader("getMonitorDetails")
            $.mobile.changePage("#monitorDetailsPage");
            monitorDetails(data);
            getMonitorHasMoreSectionsPage();
            break;
        case "monitorDetailsSearchResults":
            changeHeader("goBack")
//            $.mobile.changePage("#monitorDetailsSections");
            searchResults(data);
            break;
        case "monitorDetailsTweetResults":
            changeHeader("goBack")
            tweetResults(data);
            break;
        case "monitorDetailsMT_EventsResults":
            changeHeader("goBack")
            mt_eventsResults(data);
            break;
        case "monitorArticleSection":
            changeHeader("goBack")
            monitorArticleDetails(data, sectionType, sectionTitle);
            break;
        case "search_keyword":
            changeHeader("goBack")
            searchResults(data)
            break;
        default :
            console.log("Nothing to show here ...")
    }
}