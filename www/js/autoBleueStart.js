
var snapper = null, myScroll = null;
var tokenLogin = null, userLogin = null, passLogin = null, userInfo = null;

var menu1 = [
{href: 'login.html', innerHTML: '<img src="img/ico_info.png" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Accueil', start: '0', cur: '0'},
{href: 'maps.html', innerHTML: '<img src="img/ico_info.png" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Carte des Stations', start: '1', cur: '1'},
{href: 'search.html', innerHTML: '<img src="img/ico_info.png" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rechercher', start: '2', cur: '2'},
{href: 'reservation.html', innerHTML: '<img src="img/ico_info.png" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; R&eacute;server', start: '3', cur: '3'},
{href: 'myReservation.html', innerHTML: '<img src="img/ico_info.png" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Mes r&eacute;servations', start: '4', cur: '4'},
{href: 'contact.html', innerHTML: '<img src="img/ico_info.png" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Contact', start: '5', cur: '5'},
//{href: 'settings.html', innerHTML: '<img src="img/ico_info.png" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Param&egrave;tres', start: '6', cur: '6'}
// {href: 'hyperextend.html', innerHTML: 'Hyperextension Disabled', start: '6', cur: '6'},
// {href: 'skinnyThreshold.html', innerHTML: 'Skinny Threshold', start: '7', cur: '7'},
// {href: 'toggles.html', innerHTML: 'Toggles', start: '8', cur: '8'},
// {href: 'classNames.html', innerHTML: 'Class Names', start: '9', cur: '9'},
// {href: 'expand.html', innerHTML: 'Expanding', start: '10', cur: '10'},
// {href: 'modele_new_menu.html', innerHTML: 'Modele de page', start: '11', cur: '11'}
// {href: 'noDrag.html', innerHTML: 'No Drag', start: '3', cur: '3'},
];

function	menu_left(){
	console.log('menu left');
	// var menu = TriTab(menu1, 1);
	if (getUserInfo()) {
		console.log('getUserInfo');
		document.getElementById('profilImg').src = userInfo.img;
		document.getElementById('profilName').innerHTML = userInfo.name + ' ' + userInfo.lastName;
		document.getElementById('profilDescr').innerHTML = userInfo.descr;
	}
	var menu = window.localStorage.getItem("myMenu");
	menu = JSON.parse(menu);
	menu = TriTab(menu, 1);
	for (i=0; i < menu.length; i++){
		document.getElementById('link_'+i).href = menu[i].href;
		document.getElementById('link_'+i).innerHTML = menu[i].innerHTML;
	}
}

function	relogAuto(){
	console.log('relogAuto');
	if (getTokenLogin()) {
		window.location.href='maps.html';
		// window.location.reload('module_map.html');
		// window.location.replace('module_map.html');
	}
	if (getUserLogin()) {
		// window.location.href='default.html';
		// window.location.reload('default.html');
		// window.location.replace('default.html');
	}
}

function	logout() {
   	var xmlHttp = null;
	console.log('logout func');
	xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange=function()	{
		if (xmlHttp.readyState == 4)	{
			if (xmlHttp.status == 200)
				logoutSuccess(xmlHttp.responseText);// alert(xmlHttp.responseText);
			else
				alert("got 404 or 403 error");
		}
	}
	xmlHttp.open( "GET", "http://belia-bourgeois.fr/AutoBleue/server.php?method=logout", true);
	xmlHttp.send();
}

function	logoutSuccess(sdata) {
	console.log('logout Success');
	var res = JSON.parse(sdata);
	// alert("success = "+ res.success + "error = " + res.errcode +" msg = " + res.msg + " token = " + res.token);
	 if (res.success){
		console.log('res.Success = ' + res.success);
		var menu = window.localStorage.getItem("myMenu");
		menu = JSON.parse(menu);
		menu = TriTab(menu, 1);
		menu.pop();
		window.localStorage.removeItem("myMenu");
		window.localStorage.setItem("myMenu", JSON.stringify(menu));
		window.sessionStorage.removeItem("tokenLogin");
		window.sessionStorage.removeItem("userInfo");
		var unknownUser = {name: 'User', lastName: 'Unknown', mail: 'exemple@domaine.com', descr: 'User not logged', img: 'img/userNotLogged.jpeg', isLogged: 'false'};
		window.localStorage.setItem("userInfo", JSON.stringify(unknownUser));
		window.location.href='login.html';
		// alert("Logout Success");
	 }
	 // else alert("Logout Failed");
}


function	checkUserLogged() {
	return (getTokenLogin());
}

function	getMenu() {
	var menu = window.localStorage.getItem("myMenu");
	menu = JSON.parse(menu);
	if (menu != null)
		DispTab(menu);
}

function	getUserInfo() {
	userInfo = window.localStorage.getItem("userInfo");
	userInfo = JSON.parse(userInfo);
	if (userInfo != null) { return true;}
	else { return false;}	
}

function	getTokenLogin() {
	tokenLogin = window.sessionStorage.getItem("tokenLogin");
	tokenLogin = JSON.parse(tokenLogin);
	if (tokenLogin != null) { return true;}
	else { return false;}	
}

function	getUserLogin() {
	userLogin = window.sessionStorage.getItem("userLogin");
	userLogin = JSON.parse(tokenLogin);
	if (userLogin != null){ return true;}
	else { return false;}	
}

function	getPassLogin() {
	userPass = window.sessionStorage.getItem("userPass");
	userPass = JSON.parse(userPass);
	if (userPass != null){ return true;}
	else { return false;}		
}

function	getErrorLogin() {
	var errorLogin = window.sessionStorage.getItem("errorLogin");
	if(errorLogin)
		document.getElementById("errorLogin").style.display = "inline";
}

