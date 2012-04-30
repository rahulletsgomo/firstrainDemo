
var loginURL="ajax_login.jsp";
var logoutURL="ajax_logout.jsp";
var forgotpwURL="ajax_forgotpwNew.jsp";
var feedbackURL="ajax_feedbackNew.jsp";
var recentSearchesURL="ajax_recentHistory.jsp";
var mainMenusURL="ajax_mainMenus1.jsp";
var resultsListURL="ajax_getResults1.jsp";
var emailResultsListURL="ajax_getEmailResults1.jsp";
var detailsPageURL="ajax_detailPages1.jsp";
var refreshLandingURL="ajax_refreshLandingPage.jsp";
var messagingURL="ajax_userdata.jsp";
var autocompleteURL="ajax_autocomplete.jsp";
var timeLoggerURL="ajax_logTimes.jsp";

var screenSlideTime=200; // (changed to 100 for android below)
var folderSlideTime=200; // (changed to 100 for android below)
var itemSlideTime=200;
var teaserSlideTime=100;
var glowFadeTime=2000;
var maxDetailsPerLoad=2;
var landingPageRefresh=300000;
var ALLOW_ACTION_ON_SWIPE_END=true; // added for clicks in swipe areas.

var theOS="UNKNOWN";
var iosV="UNKNOWN";
var theBrowser="UNKNOWN";
var fullScreenFlag=false;
var internetFlag=false;
var actionE='click';
var derivedScreenHeight=400;

var nowGlowing;
var lastTouched;
var nextSearchId=-2; 
var currentListId='0';
var nextListPos=0;
var nowDocIdList=[]; // this is set on each new result list load
var nowHeaderTexts=[]; // this is set on each new result list load
var nowHeaderClasses=[]; // this is set on each new result list load
var allDocIdList=[]; // this stores all the lists as they come in, indexed [listPos][articlePos]=>articleSDID
var allHeaderTexts=[]; // this stores the header text for articles in each resultset.
var allHeaderClasses=[]; // this stores the header classes for articles in each resultset.
var listTitles=[];
var listSubtitles=[];
var nowOpNum=0;
var topStartY=-1;
//var listId2Pos={}; // used to map a listId (code) to a position on stage
//var listPos2Id={};
var nowView=[];
var nextView=[];
var firstClickedDoc=0;  // set when user chooses from result list.
var savedArticleTop=0
var savedResultScreenScrollTop=1;
var popoversOpen=false;
var currentTitle="FirstRain";
var currentView="Current Email";
var loadedDrillDowns={};

//function getSdidByListPos(n) {return nowDocIdList[n%(nowDocIdList.length)];}

var Native={
	showAlert: function(x) {
	 try {
		if (theOS=="ANDROID") {Android.showAlert(x);} 
		else if (theOS=="IOS") {}
		else {}
	 } catch (e) {}
	},
	showSpinner: function(message1,message2) {
	 try {
		if (theOS=="ANDROID") {Android.showSpinner(message1,message2);} 
		else if (theOS=="IOS") {} //location.href='iphone://startActivityMonitor';}
		else {$('.loadingProgressMessage').show();}
	 } catch (e) {}
	},
	clearSpinner: function() {
	 try {
		if (theOS=="ANDROID") {Android.clearSpinner();}
		else if (theOS=="IOS") {} //location.href='iphone://stopActivityMonitor';} 
		else {$('.loadingProgressMessage').hide();}
	 } catch (e) {}
	},
	sendEmail: function(toList,subject,bodyText, bodyHTML) {
		subject=subject.replace(/<.?[span|a][^>]*>/gi,"");
		subject=subject.replace(/<br>/gi," -- ");
		subject=subject.replace(/&amp;/gi,"&");
		
		subject=subject.substring(0,Math.min(subject.length,60))+"...";
		bodyText=bodyText.replace(/<.?[span|a][^>]*>/gi,"");
		bodyText=bodyText.replace(/<br>/gi," -- ");
		bodyText=bodyText.replace(/&amp;/gi,"&");
		bodyHTML=bodyHTML.replace(/<.?[span|a][^>]*>/gi,"");
	 try {
		if (theOS=="ANDROID") {Android.sendEmail(toList,subject,bodyText);} 
		else if (theOS=="IOS") {location.href='iphone://sendMail:?sub='+encodeURIComponent(subject)+'&sum='+encodeURIComponent(bodyHTML);}
		else {alert("emailing: "+encodeURIComponent(subject)+", "+encodeURIComponent(bodyHTML));}
	 } catch (e) {}
	},
	showMenu: function() {},
	setPageInfo: function(backValid,pageTitle, pageSubtitle) {
	 try { 
		if (theOS=="ANDROID" ) {
			//Android.setHeaderText(pageTitle, pageSubtitle);
			if (pageTitle && pageTitle!=null) {$(".AndroidHeader").html(pageTitle);}
			if (pageSubtitle && pageSubtitle!=null) {$(".AndroidSubheader").html(pageSubtitle);}
			else {$(".AndroidSubheader").html("");}
		} 
		else if (theOS=="IOS" && theBrowser!="SAFARI") {
			if (pageTitle && pageTitle!=null) {
				pageTitle=$('<div/>').html(pageTitle).text();
				if (pageTitle.length>16) {pageTitle=pageTitle.substring(0,12)+"...";}
			}
			var iosMessage='iphone://setPageInfo:?eB='+backValid+'&mT='+encodeURIComponent(pageTitle);
			if (pageSubtitle && pageSubtitle!=null && pageSubtitle.length>0) {
				pageSubtitle=$('<div/>').html(pageSubtitle).text();
				iosMessage=iosMessage+'&sT='+encodeURIComponent(pageSubtitle);
			}
			location.href=iosMessage;
		}
		else {
			if (pageTitle && pageTitle!=null) {$(".AndroidHeader").html(pageTitle);}
			if (pageSubtitle && pageSubtitle!=null) {$(".AndroidSubheader").html(pageSubtitle);}
			else {$(".AndroidSubheader").html("");}
		}
	 } catch (e) {}
	},
	setAsInitialized: function() {
	 try { 
		if (theOS=="IOS" && theBrowser!="SAFARI") {
			var iosMessage='iphone://setInitialized';
			location.href=iosMessage;
		}
		else {}
	 } catch (e) {}
	},
	setLoginStatus: function(statusCode) {
	 try { 
		if (theOS=="ANDROID") {} 
		else if (theOS=="IOS" && theBrowser!="SAFARI") {
			var iosMessage='iphone://status:?loggedIn='+statusCode;
			location.href=iosMessage;
		}
		else {}
	 } catch (e) {}
	},
	openURL: function(url) {
	 try { 
		if (theOS=="ANDROID") {} 
		else if (theOS=="IOS" && theBrowser!="SAFARI") {
			var iosMessage='iphone://openInBrowser:?url='+encodeURIComponent(url);
			location.href=iosMessage;
		}
		else {location.href=url;}
	 } catch (e) {}
	}
}
function showWaiting(x) {
	if (x) {
		var screenTop=$('body').scrollTop()+120;
		$('.loadingProgressMessage').css({top:screenTop});
		$('.loadingProgressMessage').show();
	} else {$('.loadingProgressMessage').hide();}
}
function showBlinkers(dt) {
	$('.blinkers').show().fadeOut(dt);
}
function getDeviceConfig() {
	orient();
	theOS=whatOS();
	if ((''+navigator.userAgent).indexOf('Safari')>=0) {theBrowser="SAFARI";}
	if (navigator.standalone) {fullScreenFlag=true;} //alert ('Running full screen');} else {alert ('Running in a browser');}
	if (navigator.onLine) {internetFlag=true;} //alert ('There is a network connection');} else {alert ('There is no network connection');}
	if (theOS=="IOS") {derivedScreenHeight=400;} else {derivedScreenHeight=440;} //$(window).height()-120;} //window.screen.availHeight-120;} $('#debugbar').html("h:"+derivedScreenHeight); //window.innerHeight
}
function orient() {var ori=window.orientation;}
function whatOS() {
	var uAgent=''+navigator.userAgent;
    if (uAgent.indexOf('iPad')>=0 || uAgent.indexOf('iPhone')>=0) {if (uAgent.indexOf('OS 5_')>=0) {iosV="5";} return "IOS";}
    if (uAgent.indexOf('android')>=0 || uAgent.indexOf('Android')>=0) {return "ANDROID";}
    if (uAgent.indexOf('Mobile')>=0 && uAgent.indexOf('BlackBerry')>=0) {return "MobileBB";}
    if (uAgent.indexOf('WebKit')>=0 || uAgent.indexOf('webkit')>=0) {return "WEBKIT";}
    if (uAgent.indexOf('Gecko')>=0 || uAgent.indexOf('gecko')>=0) {return "GECKO";}
    return "UNKNOWN";
}

