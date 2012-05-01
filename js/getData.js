$("#signinButton").live("click", authenticateUser);

userID = "";
URL = "http://10.10.10.134:9999"

function authenticateUser() {
    var url = URL + "/DataProvider/validateUser";
    //"http://mobile.firstrain.com/ipad02/authentication.jsp";
    var usernameField = $("#usernameInput").val();
    var passwordField = $("#truePWInput").val();
    var data = {username:usernameField, password:passwordField};
    callAJAX(url, data, "authenticateUser")
}

function getMonitorInfo() {
    var url = URL + "/DataProvider/monitorDetails";
    var data = {userId:userID};
    callAJAX(url, data, "getMonitorInfo")
}


function getMonitorDetails(data) {
    /*
     "monitorId":"M:90823","monitorName":"visiulization-4-high","itemCount":0,
     "managementTurnoverAvailable":false,
     "eventAvailable":false,"tweetAvailable":false,"mailAvailable":false,
     "mailBadge":false,"hasNew":false,"resultList":{"subList":[]}
     */
    console.log("Successfully inside getMonitorDetails");
    console.log(">>>>>>>> JSON Response from getMonitor Details : " + data.data.myMonitorList.length)
    var storeData = "";
    var monitorIdList = [];
    for (var i = 0; i < data.data.myMonitorList.length; i++) {
        monitorIdList[i] = data.data.myMonitorList[i].monitorId;
        storeData += data.data.myMonitorList[i].monitorId + " : " + data.data.myMonitorList[i].monitorName;
        storeData += " : " + data.data.myMonitorList[i].tweetAvailable + "<br />";
    }
    for (var i = 0; i < monitorIdList.length; i++) {
//        console.log(">>>>>>> Monitor Ids : " + monitorIdList[i])
//        getMonitorSearchDetails(monitorIdList[i])
    }
    $("#testMonitorContent").html(storeData)
    getMonitorSearchDetails("M:42407")

}

function getMonitorSearchDetails(monitorID) {
    var url = URL + "/DataProvider/monitorDetails/searchResults";
    var data = {id:monitorID, type:"monitor"};
    callAJAX(url, data, "getMonitorSearchDetails")
}

function callAJAX(url, data, callingFunction) {
    try {
        $.ajax({
            url:url,
            type:"GET",
            dataType:"JSON",
            async:true,
            data:data,
            success:function (data) {
                if (data.status != "SUCCESS") {
                    var alertMsg = (callingFunction == "authenticateUser") ? "Login Password do not match : " : "Data is not in successfull state : ";
                    alert(alertMsg + data.status)
                }
                else {
                    methodToCall(callingFunction, data)
                }
            },
            error:function (e) {
                alert("Unable to get the data : " + e.status)
            }
        });
    }
    catch (e) {
        alert("Unable to get into ajax function : " + e)
    }
}

function methodToCall(callingFunction, data) {
    switch (callingFunction) {
        case "getMonitorInfo" :
            getMonitorDetails(data);
            break;
        case "getMonitorSearchDetails" :
            console.log(">>>>>>>> Monitor Search Response : " + JSON.stringify(data));
            break;
        case "authenticateUser" :
            userID = data.data.user.id;
            $.mobile.changePage("#homePage", { transtion:"fade"});
            getMonitorInfo();
            break;
        default :
            console.log(">>>>>>>> Sorry no operation is available for this event ....");
    }
}
