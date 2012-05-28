function callAJAX(url, callingFunction, docIcon) {
    console.log(">>>>> Calling Function : " + callingFunction)
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
                    methodToCall(callingFunction, data, docIcon)
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

function methodToCall(callingFunction, data, docIcon) {
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
            scrollDocumentDetails();
            break;
        case "getMonitorDetails":
//            console.log(">>>>>>>>>>>_______________ Response from getMonitorSearchResults user : " + JSON.stringify(data));
//            monitorSearchResults = data;
            console.log(">>>>>>>>>>>_______________ Response from getMonitorResults user : " + JSON.stringify(data));
            //window.location.href = "monitorDetails.html";
            $.mobile.changePage("#monitorDetailsPage");
            monitorDetails(data);
            break;
        default :
            console.log("Nothing to show here ...")
    }
}