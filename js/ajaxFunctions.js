function callAJAX(url, callingFunction) {
    if(callingFunction == "getMonitorSearchResults"){
        alert(">>>> URL : "+url)
    }
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
                    if(callingFunction == "getMonitorSearchResults"){
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
            console.log("User id : "+localStorage.userID)
            break;
        case "landingPage":
            insertActiveMonitor(data)
            insertFirstReads(data)
            $.mobile.changePage("#homePage", { transtion:"fade"});
            break;
        case "getMonitorSearchResults":
            console.log(">>>>>>>>>>> Response from getMonitorSearchResults user : " + JSON.stringify(data));
            break;
        default :
            console.log("Nothing to show here ...")
    }
}