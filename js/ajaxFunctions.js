function callAJAX(url, callingFunction, docIcon) {
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
            userID = data.data.user.id;
            console.log(">>>>>> User Id : " + userID)
            landingPage();
            break;
        case "landingPage":
            insertActiveMonitor(data)
            insertFirstReads(data)
            $.mobile.changePage("#homePage");
            loaded();
            break;
        case "getDocumentDetails":
            setDocumentInfo(data, docIcon);
            console.log("Inside case getDocumentDetails !!!")
            console.log("Data : " +data+", DocIcon : " +docIcon)
            $.mobile.changePage("#documentDetailsPage")
            scrollDocumentDetails();
            break;
        case "getMonitorSearchResults":
//            console.log(">>>>>>>>>>>_______________ Response from getMonitorSearchResults user : " + JSON.stringify(data));
            monitorSearchResults = data;
            console.log(">>>>>>>>>>>_______________ Response from getMonitorSearchResults user : " + JSON.stringify(monitorSearchResults));
            //window.location.href = "monitorDetails.html";
            $.mobile.changePage("monitorDetails.html");
            break;
        default :
            console.log("Nothing to show here ...")
    }
}