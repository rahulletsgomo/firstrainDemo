function monitorDetails(data) {
    var monitorSectionLength = data.data.sections.length;
    var monitorSection = data.data.sections;
    var monitorTitle = data.data.monitor.title;
    var monitorSectionResult = data.data.results;
    var monitorSectionType = "";
    var monitorSectionTitle = "";
    var monitorSectionHeader = "";
    var monitorSectionId = "";
    var monitorId = data.data.monitor.id;
    var referResultID = 0;
    var liOption = "";
    var docSource;
    var docDate;
    var sectionResult;
    var sectionResultClass;
    var docTitle;
    var docIcon;
    var frContent = "";
    var tweeterImage = "";

//    $(".current_monitor").html(monitorTitle)
    for (var i = 0; i < monitorSectionLength; i++) {
        monitorSectionType = monitorSection[i].type
        monitorSectionHeader = setMonitorHeaderType(monitorSectionType);
        if (monitorSectionType == "TWEETS") {
            frContent += '<div class="item_header tweet" style="margin-bottom: 0px"><span class="tweeticon_bird"></span><span>FirstTweets</span></div>'
        }
        else {
            frContent += '<div class="item_header ' + monitorSectionHeader + '"><span>' + monitorSection[i].title + '</span></div>'
        }
        frContent += '<div class="outer">'

        var sectionBaseResultsLength = monitorSection[i].baseResults.length

        frContent += '<div class="search_item">'
        for (var j = 0; j < sectionBaseResultsLength; j++) {
            sectionResult = monitorSectionResult[referResultID];

            docSource = (sectionResult.source) ? sectionResult.source : "";
            docTitle = (sectionResult.title) ? sectionResult.title : "";
            docIcon = (sectionResult.favicon) ? sectionResult.favicon : "";
            docDate = (sectionResult.timestamp) ? sectionResult.timestamp : "";
            docDate = (docDate != "") ? docDate.split(201, 1) : docDate;


            sectionResultClass = (sectionResult.type == "TWEETS") ? "search_item_tweet" : "search_item"
            liOption += '<div class=' + sectionResultClass + '>'


            if ((monitorSectionType == "HIGHLIGHTS") || (monitorSectionType == "SEARCH")) {
                liOption += '<div class="bookmark">&nbsp;</div>'
            }

            if (sectionResult.type == "TWEETS") {
                tweeterImage = sectionResult.extra.userImage;
                liOption += '<div class="tweet_img"><img src="' + tweeterImage + '"></div>'
                liOption += '<div>' + docTitle + '</div>'
                liOption += '<div class="source"><span class="date">' + docDate + '</span></div>'
            }

            else {
                liOption += '<div class="titlearea">'
                liOption += '<div class="title">' + docTitle + '</div>'
                liOption += '<div class="source">'
                if (docIcon != "") {
                    liOption += '<span class="favicon"><img src="' + docIcon + '" alt="Source Image" width=16 height=16 />&nbsp;&nbsp;</span>'
                }
                liOption += docSource
                liOption += '<span class="date">' + docDate + '</span>'
                liOption += '</div>'
                liOption += '</div>'
            }
            liOption += '</div>'

            frContent += liOption

            //Clear the previous variables before going to the next result
            docSource = ""
            docTitle = ""
            docIcon = ""
            liOption = ""

            referResultID++; //Move to the next result
        }


//        This will check for whether a has more button is required or not
        if (monitorSection[i].hasMore) {
            monitorSectionType = monitorSection[i].type;
            monitorSectionTitle = monitorSection[i].title;
            monitorSectionId = monitorSection[i].id;

            frContent += '<div class="moresearch"><input type="button" value="More &#187;' + monitorSectionTitle + '" class="monitorDetails_h btn grey" sectionType="' + monitorSectionType + '" monitorId="' + monitorId + '"sectionId = "' + monitorSectionId + '" /></div>'
        }


        frContent += '</div>'
        frContent += '</div>'
    }

    $(".container").html(frContent)
}

function setMonitorHeaderType(monitorSectionType) {
    var monitorSectionHeader;
    switch (monitorSectionType) {
        case 'MANAGEMENT_TURNOVER':
            monitorSectionHeader = "green";
            break;
        case 'EVENTS':
            monitorSectionHeader = "green";
            break;
        default:
            monitorSectionHeader = "red";
            break;
    }

    return monitorSectionHeader;
}

function monitorDetailsTweets(monitorId, sectionId, sectionType) {
    $.mobile.changePage("#monitorDetailsTweets");
    console.log("Monitor ID : " + monitorId)
    console.log("Section ID : " + sectionId)
    console.log("Section Type : " + sectionType)
}




