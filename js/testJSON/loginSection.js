URL = "http://10.10.10.134:9999"
userID = "";
$("#signinButton").live("click", validateUser);

function validateUser() {
    var url = URL + "/DataProvider/validateUser?username=vandana&password=firstrain";
    callAJAX(url, "validateUser")
    landingPage();
}

function searchResults() {
    //This uses bookmarks part (look at it later)
    var url = URL + "/UserCollaboration/searchResults?type=share&count=true&actorId=U:83&rows=500&start=0&absoluteId=true";
    callAJAX(url, "searchResults");
}

function landingPage() {
    var url = URL + "/DataProvider/landingPage?userId=U:99&count=10&rows=40";
    callAJAX(url, "landingPage");
}

function recentHistory() {
    var url = URL + "/DataProvider/recentHistory?userId=U:99";
    callAJAX(url, "recentHistory");
}

function insertActiveMonitor(data) {
    var monitorList = data.data.topMonitorList;
    var monitorNames = "";
    for (var i = 0; i < monitorList.length; i++) {
        monitorNames += '<li style="padding:2px 0 0 2px;">';
        monitorNames += '<div style="padding:10px;">';
        monitorNames += '<label style="font-size:14px;text-shadow:none;">' + monitorList[i].monitorName + '</label>';
        monitorNames += '<label style="float:right;">';
        monitorNames += '<img src = "../../img/r-icon_carrot.png" style = "height:24px" /></label>';
        monitorNames += '</div></li>';
//        monitorNames += "<li>" + monitorList[i].monitorName + "</li>";
        console.log(">>>>>>> Monitor Name : " + monitorList[i].monitorName)
    }
    $("#activeMonitorList").append(monitorNames)
}


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
                    methodToCall(callingFunction, data)
                    $.mobile.changePage("#homePage", { transtion:"fade"});
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
            console.log(">>>>>>>>>>> Response from validate user : " + JSON.stringify(data));
            break;
        case "searchResults":
            console.log(">>>>>>>>>>> Response from searchResults user : " + JSON.stringify(data));
            break;
        case "landingPage":
//            console.log(">>>>>>>>>>> Response from landingPage user : " + JSON.stringify(data));
            insertActiveMonitor(data)
            break;
        case "recentHistory":
            console.log(">>>>>>>>>>> Response from recentHistory user : " + JSON.stringify(data));
            break;
        default :
            console.log("Nothing to show here ...")
    }
}