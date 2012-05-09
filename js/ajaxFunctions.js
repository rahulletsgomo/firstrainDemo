function callAJAX(url, callingFunction) {
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
                    methodToCall(callingFunction, data)
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

function methodToCall(callingFunction, data) {
    switch (callingFunction) {
        case "validateUser":
            localStorage.userID = data.data.user.id;
            console.log("User id : " + localStorage.userID)
            break;
        case "landingPage":
            console.log(">>>>> Inside the switch Statement for landing page ...")
            insertActiveMonitor(data)
            insertFirstReads(data)
            $.mobile.changePage("#homePage", { transtion:"fade"});
            loaded();
            break;
        case "getDocumentDetails":
            setDocumentInfo(data, docIcon)
            $.mobile.changePage("#documentDetailsPage", { transtion:"fade"});
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