//$(document).ready(mainInit);  // I should think about what goes here and what goes on <body> load.
function mainInit() {mainInit(null);}
function mainInit(encodedKey) { // encodeKey passed from body load when available
	Native.setLoginStatus('no');
	getDeviceConfig();
	if (theOS=='ANDROID' || theOS=='IOS') {$('.nonMobileMenuBar').hide();}
	if (theOS=='IOS') {$('.androidTopHeader').hide();}
	if (theOS!='IOS') {$('.secondTitle').hide();}
	if (theOS=='ANDROID') {screenSlideTime=100; folderSlideTime=100;}
	$('#topMessage').html(theOS);
	Native.setPageInfo("yes","FirstRain");
	$('.detailsScreenContentArea').swipe({
			threshold: {xLeft:20, xRight:40, y:50},
			swipeLeft: function() { showNextDoc();},
			swipeRight: function() { showPrevDoc();}
	});
	$('#screen1Details').swipe({
			threshold: {xLeft:10, xRight:10, y:100},
			swipeLeft: function() { moveTeaser(1);}, 
			swipeRight: function() { moveTeaser(-1);} 
	});
	
	//$("#searchBox").frautocomplete({url: "ajax_autocomplete.jsp"});
	//$("#fw_terminputAll_1").frautocomplete({extraParams: {type: "company"}, max:10});
			
	window.onhashchange = locationHashChanged;
	
	if (theOS=="ANDROID" || theOS=="IOS" || theOS=="MobileBB") {actionE='touchend';} else {actionE='click';}
	$('.touchable').bind('touchstart', startOption);
	$('.buttonRegular').bind('touchstart', touchPreClick);
	$('.glowPreClick').bind('touchstart', touchPreClick);
	
	$('.emailOptionButton').bind(actionE, sendFeedbackAsEmail);
	
	$('.backButton').bind(actionE, goBackInHistory);
	$('.homeButton').bind(actionE, showHomeScreen);
	$('.monitorsButton').bind(actionE, showMonitorsPopover);
	$('.showOptionsButton').bind(actionE, showOptionsPopover);
	$('.searchButton').bind(actionE, showSearchPopover);
	$('.topPrevButton').bind(actionE, showPrevDoc);
	$('.topNextButton').bind(actionE, showNextDoc);
	
	$('.gridButtonMarked').bind(actionE, showMyMarked);
	$('.gridButtonSearch').bind(actionE, showSearchPopover);
	$('.gridButtonHome').bind(actionE, showHomeScreen);
	$('.gridButtonAccount').bind(actionE, showSettings);
	$('.gridButtonMonitors').bind(actionE, showMonitorsPopover);
	$('.PopUpMenuClose').bind('touchstart', startOption);
	$('.PopUpMenuClose').bind(actionE, closePopovers);
	
	$('.drillDown').bind(actionE, showSubsectionsPopover);
	//$('.adjustButton').bind(actionE, showAdjustTab);
	$('.prevDocButton').bind(actionE, showPrevDoc);
	$('.nextDocButton').bind(actionE, showNextDoc);
	$('#loginForm').bind('submit',submitLoginForm);
	$('#searchBox').bind('keyup', addToAutocomList);

	initializeScreens();
	if (goodString(encodedKey)) {$('.accountBox').hide(); $('#splashBox').show(); doLogin(null, null, encodedKey);}
	else {$('.accountBox').hide(); $('#loginBox').show();}
	Native.setAsInitialized();
	
	$('#testTeaserListerButton').bind('click', chooseFolder);
}
function initializeScreens() {
	clearStage('screen'); clearStage('xresults'); clearStage('xdetail');
	nowView['xteaser']=0;
	nowView['screen']=-1; nowView['xresults']=-1; nowView['xdetail']=-1; 
	nextView['screen']=-1; nextView['xresults']=-1; nextView['xdetail']=-1; 
	firstCol['screen']=0;
	resizeAndShowCell();
	teeUpScreen(0);
}
function goodString(x) {
	if (x && x!=null && x.length>0) {return true;}
	else {return false;}
}
function submitLoginForm(e) {
	$('#loginFailedMessage').hide();
	var username=$('#usernameInput').val();
	var password=$('#truePWInput').val();
	var encodedKey=$('#encodedKey').val();
	doLogin(username,password,encodedKey);
	return false;
}
function clearForgotpwForm() {
	$('#forgotMainSection').show();
	$('#emailAddr').val('Your email address'); 
	$('#forgotpwMsgDiv').html('');
}
function clearFeedbackForm() {
	//$('#feedbackReasonList').val('');
	$('#feedbackMainSection').show();
	$('#feedbackSubject').val('Subject');$('#feedbackDescription').val('Description');
	$("#feedbackMsgDiv").html('');
}
function submitForgotpwForm(e) { 
	var url=forgotpwURL;
	var theData={email:$('#emailAddr').val()};
	$('#forgotMainSection').hide();$("#forgotpwMsgDiv").html("<img class='loadingPad' width='16px' height='16px' src='img/Loading.gif'/>");
	ajaxLoadWithData(url,theData, ["#forgotpwMsgDiv"]);
	$('body').scrollTop(1);
} 
function submitFeedbackForm(e) { 
	var url=feedbackURL;
	var desc=$('#feedbackDescription').val();
	var subj=$('#feedbackSubject').val();  if (!$.trim(subj) || subj=='Subject') {
		var endOfLine=40;
		if (desc.indexOf('\n')>-1) {endOfLine=Math.min(desc.indexOf('\n'),40);}
		subj=desc.substr(0,Math.min(desc.length,endOfLine));
	}
	var theData={reason:$('#feedbackReasonList').val(),Subject:subj,Description:desc};
	$('#feedbackMainSection').hide();$("#feedbackMsgDiv").html("<img class='loadingPad' width='16px' height='16px' src='img/Loading.gif'/>");
	ajaxLoadWithData(url,theData, ["#feedbackMsgDiv"]);
	$('body').scrollTop(1);
}
function doLogin(username,password,encodedKey) {
	$("#signinButton").attr("disabled", "disabled");
	if (goodString(username) && goodString(password)) {
		//url=loginURL+"?username="+encodeURIComponent(username)+"&password="+encodeURIComponent(password);
		url=loginURL;
		loginData={username: username, password: password};
	}
	else if (goodString(encodedKey)) {
		//url=loginURL+"?encodedKey="+encodeURIComponent(encodedKey);
		url=loginURL;
		loginData={encodedKey: encodedKey};
	}
	else {stopLogin(); return;}
	
	Native.showSpinner("Signing in","Loading..."); 
	showWaiting(true);
	ajaxLoadWithData(url,loginData, ["#accountDetails","#quickMenuDiv","#screen1Details"], function() {
		if ($("#usersFullName").size()==0) {stopLogin(); return;}		
		$('#quickMenuDiv .touchable').bind('touchstart', startOption);
		$('#quickMenuDiv .touchPreClick').bind('touchstart', touchPreClick);
		$('#quickMenuDiv .quickOption').bind('click', chooseFolder);
		$('.showAllMonitorsButton').bind('touchstart', startOption);
		$('.showAllMonitorsButton').bind(actionE,showMonitorsPopover);
		//bindTeaserSection();
		$('#xteaserFrame .detailsTeaserContent').bind('touchstart',touchPreClick);
		$('#xteaserFrame .detailsTeaserContent').bind('click',showTeasersDetail);
		$('#xteaserFrame .detailsTeaserContent').bind('touchend',unGlow);
		allDocIdList[-1]=nowDocIdList;
		allHeaderTexts[-1]=nowHeaderTexts;
		allHeaderClasses[-1]=nowHeaderClasses;

		// The follwoing 5 lines were here, but sometimes event code would FAIL.
			//resizeAndShowCell();	
			//teeUpScreen(1); 
			//$("#signinButton").removeAttr("disabled");
			//$('#loginBox').hide(); $('#accountBox').show();
			//Native.clearSpinner(); 
		ajaxLoad(mainMenusURL, ["#mainMenuDiv"], function() {
			//if ($(".oneOp").size()==0) {stopLogin(); return;}
			
			$('#mainMenuDiv .touchPreClick').bind('touchstart', touchPreClick);
			$('#mainMenuDiv .oneOp').bind('click', chooseFolder);
			
			$('.PopUpMenuClose').bind('touchstart', startOption);
			$('.PopUpMenuClose').bind(actionE, closePopovers);
			$('.accountName').html($('#accountName').html()); 
			resizeAndShowCell();	
			teeUpScreen(1); 
			$("#signinButton").removeAttr("disabled");
			$('.accountBox').hide(); $('#accountBox').show();
			Native.clearSpinner();
			//savedEncodedKey=
			showWaiting(false);
		});
		ajaxLoad(recentSearchesURL, ["#recentSearches"], function() {
			$('#recentSearches .touchPreClick').bind('touchstart', touchPreClick);
			$('#recentSearches .touchPreClick').bind('click', submitSearchEvent);
			Native.setLoginStatus('yes');
		});
		$("#screen1Details").html("<div class='teaserLoadingMessage'>"+getLoadingMessage("Loading...")+"</div>");
		$('.teaserLoadingMessage').css({"width":$("body").width()});
		refreshTeasersAndTopMonitors();
		//lastTeaserRefreshTime=(new Date()).getTime();
	});
}
function getLoadingMessage(words) {
	if (!words) {words="Loading...";}
	var nodeHTML="<div class='loadingDialogue'><div class='internalLoadingWrapper'><img src='img/Loading.gif' width='16' height='16'><span>"+words+"</span></div></div>";
	return nodeHTML;
}
var lastTeaserRefreshTime=0;
function refreshTeasersAndTopMonitors() {
	var nowTime=(new Date()).getTime();
	if (nowTime - lastTeaserRefreshTime > landingPageRefresh) {
		lastTeaserRefreshTime=nowTime;
		var url=refreshLandingURL;
		ajaxLoad(url, ["#accountDetails","#quickMenuDiv","#screen1Details"], function() {		
			$('#quickMenuDiv .touchable').bind('touchstart', startOption);
			$('#quickMenuDiv .touchPreClick').bind('touchstart', touchPreClick);
			$('#quickMenuDiv .quickOption').bind('click', chooseFolder);
			//bindTeaserSection();
			$('#xteaserFrame .detailsTeaserContent').bind('touchstart',touchPreClick);
			$('#xteaserFrame .detailsTeaserContent').bind('click',showTeasersDetail);
			$('#xteaserFrame .detailsTeaserContent').bind('touchend',unGlow);
			allDocIdList[-1]=nowDocIdList;
			allHeaderTexts[-1]=nowHeaderTexts;
			allHeaderClasses[-1]=nowHeaderClasses;
			$('.xteaser').css({"width":teaserWidth});  // teaserWidth had been computer earlier.
		});
	}
}
function stopLogin() {
	$('.accountBox').hide(); $('#loginBox').show();
	document.cookie="encodedKey=";
	Native.clearSpinner(); 
	showWaiting(false);
	$('#loginFailedMessage').show(); Native.showAlert("Sign in Failed"); 
	$("#signinButton").removeAttr("disabled");
	return;
}
function signout() {  // called by onclick in HTML
	Native.setLoginStatus('no'); // not geting through!
	$("#signinButton").attr("disabled", "disabled");
	document.cookie="username=username";
	document.cookie="encodedKey=";
	ajaxLoad(logoutURL,[], function() {});
	if (theOS=="IOS") {location.href='main.jsp?action=logout';}
	else {
		$(".accountBox").hide();$("#loginBox").show();
		clearUserData(); 
	}
}
function clearUserData() {
	$('.monitorTitle').html("No monitor"); 
	$('.monitorSubtitle').html("No subtitle");
	$(".private").html("");
	$('#usernameInput').val("username");
	$('#truePWInput').val("");
	$("#passwordLabel").show();
	$("#signinButton").removeAttr("disabled");
	//$("#accountDetails").html("No Account");
}