//function de trie a bulle
function	inverser(tab,i,j) {
	var temp=tab[i];
	tab[i]=tab[j];
	tab[j]=temp;
}

function	TriTab(tab,ordre) {
	// ordre vaut 1 si tri croissant et -1 sinon
	ordre=-ordre;
	var n=tab.length;
	var continuer=true;
	var i=0;
	var iter=0;
	for (i=0;i<n;i++) {tab[i].cur=ordre*tab[i].cur;}
	while (continuer) {
		iter++;
		continuer=false;
		for (i=0;i<n-1;i++) {
			if (Math.min(tab[i].cur,tab[i+1].cur)!=tab[i+1].cur) {inverser(tab,i,i+1);  continuer=true;}
		}
	}
	for (i=0;i<n;i++) {tab[i].cur=ordre*tab[i].cur;}

	return tab;
}
function	disp(txt) { document.write(txt) }
function	DispTab(tab) {
	var nb=tab.length; 
	for (var i = 0; i < nb; i++)
		disp("Menu n° "+i+" : <B>"+tab[i].innerHTML+" <BR>");
}

function	reinitialisation(){
	var getSaveId = document.getElementById("saveId");
	if (!getSaveId.checked){
		window.localStorage.removeItem("userLogin");
		window.localStorage.removeItem("userPass");
	}
	window.localStorage.removeItem("firstStart");
	window.localStorage.removeItem("myMenu");
	window.localStorage.removeItem("userInfo");
	window.sessionStorage.removeItem("tokenLogin");
	window.sessionStorage.removeItem("errorLogin");
	window.location.href='login.html';
	alert("Réinitialisation réalisé avec success !!!");
}

function	removeIdUser() {
	if (getUserLogin()){window.localStorage.removeItem("userLogin");}
	if (getPassLogin()){window.localStorage.removeItem("userPass");}
	alert("Identifiants supprimé avec success !!!");
}

function	saveOnDevice(isLoginPage){
	var isFirstStart = window.localStorage.getItem("firstStart");
	if (isFirstStart == null){
		console.log('is your first use !!!');
		//alert("is your first use !!!");
		window.localStorage.setItem("firstStart", false);
		window.localStorage.setItem("myMenu", JSON.stringify(menu1));
		var unknownUser = {name: 'User', lastName: 'Unknown', mail: 'exemple@domaine.com', descr: 'User not logged', img: 'img/userNotLogged.jpeg', isLogged: 'false'};
		window.localStorage.setItem("userInfo", JSON.stringify(unknownUser));
	}
	else{
		if (!checkUserLogged()){
			console.log('checkUserLogged False ');
			if (getUserInfo()) {if (userInfo.isLogged == "true"){logout();}}
			if (getUserLogin() && getPassLogin()) {autoLogin(userLogin, passLogin);}
			else { if (!isLoginPage){window.location.href='login.html';}}
		} else {
			console.log('checkUserLogged true ');
			if (isLoginPage)
				window.location.href='reservation.html'
			}
		// getTokenLogin();  // plus besoin car checkUserLogged() appel getTokenLogin()
		// getErrorLogin();
	}
}

function onLoad() {
		bindEvents();
    }
    // Bind Event Listeners
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
function bindEvents() {
	document.addEventListener('deviceready', onDeviceReady, false);
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
}
    // deviceready Event Handler
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
function onDeviceReady() {
	checkConnection();
	navigator.splashscreen.hide();
	window.addEventListener("batterycritical", onBatteryCritical, false);
	window.addEventListener("batterylow", onBatteryLow, false);
	window.addEventListener("batterystatus", onBatteryStatus, false);
	saveOnDevice(false);
}
    // Update DOM on a Received Event
function receivedEvent(id) {
    var parentElement = document.getElementById(id);
	var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
}
	// Handle the menu button
    //
function onMenuKeyDown() {
	console.log('menu press');
	if (snapper != null) {
		if( snapper.state().state=="left" ) { snapper.close(); }
		else { snapper.open('left'); }
	}
}
	
function onBatteryStatus(info) {
    console.log("Level: " + info.level + " isPlugged: " + info.isPlugged);
	alert("Level: " + info.level + " isPlugged: " + info.isPlugged);
}
	
    // Handle the batterycritical event
function onBatteryCritical(info) {
    alert("Battery Level Critical " + info.level + "%\nRecharge Soon!");
}
	
	// Handle the batterylow event
function onBatteryLow(info) {
    alert("Battery Level Low " + info.level + "%");
}

function checkConnection() {
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

	if (networkState == Connection.CELL || networkState == Connection.NONE) {
		alert('Connection type: ' + states[networkState]);
		return (false);
	}
	return (true);
}
	
function updateSnapper() {
	// myScroll = new IScroll('#content', {
		// scrollbars: true,
		// mouseWheel: true,
		// interactiveScrollbars: true,
		// shrinkScrollbars: 'scale',
		// fadeScrollbars: true
	// });
	// // myScroll = new IScroll('#content');
	// document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	snapper = new Snap({
		element: document.getElementById('content'),
		disable: 'right',
		hyperextensible: false
	});
	document.addEventListener("menubutton", onMenuKeyDown, false);
}

/* Prevent Safari opening links when viewing as a Mobile App */
(function (a, b, c) {
    if(c in b && b[c]) {
        var d, e = a.location,
            f = /^(a|html)$/i;
        a.addEventListener("click", function (a) {
            d = a.target;
            while(!f.test(d.nodeName)) d = d.parentNode;
            "href" in d && (d.href.indexOf("http") || ~d.href.indexOf(e.host)) && (a.preventDefault(), e.href = d.href)
        }, !1)
    }
})(document, window.navigator, "standalone");