$(function () {
    alert("Welcome to " + localStorage.monitorID + " monitor !!!");
    getMonitorSearchResults()
})

function getMonitorSearchResults() {
    alert(">>>>> Inside getMonitorSearchResults")
    var url = URL + "/DataProvider/searchResults?userId="+localStorage.userID+"&type=monitor&itemcount=30&id="+localStorage.monitorID+"&subq=mt,docs,events,tweets";
    callAJAX(url, "getMonitorSearchResults")
}