// ======================================
// DEALING WITH HISTORY, POPOVERS, AND HASHES IN THE URL

var historyDepth=0;
var goingBack=false;
var lastScreenVal=-1;

function goBackInHistory(event) {moveInHistory(-1); glow(this,false);return false;}
function moveInHistory(n) {if (n!=0) {goingBack=true; historyDepth=historyDepth+n-1; window.history.go(n);}} // 1 will be added back in locationHashChanged
function setLocationHash(h) {location.hash=h;}

var numCs=0;
var lastBigC=-1;
function locationHashChanged() { // only called on hashchange-event, never directly.
	var sVal=getValue('s',location.hash); if (sVal=='') {sVal='0';}
	var cVal=getValue('c',location.hash); 
	if (sVal!='2' && sVal!='3') {numCs=0;lastBigC=-1;}
	// WE NEVER ALLOW FLOW "BACK" FROM LOW SCREEN TO HIGHER SCREEN (e.g. 2 to 3)
	// THIS WAS HAPPENING AFTER RESULTS GENERATED WHILE IN SCREEN3
	// SO WE HAD HISTORY: 2,2,3,2.  GOING BACK MUST SKIP OVER 3.
	historyDepth=historyDepth+1;
	if (goingBack && lastScreenVal<sVal) {goingBack=false; moveInHistory(-1); return;}
	goingBack=false;  lastScreenVal=sVal;
	if (getValue('p',location.hash).length>0) {return;}
	if (popoversOpen) {closePopovers(); return;}

	//what do i do here if BROWSER backbutton event, not via my js:goBackInHistory?
	if (sVal=='3' && cVal!='' && cVal<nowView['xresults']) {  // HARD BACK BUTTON PROBABLY PRESSED??
		goingBack=false; historyDepth=historyDepth-2;moveInHistory(-1); 
		return;
	}
	if (sVal=='2' && cVal!='') {
		//if (cVal!='') {
			cValInt=parseInt(cVal); 
			if (cValInt>lastBigC) {numCs=numCs+1;}
			if (cValInt<lastBigC) {numCs=numCs-1;}
			lastBigC=cValInt;
			if (cValInt!=-1 && cValInt!=nowView['xresults']) {
				teeUpFolderByPos(cValInt,folderSlideTime,'',0, false,listTitles[cValInt],listSubtitles[cValInt]);
			}
		//}
	}
	if (sVal!=nowView['screen']) {teeUpScreen(sVal);}
}
function getValue(key,keyvals) {
	var startPos=keyvals.indexOf(key+'='); 
	if (startPos>=0) {
		var ampPos=keyvals.indexOf('&',startPos+key.length+1);
		var endPos=(ampPos>-1)?ampPos:keyvals.length; 
		return keyvals.substring(startPos+key.length+1,endPos);
	}
	else return '';
}
function addKV(keyvals,key,value) { // we have s,c,p
	var newKeyvals="";
	var del="";
	var params=['s','c','p'];
	for (var i=0; i<params.length; i++) {
		var k=params[i];
		var v=getValue(k,keyvals); 
		if (k==key) {v=value;} 
		if (v!=null && v.length>0) {newKeyvals=newKeyvals+del+k+"="+v; del="&";}
	}
	return newKeyvals;
}
function showSettings(event) {
	closePopovers();
	var motion=-(historyDepth);
	if (theOS=="WEBKIT") {motion=-(nowView['screen']+Math.max(0,(numCs-1))+1);}
	if (theOS=="IOS" && iosV=="5") {motion=-(nowView['screen']+2*Math.max(0,(numCs-1))+1);}
	$('.accountBox').hide(); $('#accountBox').show();
	moveInHistory(motion); 
	glow(this,false);return false;
}
function showHomeScreen(event) {
	closePopovers();
	var motion=-(historyDepth-1);
	if (theOS=="WEBKIT") {motion=-(nowView['screen']+Math.max(0,(numCs-1)));}
	if (theOS=="IOS" && iosV=="5") {motion=-(nowView['screen']+2*Math.max(0,(numCs-1)));} 
	if (nowView['screen']==0) {teeUpScreen(1);}
	else {moveInHistory(motion);}
	glow(this,false);return false;
}
function showHomeScreenFromLastPage(event) {
	closePopovers();
	var motion=-(historyDepth-2);
	if (theOS=="WEBKIT") {motion=-(nowView['screen']+Math.max(0,(numCs-1))-1);}
	if (theOS=="IOS" && iosV=="5") {motion=-(nowView['screen']+2*Math.max(0,(numCs-1))-1);} 
	moveInHistory(motion);
	glow(this,false);return false;
}
// =======================================

