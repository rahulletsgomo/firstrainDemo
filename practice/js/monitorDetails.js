function firstVersion() {
    var monitorSections = monitorResults.data.sections
    var monitorDetails = new Array();
//            console.log("Total number of sections in the monitor : " + monitorSections.length)
    var totalIDs = new Array();
    for (var i = 0; i < monitorSections.length; i++) {
        monitorDetails[i] = monitorSections[i];
        monitorDetails[i] = new Object();
        console.log(JSON.stringify(monitorDetails[i]))
        for (var baseId = 0; baseId < monitorSections[i].baseResults.length; baseId++) {
            totalIDs.push(monitorSections[i].baseResults[baseId]);
            monitorDetails[i][baseId] = monitorSections[i].baseResults[baseId];
        }
    }
    console.log("Total Number of IDs = " + totalIDs.length)

//            var monitor1 = new Array();
//            for (var i = 0; i < monitorSections[0].baseResults.length; i++) {
//                monitor1.push(monitorSections[0].baseResults[i])
//            }
//
//            console.log("Total number of baseResults in monitor1 : " + monitor1.length)
//            var j = 0
//            for (var i = 0; i < monitor1.length; i++) {
//                j = i + 1
//                console.log(j + " " + monitor1[i])
//            }
    for (var i = 0; i < monitorDetails.length; i++) {
        console.log(i + " " + JSON.stringify(monitorDetails[i]) + " : ")
        for (var j = 0; j < monitorDetails[i].length; j++) {
            console.log(monitorDetails[i][j])
        }
    }
}

function secondVersion(data) {
    var monitorSectionLength = data.data.sections.length;
    var monitorSection = data.data.sections;
    var monitorSectionResult = data.data.results;
    var referResultID = 0;
    var liOption = "";
    var fieldInfo = ""
    var resultID;
    var docSource;
    var sectionResult;
    var tweeterImage;
    var docTitle;
    var docIcon;
    var isDocTweet = false;
    var monitorContent;
    for (var i = 0; i < monitorSectionLength; i++) {
        monitorContent += '<ul type="I"><b>[' + i + ']' + monitorSection[i].title + '</b>'
        var sectionBaseResultsLength = monitorSection[i].baseResults.length
        monitorContent += '<ol>'
        for (var j = 0; j < sectionBaseResultsLength; j++) {
//            resultID = monitorSection[i].baseResults[j];
            sectionResult = monitorSectionResult[referResultID];
            docSource = sectionResult.source;
            docTitle = sectionResult.title;
            if (sectionResult.favicon) {
                docIcon = sectionResult.favicon
            }
//            if (docSource) {
//                fieldInfo = docSource;
////                liOption = "[" + referResultID + "] " + resultID + " : " + monitorSectionResult[referResultID].source
//            }
            else if (sectionResult.type == "TWEETS") {
                console.log(">>>> This is the area for tweets !!!")
                isDocTweet = true;
                tweeterImage = '<img src="' + sectionResult.extra.userImage + '" alt="Tweeter Image" />';
            }
            liOption += '<div class="liDiv">';
            liOption += isDocTweet ? '<div class="image">' + tweeterImage + '</div>' : "<div></div>"
            isDocTweet = false;
//            liOption += '<div class="image">' + tweeterImage + '</div>';
            liOption += docTitle ? '<div class="title">' + docTitle + '</div>' : '<div></div>';
            liOption += '<div class="date">' + referResultID + '</div>';
            liOption += docSource ? '<div class="source"><img src="' + docIcon + '" alt="Source Image" />&nbsp;&nbsp;' + docSource + '</div>' : '<div></div>';
            liOption += '</div>';

//            liOption = "[" + referResultID + "] " + resultID + " : " + fieldInfo
//            fieldInfo = "";
            monitorContent += '<li>' + liOption + '</li>'

            //Clear the previous variables before going to the next result
            docSource = ""
            docTitle = ""
            docIcon = ""
            liOption = ""
            referResultID++;
        }
        monitorContent += '</ol>'
        monitorContent += '</ul>'
    }
    $("#container").html(monitorContent)
}