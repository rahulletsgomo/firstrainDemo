$("#signinButton").live("click", authenticateUser);

userID = "";
URL = "http://10.10.10.134:9999"

function authenticateUser() {
    var url = URL + "/DataProvider/validateUser";
    //"http://mobile.firstrain.com/ipad02/authentication.jsp";
    var usernameField = "vandana"//$("#usernameInput").val();
    var passwordField = "firstrain"//$("#truePWInput").val();
    var data = {username:usernameField, password:passwordField};
    callAJAX(url, data, "authenticateUser")
}

function getMonitorInfo() {
    var url = URL + "/DataProvider/monitorDetails";
    var data = {userId:userID};
    callAJAX(url, data, "getMonitorInfo")
}

function getMonitorResults() {
    var url = URL + "/DataProvider/searchResults"
    var data = {userId:userID, type:"monitor", itemcount:5, id:"M:69497", subq:"mt,docs,events,tweets"}
    callAJAX(url, data, "getMonitorResults")
}

function getManagementChanges() {
    var url = URL + "/DataProvider/getDetails?userId=U:99&ids=D:458322264,D:473848084,MT:16874587,MT:16883958,SEC:119312511335177,SEC:119312511335127,E:16933657,E:16842626,TW:145064919929331712,TW:145064693973778432";
    callAJAX(url, "", "getManagementChanges")
}


function getMonitorDetails(data) {

    console.log(">>>>>>>> Total Number of Monitors : " + data.data.myMonitorList.length)
    var storeData = "";
    var monitorIdList = [];
    for (var i = 0; i < data.data.myMonitorList.length; i++) {
        monitorIdList[i] = data.data.myMonitorList[i].monitorId;
        storeData += data.data.myMonitorList[i].monitorId + " : " + data.data.myMonitorList[i].monitorName;
        storeData += " : " + data.data.myMonitorList[i].tweetAvailable + "<br />";
    }

    $("#testMonitorContent").html(storeData)

    //List of functions that are called ...
//    getMonitorSearchDetails("M:69497")
//    getMonitorTweets();
//    getMonitorResults();
//    getManagementChanges();
//    getUserLandingPage();
}

function getUserLandingPage() {
    var url = URL + "/DataProvider/landingPage";
    var data = {userId:userID, country:10, row:40}
    callAJAX(url, data, "getUserLandingPage");
}

function getMonitorSearchDetails(monitorID) {
    var url = URL + "/DataProvider/monitorDetails/searchResults";
    var data = {id:monitorID, type:"monitor"};
    callAJAX(url, data, "getMonitorSearchDetails")
}

function getMonitorTweets() {
    var url = URL + "/DataProvider/searchResults";
    var data = {userId:userID, type:"monitor", itemcount:30, id:"M:69497", rows:2, start:0, subq:"tweets"}
    callAJAX(url, data, "getMonitorTweets")
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
        case "getMonitorInfo" :
            getMonitorDetails(data);
            break;
        case "getMonitorSearchDetails" :
            console.log(">>>>>>>> Monitor Search Response : " + JSON.stringify(data));
            break;
        case "authenticateUser" :
            userID = data.data.user.id;
            $.mobile.changePage("#homePage", { transtion:"fade"});
            console.log(">>>>>>>>>>>>> Authenticate User Response : "+JSON.stringify(data))
            break;
        case "getMonitorTweets" :
//            console.log("---------------->>>>>>>>>Tweets Info : " + JSON.stringify(data));
            console.log("---------------->>>>>>>>>Tweets Item List Count : " + data.data.itemList.length);
            var getData = data.data.itemList;
//            console.log(">>>>>>>>>Tweets Item List : " + JSON.stringify(getData))
            for (var key in getData) {
                for (var subKey in getData[key]) {
                    console.log(subKey + " : " + getData[key][subKey])
                }
//                console.log(key + " : " + getData[key]);
            }
            break;
        case "getMonitorResults" :
            console.log("---------------->>>>>>>>>Get Monitor Results : " + JSON.stringify(data));
            break;
        case "getUserLandingPage" :
            console.log("---------------->>>>>>>>>Get getUserLandingPage Results : " + JSON.stringify(data));
            break;
        case "getManagementChanges" :
            console.log("---------------->>>>>>>>>Get Management Details count : " + data.data.mgmtDetails.length);
            console.log("---------------->>>>>>>>>Get Management Details : " + JSON.stringify(data.data.mgmtDetails));
            console.log("---------------->>>>>>>>>Get Management Details [0] : " + data.data.mgmtDetails[0].title);
            var getData = "";
            for (var i = 0; i < data.data.mgmtDetails.length; i++) {
                getData += data.data.mgmtDetails[i].title + "<br />"
            }
            console.log(">>>>>>>>>> data from management change : " + getData)
            $("#testMonitorContent").html(getData)

            break;
        default :
            console.log(">>>>>>>> Sorry no operation is available for this event ....");
    }
}