// VARIOUS TOUCH REACTIONS
// ==============================
function startOption(event) {glow(nowGlowing,false); glow(this,true);nowGlowing=this;lastTouched=this;return false;}
function touchPreClick(event) {glow(nowGlowing,false); glow(this,true);nowGlowing=this;lastTouched=this;return true;}
function touchPreClickParent(event) {glow(nowGlowing,false); var x=this.parentNode; glow(x,true);nowGlowing=x;lastTouched=this;return true;}
function setAsLastTouched(event) {lastTouched=this;return true;}
function unGlow(event) {glow(nowGlowing,false);return false;}
function endTouchForDetails(event) {var docNum=parseInt($(this).attr('docNum')); showDetails(docNum);glow(this,false);return false;}
function glow(x,on) {if (on) {$(x).addClass('glowing');} else {$(x).removeClass('glowing');}}
// ==============================


function showMonitors() {showMonitorsPopover();} // called from Native Device Code
function showSearch() {showSearchPopover();} // called from Native Device Code
function showOptionsMenu() {showOptionsPopover();} // called from Native Device Code


// The above function retrieves all marked items for now.  We need to make My Marked and All Marked work correctly.
// Also we need ot have drilldown defined correctly for this resultlist
//function showAllMarked(event) {closePopovers();teeUpFolder(1,folderSlideTime,'ALL',"MARKED",true,"Bookmarks","Shared with me"); glow(this,false);return false;}
//function showDiscussion(event) {closePopovers();teeUpFolder(3,folderSlideTime,'',"POP",true,"Bookmarks","Shared with me"); glow(this,false);return false;}

function showOptionsScreen(event) {teeUpScreen(1); glow(this,false);return false;}
function showFeedbackPopover(event) {clearFeedbackForm();showPopover('#feedbackPopover');glow(this,false);return false;}
function showForgotpwPopover(event) {clearForgotpwForm(); showPopover('#forgotpwPopover');glow(this,false);return false;}
function showMonitorsPopover(event) {
	showPopover('.folderMenu');
	glow(this,false);return false;
}
function showOptionsPopover(event) {
	showPopover('#optionsPopover',30,15);
	glow(this,false);return false;
}
function showSearchPopover(event) {
	showPopover('.searchLayer');
	$('#searchBox').focus();
	glow(this,false);
	ajaxLoad(recentSearchesURL, ["#recentSearches"], function() {
		$('#recentSearches .touchPreClick').bind('touchstart', touchPreClick);
		$('#recentSearches .touchPreClick').bind('click', submitSearchEvent);
		Native.setLoginStatus('yes');
	});
	return false;
}
function showSubsectionsPopover(event) {
	showPopover('#sliceMenuXYZ'); //+currentListId);
	glow(this,false); return false;
}
function showTeasersDetail(event) {clearStage('xdetail'); Native.setPageInfo("yes","FirstRain"); nextView['screen']=2; glow(this,false); return showADetailPage(this);}
function showResultsDetail(event) {return showADetailPage(this);}
function showADetailPage(domNode) {
	if (lastTouched!=domNode && actionE=='touchend') {return false;}
	var docNum=parseInt($(domNode).attr('docNum'));
	$(".resultItem").removeClass('selected');
	$(domNode.parentNode).addClass('selected');	
	showDetails(docNum); 
	return false;
}
function flagItem(event) {
	var eventActor=this;
	var sdid=$(this).attr('sdid');
	var jqSDID=sdid.replace(':','\\:');
	var mId = $(this).attr('metaid');
	if (typeof mId !== 'undefined' && mId !== false) { //unclip
		url=messagingURL+'?method=delMeta&p1='+sdid; //Was p1=mId; 
		ajaxLoad(url,[],function() {})			
		$('.flagItemButton.'+jqSDID).removeAttr('metaid');
		$('.flagItemButton.'+jqSDID).removeClass('clipped');
	} else { // clip
		ajax=messagingURL+'?method=addMeta&p1='+sdid+'&p2=m&p3=1'; 
		ajaxLoad(ajax, ["#tempData"], function() {
			var metaId=$('#tempData .metaid').html();
			$('.flagItemButton.'+jqSDID).attr('metaid',''+metaId);
		}); 
		$('.flagItemButton.'+jqSDID).addClass('clipped');
	}
	glow(this,false);return false;
}
function emailItem(event) {
	var sdid=$(this).attr('sdid');
	var jqSDID=sdid.replace(':','\\:');
	var eTitle=$('.details.'+jqSDID+' .title').html();
	var eSumm=$('.details.'+jqSDID+' .summaryContents p').html();
	var eURL=$('.details.'+jqSDID+' .linkItemButton').attr('href');
	if (eSumm==null) {eSumm='';}
	if (!eURL) {eURL="";}
	var eBody="Forwarded from FirstRain Mobile.   \n\n"+eTitle+"   \n\n"+eSumm+"   \n\n"+eURL;
	var eBodyHTML="Forwarded from FirstRain Mobile.   <p/>"+eTitle+"   <p/>"+eSumm+"   <p/>"+eURL;
	Native.sendEmail([],"FW: "+eTitle, eBody,eBodyHTML)
	glow(this,false);return false;
}
function openLinkItem(event) {
	var href=$(this).attr('href');
	location.href=href;
	glow(this,false);return false;
}
function sendFeedbackAsEmail(event) {
	closePopovers();
	var eSubject="Feedback for FirstRain";
	var eBody="Feedback...";
	var eBodyHTML="Feedback...";
	Native.sendEmail(["support@firstrain.com"],eSubject, eBody,eBodyHTML);
	glow(this,false);return false;
}



// -------------------------------------
// ALL ABOUT TEASER ARTICLE POSITIONING
var teaserWidth=400; // reset dynamically later.
function moveTeaser(n) { 
	var numTeasers=$('.xteaser').length-1; // one is the prototype version.
	var nextT=nowView['xteaser']+n;
	if (nextT<0) {bounce('#xteaserFrame_stage',-200,100);return;}
	if (nextT>=numTeasers) {bounce('#xteaserFrame_stage',200,100);return;}
	nowView['xteaser']=nextT;
	dx='-='+(n*(teaserWidth));
	$('#xteaserFrame_stage').animate({left:(dx)}, teaserSlideTime);
}
function bounce(select,dx,dt) {$(select).animate({left:'-='+dx}, dt, function() {$(select).animate({left:'+='+dx}, dt);});}
// -------------------------------------
// ALL ABOUT RESETTING WIDTH & HEIGHT AFTER NEW CONTENT
function resizeAndShowCell() {
	var bW=$('body').width();
	$('#screenFrame').css({'width':bW});
	$('.screen').css({'width':bW-10});
	$('.xresults').css({'width':bW-14});
	$('.xdetail').css({'width':bW-34});
}
function resetHeightForLoadMoreResults() {
	var nowScreen=nextView['screen'];
	var w=$("body").width();
	if (nowScreen==2) {
		$('#screen2').css({"width":w});
		$('.xresults').css({"width":w});
		var h=Math.max($("#xresults"+nextView['xresults']).height(),480);
		$('.midi').css({"height":h+40});
		$('#screenFrame').css({"height":Math.max(h+300,1024)});
		//$('body').scrollTop(1);  // WHAT TO DO?!!!!!!!!! 
	}
}
function resetHeightForNowScreen() {
	var nowScreen=nextView['screen'];
	var w=$("body").width();
	if (nowScreen==0 || nowScreen==-1) {
		Native.setPageInfo("no","FirstRain");
		$('#screenFrame').css({"width":w});
		$('#screen0ContentArea').css({"width":w});
	}
	if (nowScreen==1) {
		Native.setPageInfo("no","FirstRain");
		$('#screen1ContentArea').css({"width":w});
		teaserWidth=w;
		$('.xteaser').css({"width":teaserWidth});
		//$('.detailsTeaser').css({"width":teaserWidth});
		var h=Math.max($("#screen1ContentArea").height(),800);
		//$('.midi').css({"height":h+40});
		$('#xteaserFrame').css({"height":200});
		$('#screenFrame').css({"height":h+40});
	}
	if (nowScreen==2) {
		$('#screen2').css({"width":w});
		$('.xresults').css({"width":w});
		// nowView VS nextView!!!!!!!!
		//var h=Math.max($("#xresults"+nowView['xresults']).height(),480);
		var h=Math.max($("#xresults"+nextView['xresults']).height(),480);

		$('.midi').css({"height":h+40});
		$('#screenFrame').css({"height":Math.max(h+300,1024)});
		// Added to move to top of result list on back button?? MAYBE Needed instead on new xresults!!!
		$('body').scrollTop(1);  // SUBTLE NEEDED SOMETIMES!!!!!!!!! 
	}
	if (nowScreen==3) {
	//alert($('#screenFrame').height());
		$('#screen3').css({"width":w});
		//var h=$(".detailsScreenContentArea").height();
		var h=Math.max($("#xdetail"+nowView['xdetail']).height(),480);
		$('.midi').css({"height":h+50});
		//PROBLEM HERE IS THAT THE HEIGHT IS MADE SMALL SO CANT GET TO ITEM DOWN BELOW
		//THE ITEM IS SHOWN CORRECTLY IF HEIGHT IS BIG ENOUGH
		var bodyScrollTop=$('body').scrollTop()
		//$('#screenFrame').css({"height":(h+bodyScrollTop+400)});  // 100? 400? needed to make it bigger than screen.
	// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
		$('.articleFrame').css({"height":(h+15)+'px'});
	// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
	}
}

// Showing and closing popover windows.
// ======================================
function showPopover(code,fromTop, fromLeft) {
	$('#truePWInput').hide();  // FIX for truePWInput element weirdness on Android.
	if (!fromTop) {fromTop=30;}
	if (!fromLeft) {fromLeft=20;}
	//if (popoversOpen || $(code).size()==0) {return;}
	if ($(code).size()==0) {return;}
	//closePopovers();
	if (!popoversOpen) {
		$('#blackBack').width($('body').width());
		var fullHeight=Math.max($('body').height(),40+fromTop+$('body').scrollTop()+$(code).height());
		$('#blackBack').height(fullHeight);
		$('#blackBack').show();
	}
	$('.popupScreen').hide();
	$(code).show();
	$('.popupScreen').width($('body').width()-40);
	$('.popupScreen').css({'left':fromLeft});
	$('.popupScreen').css({"top":($('body').scrollTop()+fromTop)}); // this had been stuck by an "!important" in CSS!
	//popoversOpen=true;
	if (!popoversOpen) {popoversOpen=true; setLocationHash(addKV(location.hash,'p','1'));}
}
function closePopovers(event) {
	$('#truePWInput').show(); // FIX for truePWInput element weirdness on Android.
	$('.popupScreen').hide(); $('#blackBack').hide();
	popoversOpen=false;
	if (getValue('p',location.hash).length>0) {moveInHistory(-1);return;}
	glow(this,false);
	return false;
}



// -------------------------------------
// ALL ABOUT SHOWING ARTICLES
function loadMoreResults(event) {
	var url=null;
	var holder=$(this).parents('.xresults');
	var fid=$(this).attr('fid');
	var subid=$(this).attr('subid');
	var searchQuery=$(this).attr('searchQuery');
	var startAt=$(this).attr('startAt');
	if (subid && fid) {url=resultsListURL+"?fid="+fid+"&subid="+subid+"&startAt="+startAt+"&nextStartId="+nowDocIdList.length;}
	else {
		url=resultsListURL+"?search="+searchQuery+"&startAt="+startAt+"&nextStartId="+nowDocIdList.length;
		if (subid) {url=url+"&subid="+subid;}
	}
	$(this).replaceWith("<div class='loadingMoreContentMessage'>LOADING MORE CONTENT <img src='img/Loading.gif' width='16' height='16'/></div>");
	ajaxAppendInJQObject(url,holder, function() {
		//resetHeightForNowScreen();
		resetHeightForLoadMoreResults();		
		bindResultsSection(holder.children().last());
		allDocIdList[nextView['xresults']]=nowDocIdList;
		allHeaderTexts[nextView['xresults']]=nowHeaderTexts;
		allHeaderClasses[nextView['xresults']]=nowHeaderClasses;
		$('.loadingMoreContentMessage').remove();
	});
	return false;
}
/* loadMoreSections() currently unused.  Needs to be used. */
function loadMoreSections(event) {
	var holder=$(this).parents('.xresults');
	var searchQuery=$(this).attr('searchQuery');
	var subid=$(this).attr('subid');
	var startAt=$(this).attr('startAt');
	//$(this).parents('.resultItem').replaceWith("<div>LOADING MORE CONTENT</div>");
	$(this).replaceWith("<div>LOADING MORE CONTENT</div>");
	var url=resultsListURL+"?search="+searchQuery+"&startAt="+startAt+"&nextStartId="+nowDocIdList.length;
	if (subid) {url=url+"&subid="+subid;}
	ajaxAppendInJQObject(url,holder, function() {
		resetHeightForNowScreen(); bindResultsSection(holder.children().last());
		allDocIdList[nextView['xresults']]=nowDocIdList;
		allHeaderTexts[nextView['xresults']]=nowHeaderTexts;
		allHeaderClasses[nextView['xresults']]=nowHeaderClasses;
	});
	return false;
}
function showFirstDoc(event) {firstClickedDoc=0; showDetails(0);return false;}
function goBackToResultsPage(event) {moveInHistory(-1); return false;}
function showPrevDoc(event) {
	var nextDocNum=nowView['xdetail']-1;
	if (nextDocNum<firstClickedDoc) {goBackToResultsPage(event); return false;}
	else {showDetails(nextDocNum);return false;}
}
function showNextDoc(event) {
	var nextDocNum=nowView['xdetail'];
	nextDocNum++;
	//if (nextDocNum<nowDocIdList.length) {nextDocNum++;}
	if (nextDocNum>=nowDocIdList.length) {teeUpLastPage(true,nowDocIdList.length,itemSlideTime,false,false); return false;}
	else {showDetails(nextDocNum);return false;}
}
function showDetails(itemNum) {
	if (nowView['screen']==3)  {teeUpArticle(true,itemNum,itemSlideTime,false,true);}
	else {
		teeUpArticle(true,itemNum,0,false,false); // false here because first detail page must display before others load!
		$('.visTotal').html(""+nowDocIdList.length);
		teeUpScreen(3); //???
		firstClickedDoc=itemNum;
		$('#screen3').css({'height':'3000px'});
	}
} 
function teeUpArticle(showNow,itemNum,dt,forceLoad,loadMore) { //,nextItems) {
	nowDocIdList=allDocIdList[nowView['xresults']]
	var listSize=nowDocIdList.length;
	if (itemNum==listSize) {return;}
	var theDocToLoad=itemNum%(listSize+1); ///////
	var itemType='xdetail';
	if (showNow) {$('.visCount').html(""+(theDocToLoad+1));}
	cloneAndShow(true,showNow,itemType,itemNum,itemNum,0,dt,function() {
		if (showNow) {resetHeightForNowScreen();}
		if (loadMore) {loadDetailsNoShow(maxDetailsPerLoad);}
	});
	if (!loaded[itemType][theDocToLoad] || forceLoad) {
		lastLoaded[itemType]=itemNum;
		var sdid=allDocIdList[nowView['xresults']][theDocToLoad];
		var headerText=allHeaderTexts[nowView['xresults']][theDocToLoad];
		var headerClass=allHeaderClasses[nowView['xresults']][theDocToLoad]; //nowHeaderClasses[theDocToLoad];
		url=detailsPageURL+"?sdid="+sdid;
		$("#"+itemType+itemNum).html(getLoadingMessage("Loading..."));
		ajaxLoad(url, ["#"+itemType+itemNum], function() {
			loaded[itemType][theDocToLoad]=true;
			bindDetailButtons(sdid,itemNum,nowDocIdList.length,headerText,headerClass);
			if (moveDone && showNow) {resetHeightForNowScreen();}
		});
	}
}
function loadDetailsNoShow(maxSize) {
	var start=lastLoaded['xdetail']+1;
	var size=Math.min(nowDocIdList.length-start,maxSize);
	if (size>0 && start<nowDocIdList.length && !loaded['xdetail'][start]) {teeUpArticles(false,start,size,0,false,false);}
}
function teeUpArticles(showNow,start,count,dt,forceLoad,loadMore) { //,nextItems) {
	showNow=false; loadMore=false; forceLoad=false;
	var itemType='xdetail';
	var listSize=nowDocIdList.length;
	if (start==listSize) {return;}
	var sdids="", del="";
	for (var itemNum=start; itemNum<start+count; itemNum++) { // make list of sdid
		if (itemNum>=listSize) {break;}
		var theDocToLoad=itemNum%(listSize+1);
		sdids=sdids+del+allDocIdList[nowView['xresults']][theDocToLoad]; del=',';
	}
	for (var itemNum=start; itemNum<start+count; itemNum++) { // create space for each
		if (itemNum>=listSize) {break;}
		cloneAndShow(true,showNow,itemType,itemNum,itemNum,0,dt,function() {});
	}
	url=detailsPageURL+"?sdid="+sdids;
	var detailSpots=[];
	for (var itemNum=start; itemNum<start+count; itemNum++) {
		if (itemNum<listSize) {detailSpots[itemNum-start]="#"+itemType+itemNum;}
	}
	ajaxLoad(url, detailSpots, function() {
		for (var itemNum=start; itemNum<start+count; itemNum++) { // fill spaces with loaded.
			var theDocToLoad=itemNum%(listSize+1);
			var sdid=allDocIdList[nowView['xresults']][theDocToLoad];
			var headerText=allHeaderTexts[nowView['xresults']][theDocToLoad];
			var headerClass=allHeaderClasses[nowView['xresults']][theDocToLoad]; //nowHeaderClasses[theDocToLoad];
			loaded[itemType][theDocToLoad]=true;
			bindDetailButtons(sdid,itemNum,listSize,headerText,headerClass);
		}
	});
	lastLoaded[itemType]=start+count-1;
}
function bindDetailButtons(sdid,cellId,cellsTotal,headerText,headerClass) {
	var cell=$('#xdetail'+cellId);
	$(cell).find('.detailsHeader').addClass(headerClass).html("<span class='teaserCount'>"+(cellId+1)+" of "+cellsTotal+"</span>"+headerText);	// this has a bug where it adds header to prev dupes.
	$(cell).find('.flagItemButton').bind('touchstart', startOption);
	$(cell).find('.flagItemButton').bind(actionE, flagItem);
	$(cell).find('.emailItemButton').bind('touchstart', startOption);
	$(cell).find('.emailItemButton').bind(actionE, emailItem);
	if (theOS=="IOS") {
		$(cell).find('.linkItemButton').bind('touchstart', touchPreClick);
		$(cell).find('.linkItemButton').bind(actionE, openLinkItem);
	} else {
		$(cell).find('.linkItemButton').bind('touchstart', touchPreClick);
	}
	$(cell).find('.catSearchLink').bind('touchstart', startOption);
	$(cell).find('.catSearchLink').bind(actionE, submitCategorySearchEvent);
	var titleSectionHeight=$(cell).find('.sTitle').height();
	$(cell).find('.detailsArticleWrapper').css({"height":derivedScreenHeight+"px"});
	$(cell).find('.vScrollDetails').css({"height":(derivedScreenHeight-78)+"px"});
	$(cell).find('.documentActionButtons').css({"top":(derivedScreenHeight-79)+"px"});
}
var lastPageHTML="<div class='lastPageOptions'>"+
		"<div class='goToHomeButton touchable'><span>icon</span>Home</div>"+
		"<div class='returnToParentButton touchable'><span>icon</span>yyy</div>"+
		"<div class='returnToButton touchable'><span>icon</span>Return to 1 of xxx</div>"+
		//"<span class='loadMoreButton loadMoreDetails touchable'>Load More</span>"+
		"</div>";
function teeUpLastPage(showNow,listSize,dt,forceLoad,loadMore) {
	var itemType='xdetail';
	var forceLoad=false;
	cloneAndShow(true,showNow,itemType,listSize,listSize,0,dt,function() {
		if (showNow) {resetHeightForNowScreen();}
	});
	if (!loaded[itemType][listSize] || forceLoad) {
		var parentListExists=true;
		lastLoaded[itemType]=listSize;
		var thisListLabel="Back to parent list";
		if (listTitles[nowView['xresults']]) {thisListLabel=listTitles[nowView['xresults']]+" - "+listSubtitles[nowView['xresults']];}
		else {parentListExists=false;}
		var thisLastPage=lastPageHTML.replace('xxx',''+listSize).replace('yyy',thisListLabel);
		$("#"+itemType+listSize).html(thisLastPage);
			loaded[itemType][listSize]=true; 
			$('.lastPageOptions .touchable').bind('touchstart', touchPreClick);
			//$('.lastPageOptions .loadMoreDetails').bind(actionE, loadMoreResults);
			$('.lastPageOptions .returnToButton').bind(actionE, showFirstDoc);
			if (parentListExists) {
				$('.lastPageOptions .goToHomeButton').bind(actionE, showHomeScreenFromLastPage);
				$('.lastPageOptions .returnToParentButton').bind(actionE, goBackToResultsPage);
			}
			else {
				$('.lastPageOptions .goToHomeButton').bind(actionE, goBackToResultsPage); 
				$('.lastPageOptions .returnToParentButton').hide();
			}
			if (moveDone && showNow) {resetHeightForNowScreen();}		
	}
}


// -------------------------------------
// TEE UP A FOLDER VIA SEARCH, MONITOR, SUBSECTION, ...
function showMyMarked(event) {
	closePopovers();
	nowOpNum="MARKED";
	teeUpFolder(nowOpNum,folderSlideTime,'MY',"MARKED",true,"Bookmarks");
	$('.baselineScreen2').hide();
	glow(this,false);
	return false;
}
function submitSearchFromForm(e) {
	$("#searchBox").blur();
	var q=jQuery.trim($("#searchBox").val());
	submitSearchWithQorId('q='+q); // should return sid which goes into <li>
	$("#searchBox").attr('value',''); 
	return false;
}
function showAutocomplete(on) {
	if (on) {$(".recentSearches").hide();$(".autocompletions").show();}
	else {$(".autocompletions").hide();$(".recentSearches").show();}
}
function addToAutocomList(x) {
	var t=$('#searchBox').val();
	if (t.trim().length==0) {showAutocomplete(false); return;}
	showAutocomplete(true);
	$.getJSON(autocompleteURL+'?q='+encodeURIComponent(t), getAutoAdderFunction());
}
var lastStartTime=0;
function getAutoAdderFunction() { // A function that only runs if it is the latest created.
	var thisStartTime=(new Date()).getTime();
	return function(jsonObj) {
		if (lastStartTime>thisStartTime) {return;} else {lastStartTime=thisStartTime;}
		autoAdd(jsonObj);
	};
}
function autoAdd(jsonObj) {
	var theList=jsonObj.data.autoComplete;
	var itemDesc, entityDesc, textName, keyword, html="";
	var colonPos;
	var oneItemsHTML;
	$.each(theList, function(x) {
		textName=theList[x]['name'];
		itemDesc=theList[x]['displayName'];
		keyword=theList[x]['searchToken'];
		entityDesc=theList[x]['type'];
		//colonPos=itemDesc.indexOf(':');
		//entityDesc=itemDesc.substring(0,colonPos-1);
		//itemDesc=itemDesc.substring(colonPos+2,itemDesc.indexOf('<i '));
		oneItemsHTML="<li onclick=\"submitSearchWithQorId('q="+keyword+"','"+textName+"'); return false;\" class='autocom touchPreClick'><span class='acname'>"+itemDesc+"</span> <span class='actype'>"+entityDesc+"</span></li>"
		if (x<18) {html=html+oneItemsHTML;}
	});
	$('#autocomList').html(html);
}
function submitQSearchEvent(e) {
	if (lastTouched!=this && actionE=='touchend') {return false;}
	var sToken=$(this).attr('searchToken');
	var textTitle=$(this).find('.entity').html();
	var cType=$(this).attr('cType');
	var subTitle=$(this).attr('subTitle');
	if (!subTitle) {subTitle=$(this).html();}
	if (cType || subTitle) {submitSearchWithQorId(sToken,textTitle,cType,subTitle);}
	else if (textTitle) {submitSearchWithQorId(sToken,textTitle);}
	else {submitSearchWithQorId(sToken);}
	return false;
}
function submitCategorySearchEvent(e) {
	if (!ALLOW_ACTION_ON_SWIPE_END) {return;}
	if (lastTouched!=this && actionE=='touchend') {return false;}
	var searchToken=$(this).attr('searchToken');
	var textTitle=$(this).html();
	submitSearchWithQorId('q='+searchToken,textTitle); // this will add to recent searches, just like search box.
	return false;
}
function submitSearchEvent(e) {
	if (lastTouched!=this && actionE=='touchend') {return false;}
	submitSearchWithNode(this); 
	return false;
}
function submitSearchWithQorId(qTitle,textTitle, subQ, subTitle) {
	if (!textTitle && !(qTitle.indexOf(":")>=0)) {textTitle="["+qTitle.substring(2)+"]";}
	$('#theRecentList').prepend('<li class="recentSearch touchPreClick" onclick="submitSearchWithQorId(\''+qTitle+'\'); return false;">'+textTitle+'</li>');
	closePopovers(); 
	showAutocomplete(false);
	sqParam="";
	if (subQ) {sqParam=subQ;}
	if (!subTitle) {subTitle="All Sections";} 
	teeUpFolder(nextSearchId--,folderSlideTime,qTitle,sqParam,true,textTitle,subTitle); 
	return false;
}
function submitSearchWithNode(node) {
	var sid=$(node).attr('sid');
	var qTitle=$(node).html();
	showAutocomplete(false);	 
	closePopovers();  glow(node,false);
	teeUpFolder(nextSearchId--,folderSlideTime,"id="+sid,"",true,qTitle,"All Sections");
	var dNode=$(node).detach();
	$('#theRecentList').prepend(dNode);
	$().val("");
}
function chooseSubsection(event) {
	if (lastTouched!=this && actionE=='touchend') {return false;}
    var emailView=$(this).attr('emailView');
    var folderId=$(this).attr('folderId');
    var sliceQ=$(this).attr('slice');
	var qName=$(this).attr('qName'); 
	//var subq=$(this).attr('subq'); 
	//if (subq && (subq=="event" || subq=="mt")) {sliceQ=subq;}
	var title=null;
	var subtitle=$(this).attr('subTitle');
	if (!subtitle || subtitle.length==0) {subtitle=$(this).html();}
	closePopovers(); glow(this,false);
	
	if (emailView && emailView.length>0) {teeUpFolder(nowOpNum,folderSlideTime,'',folderId,true,title,subtitle,true);}
	else {teeUpFolder(nowOpNum,folderSlideTime,sliceQ,folderId,true,title,subtitle);}
	return false;
}
function chooseFolder(event) {	
	if (lastTouched!=this && actionE=='touchend') {return false;}
    folderId=$(this).attr('folderId');
    nowOpNum=$(this).attr('cellNum');
    filterName=$(this).attr('filterName'); 
	var title=$(this).find('.theFolderName').html(); 
	var subtitle="All Sections"; 
	closePopovers();glow(this,false); 
	if (filterName && filterName.length>0) {teeUpFolder(nowOpNum,folderSlideTime,filterName,folderId,true,title,subtitle);}
	else {teeUpFolder(nowOpNum,folderSlideTime,'',folderId,true,title,subtitle);}
	return false;
}
// I previously shifted back and forth on stage, but now I copy to next position.
function teeUpFolder(listId,dt,searchQ,folderId,forceLoad,title,subtitle,emailType) {
	currentListId=listId;
	listId=''+listId;
	//listId2Pos[listId]=nextListPos;
	//listPos2Id[nextListPos]=listId;
	teeUpFolderByPos(nextListPos,dt,searchQ,folderId,forceLoad,title,subtitle,emailType);
}
function teeUpFolderByPos(fNum,dt,searchQ,folderId,forceLoad,title,subtitle,emailType) {
	teeUpScreen(2);
	if (!title || title==null || title.length==0) {title=currentTitle;}
	var itemType='xresults';
	var drilldownPat="#slicesListXYZ"; //+(folderId);
	cloneAndShow(true,true,itemType,fNum,fNum,0,dt);
	if (loadedDrillDowns[fNum]) {
		$("#slicesListXYZ").html(loadedDrillDowns[fNum]);
		$(drilldownPat+' .filterBind').bind('touchstart', touchPreClick);
		$(drilldownPat+' .filterBind').bind('click', chooseSubsection);
		$(drilldownPat+' .typeBind').bind('touchstart', touchPreClick);
		$(drilldownPat+' .typeBind').bind('click', submitQSearchEvent);
	}
	if (emailType) {
		currentView="Latest Email"; 
		url=emailResultsListURL+'?fid='+folderId;
	}
	else if (folderId=="MARKED") {
		currentView=null;
		//url=datedResultsListURL+'?fid='+folderId+"&subid="+searchQ;
		url=resultsListURL+'?fid='+folderId+"&subid="+searchQ;
	}
	else if ((folderId=="tweets" || folderId=="events" || folderId=="mt" || folderId=="docs") && searchQ && searchQ.length>0) {
		currentView="Search";
		url=resultsListURL+'?search='+encodeURIComponent(searchQ)+"&subid="+folderId;
	}
	else if (folderId && folderId.length>0) {
		currentView="Current Monitor";
		if (searchQ && searchQ.length>0) {
			//url=datedResultsListURL+'?fid='+folderId+"&subid="+searchQ;
			url=resultsListURL+'?fid='+folderId+"&subid="+searchQ;
		}
		else {url=resultsListURL+'?fid='+folderId;}
	}
	else if (searchQ && searchQ.length>0) {
		currentView="Search";
		url=resultsListURL+'?search='+encodeURIComponent(searchQ);
	}
	if (title!=null) {
		$('#screen2 .monitorTitle').html(title);
		$('#screen3 .monitorTitle').html(title);
	}
	if (subtitle!=null) {
		$('#screen2 .monitorSubtitle').html(subtitle);
	}
	if (!loaded[itemType][fNum] || forceLoad) {
		var fPat="#"+itemType+fNum;
		//$(fPat).html("Loading Data...");
		$(fPat).html(getLoadingMessage("Loading..."));
		//Native.showSpinner("Loading",searchQ+"..."); // Weird!!: my jQuery html(x) functions are failing after this call.
		var folderLoadTime= (new Date()).getTime();
		nowDocIdList=[]; nowHeaderTexts=[]; nowHeaderClasses=[];
		ajaxLoad(url, [fPat,drilldownPat,"#ajaxLogData"], function() {
			var monNameNode=$(fPat+' .monitorName');
			if (monNameNode.length>0) {
				$('#screen2 .monitorTitle').html(monNameNode.html());
				$('#screen3 .monitorTitle').html(monNameNode.html());
			}
			folderLoadTime=((new Date()).getTime()-folderLoadTime)
			loaded[itemType][fNum]=true; resetHeightForNowScreen();	
			loadedDrillDowns[fNum]=$(drilldownPat).html();
			bindResultsSection($(fPat));

			//if empty, hide button.
			if (loadedDrillDowns[fNum].trim().length==0) {$('.baselineScreen2').hide();} else {$('.baselineScreen2').show();}

			$(drilldownPat+' .filterBind').bind('touchstart', touchPreClick);
			$(drilldownPat+' .filterBind').bind('click', chooseSubsection);
			$(drilldownPat+' .typeBind').bind('touchstart', touchPreClick);
			$(drilldownPat+' .typeBind').bind('click', submitQSearchEvent);
			//$('#mainMenuDiv '+drilldownPat+' .filterBind').bind('click', chooseSubsection);
			allDocIdList[nextView['xresults']]=nowDocIdList;
			allHeaderTexts[nextView['xresults']]=nowHeaderTexts;
			allHeaderClasses[nextView['xresults']]=nowHeaderClasses;
			Native.clearSpinner();
			var message=title+","+subtitle+": client ("+folderLoadTime+") "+$("#ajaxLogData").html()+")";
			ajaxLoad(timeLoggerURL+"?message="+encodeURIComponent(message), [], function() {});
		});
	}
	else {
		nowDocIdList=allDocIdList[nextView['xresults']];
		nowHeaderTexts=allHeaderTexts[nextView['xresults']];
		nowHeaderClasses=allHeaderClasses[nextView['xresults']];
		if (loadedDrillDowns[fNum].trim().length==0) {$('.baselineScreen2').hide();} else {$('.baselineScreen2').show();}
		resetHeightForNowScreen();
	}	
	Native.setPageInfo("yes",title,currentView);
	currentTitle=title;
	clearStage('xdetail');
	nextListPos=fNum+1;
	/*
	Moved lines above Native.showSpinner() because something about the Native spinners in iPhone made .html(x) fail.
	*/
	listTitles[fNum]=$('.monitorTitle').html();
	listSubtitles[fNum]=$('.monitorSubtitle').html();
}
function bindResultsSection(jqObjectParent) {
	jqObjectParent.find('.flagItemButton').bind('touchstart', startOption);
	jqObjectParent.find('.flagItemButton').bind(actionE, flagItem);
	jqObjectParent.find('.docResult.titleArea').bind('touchstart',touchPreClickParent); //setAsLastTouched); // trying to make scroll look nicer
	jqObjectParent.find('.docResult.titleArea').bind('click',showResultsDetail);
	jqObjectParent.find('.docResult.titleArea').bind('touchend',unGlow);
	jqObjectParent.find('.subLink').bind('touchstart',touchPreClick);
	jqObjectParent.find('.subLink').bind('click', chooseSubsection);
	jqObjectParent.find('.subLinkType2').bind('touchstart', touchPreClick);
	jqObjectParent.find('.subLinkType2').bind('click', submitQSearchEvent);
	//jqObjectParent.find('.loadMoreSections').bind('touchstart', touchPreClick);
	//jqObjectParent.find('.loadMoreSections').bind('click', loadMoreSections);
	jqObjectParent.find('.loadMoreResults').bind('touchstart', touchPreClick);
	jqObjectParent.find('.loadMoreResults').bind('click', loadMoreResults);
	jqObjectParent.find('.tweetGauge.hasLink').bind('touchstart', touchPreClick);
	jqObjectParent.find('.tweetGauge.hasLink').bind('click', submitQSearchEvent);
}
// -------------------------------------
// TEE UP A SCREEN
function teeUpScreen(screenId) {

	if (nowView['screen']==screenId) {return;} // WILL THINGS WORK FINE???
    if (nowView['screen']==3 && screenId==2) {}  // once used to position vertically
	if (nowView['screen']>1 && screenId==1) {
			refreshTeasersAndTopMonitors(); clearStage('xresults');
	}
	cloneAndShow(false,true,"screen",screenId,screenId,0,screenSlideTime,function() {
		if (screenId==3) {resetHeightForNowScreen();}
		if (screenId==1 || screenId==3) {showBlinkers(2500);}
	});
	loaded['screen'][screenId]=true;
	if (screenId<=2) {resetHeightForNowScreen();}
	if (screenId<=1) {
		$('body').scrollTop(1);
	}
}
// -------------------------------------

// -------------------------------------

// USED BY SCREEN AND FOLDER AND ARTICLE FRAMES
// Assumes itemType implies Proto, Frame and stage id's  (#typeProto, #typeFrame, #typeFrame_stage)
var loaded=[]; 
var lastLoaded=[];
var placed=[];
var firstCol=[];  // firstCol SET in clearStage and cloneAndShow, USED in cloneAndShow
var moveDone=true;  // moveDone SET in cloneAndShow, USED in teeUpArticle

function clearStage(itemType) {
	placed[itemType]=[]; loaded[itemType]=[]; $('#'+itemType+'Frame_stage').html(""); 
	nowView[itemType]=-1; nextView[itemType]=-1; lastLoaded[itemType]=-1;
	delete firstCol[itemType]; 
}
function cloneAndShow(makeClone,showNow,itemType,itemNum,cellX,cellY,dt,afterMoveAndLoad) {
	cellX=parseInt(cellX); // should not need to parse! Somehow, rarely, it was string.  Look into this.
	if (nowView[itemType]!=cellX) {
		if (showNow) {moveDone=false;}
		var framePat="#"+itemType+"Frame";
		var stagePat=framePat+'_stage'; 
		var itemPat='#'+itemType+itemNum;  
		// added because we don't know width yet, this places the first item at position 0; all subsequent relative to this.
		if (firstCol[itemType]==undefined) {firstCol[itemType]=cellX;}
		var frameWidth=2+$(framePat).width();
		frameWidth=Math.max(frameWidth,202); // frameWidth may have been 0, until first article gets displayed!
		var targetX=(cellX-firstCol[itemType])*(frameWidth); 
		var targetY=cellY*$(framePat).height();
		var newCol;
		if (!placed[itemType][itemNum]) { 
			if (makeClone && $(itemPat).size()==0) { 
				newCol=$('#'+itemType+'Proto').clone().removeAttr('id').attr('id',itemType+itemNum);
			}
			if (!makeClone) {newCol=$(itemPat);}
			if (newCol) {
				$(stagePat).append(newCol);
				newCol.css({'left':targetX+'px','top':targetY+'px'}).show();
				placed[itemType][itemNum]=true;
			}
			newCol.css({'display':'block'});  // .show() WAS CAUSING WEIRD, INTERMITTENT FAILURES ON SCREEN DISPLAY.
		}
		if (showNow) { 	
			//moveDone=false; 	
			$(stagePat).animate({'left':+(-targetX)+'px'},dt, function() {
				moveDone=true;
				nowView[itemType]=cellX; 
				
				if (itemType=='xresults' || (itemType=='screen' && cellX!=2)) { // when multiple changes, only one changes hash
					var newHash=addKV('','s',''+nowView['screen']);
					if (nowView['screen']=='2' || nowView['screen']=='3') {newHash=addKV(newHash,'c',''+nowView['xresults']);}
					setLocationHash(newHash);
				}
				if (afterMoveAndLoad) { afterMoveAndLoad();}
			});
			nextView[itemType]=cellX;
		}
	}
}
function ajaxLoadWithData(url,data,placeList,afterLoad) {
	var showAlert=false;
	$("#ajaxResult").load(url,data, function() {
		for (var i=0; i<placeList.length; i++) {
			if ($("#ajaxResultPart"+i).length!=0) {$(placeList[i]).html($("#ajaxResultPart"+i).html());}
		}
		if ($("#ajaxResultMessage").length!=0) {showAlert=true; $('#generalMessageHolder').html($("#ajaxResultMessage").html());}
		$("#ajaxResult").html("");
		if (afterLoad) {afterLoad();}
		if (showAlert) {showPopover('#generalMessagePopup');}
	});
}

function ajaxLoad(url,placeList,afterLoad) {
	var showAlert=false;
	$("#ajaxResult").load(url, function() {
		for (var i=0; i<placeList.length; i++) {
			if ($("#ajaxResultPart"+i).length!=0) {$(placeList[i]).html($("#ajaxResultPart"+i).html());}
		}
		if ($("#ajaxResultMessage").length!=0) {showAlert=true; $('#generalMessageHolder').html($("#ajaxResultMessage").html());}
		$("#ajaxResult").html("");
		if (afterLoad) {afterLoad();}
		if (showAlert) {showPopover('#generalMessagePopup');}
	});
}
function ajaxAppendInJQObject(url,parentJQObject,afterLoad) {
	$("#ajaxResult").load(url, function() {
		parentJQObject.append($("#ajaxResultPart0").html());
		$("#ajaxResult").html("");
		if (afterLoad) {afterLoad();}
	});
}