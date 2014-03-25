
var snapper = null;
var tokenLogin = null;

var menu1 = [
{href: 'login.html', innerHTML: '<img src="img/ico_info.png" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Accueil', start: '0', cur: '0'},
{href: 'maps.html', innerHTML: '<img src="img/ico_info.png" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Carte des Stations', start: '1', cur: '1'},
{href: 'reservation.html', innerHTML: '<img src="img/ico_info.png" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; R&eacute;server', start: '2', cur: '2'},
{href: 'search.html', innerHTML: '<img src="img/ico_info.png" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rechercher', start: '3', cur: '3'},
{href: 'contact.html', innerHTML: '<img src="img/ico_info.png" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Contact', start: '4', cur: '4'},
{href: 'myReservation.html', innerHTML: '<img src="img/ico_info.png" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Mes r&eacute;servations', start: '5', cur: '5'}
// {href: 'hyperextend.html', innerHTML: 'Hyperextension Disabled', start: '6', cur: '6'},
// {href: 'skinnyThreshold.html', innerHTML: 'Skinny Threshold', start: '7', cur: '7'},
// {href: 'toggles.html', innerHTML: 'Toggles', start: '8', cur: '8'},
// {href: 'classNames.html', innerHTML: 'Class Names', start: '9', cur: '9'},
// {href: 'expand.html', innerHTML: 'Expanding', start: '10', cur: '10'},
// {href: 'modele_new_menu.html', innerHTML: 'Modele de page', start: '11', cur: '11'}
// {href: 'noDrag.html', innerHTML: 'No Drag', start: '3', cur: '3'},
];

function menu_left(){
	var menu = TriTab(menu1, 1);
	for (i=0; i < menu.length; i++){
		document.getElementById('link_'+i).href = menu[i].href;
		document.getElementById('link_'+i).innerHTML = menu[i].innerHTML;
	}
}

function getMenu() {
	var menu = window.localStorage.getItem("myMenu");
	// var menu = window.localStorage.myMenu;
	// alert(menu);
	menu = JSON.parse(menu);
	if (menu != null)
		DispTab(menu);
		// document.getElementById('tab').innerHTML = menu[0].innerHTML;
}

function getTokenLogin() {
	tokenLogin = window.sessionStorage.getItem("tokenLogin");
	tokenLogin = JSON.parse(tokenLogin);
	// if (tokenLogin != null)
		
}
function getErrorLogin() {
	var errorLogin = window.sessionStorage.getItem("errorLogin");
	if(errorLogin)
		document.getElementById("errorLogin").style.display = "inline";
}

//function de trie a bulle
function inverser(tab,i,j) {
	var temp=tab[i];
	tab[i]=tab[j];
	tab[j]=temp;
}

function TriTab(tab,ordre) {
	// tab est le nom du tableau
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
function disp(txt) { document.write(txt) }
function DispTab(tab) {
	var nb=tab.length; 
	for (var i = 0; i < nb; i++)
		disp("Menu n° "+i+" : <B>"+tab[i].innerHTML+"</B> : "+tab[i].href+" <BR>");
}

function saveOnDevice(){
	var isFirstStart = window.localStorage.getItem("firstStart");
	 // alert(isFirstStart);
	if (isFirstStart == null){
		alert("is your first use !!!");
		window.localStorage.setItem("firstStart", false);
		window.localStorage.setItem("myMenu", JSON.stringify(menu1));
	}
	else{
        isFirstStart = window.localStorage.getItem("firstStart");
		getTokenLogin();
		getErrorLogin();
		// alert("isFirstStart => " + isFirstStart);
		// window.localStorage.setItem("myMenu", JSON.stringify(menu1));
        // // value is now equal to "value"
        // window.localStorage.removeItem("key");
        // window.localStorage.setItem("key2", "value2");
        // window.localStorage.clear();
        // localStorage is now empty
	}
}

function onLoad() {
		bindEvents();
	
    }
   
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
function bindEvents() {
	document.addEventListener('deviceready', onDeviceReady, false);
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
}
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
function onDeviceReady() {
	checkConnection();
	navigator.splashscreen.hide();
	window.addEventListener("batterycritical", onBatteryCritical, false);
	window.addEventListener("batterylow", onBatteryLow, false);
	window.addEventListener("batterystatus", onBatteryStatus, false);
	// document.addEventListener("menubutton", onMenuKeyDown, false);
	saveOnDevice();
	
    // receivedEvent('deviceready');
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
	 // alert("menu key down!");
	if (snapper != null) {
		if( snapper.state().state=="left" ){
			snapper.close();
		} else {
			snapper.open('left');
		}
	}
}
	
function onBatteryStatus(info) {
        console.log("Level: " + info.level + " isPlugged: " + info.isPlugged);
		alert("Level: " + info.level + " isPlugged: " + info.isPlugged);
    }
	
    // Handle the batterycritical event
    //
function onBatteryCritical(info) {
    alert("Battery Level Critical " + info.level + "%\nRecharge Soon!");
}
	
	 // Handle the batterylow event
    //
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
	snapper = new Snap({
		element: document.getElementById('content'),
		disable: 'right',
		hyperextensible: false
	});
	document.addEventListener("menubutton", onMenuKeyDown, false);
}


//previus in demo.js but not work ??
// var addEvent = function addEvent(element, eventName, func) {
	// if (element.addEventListener) {
    	// return element.addEventListener(eventName, func, false);
    // } else if (element.attachEvent) {
        // return element.attachEvent("on" + eventName, func);
    // }
// };

// addEvent(document.getElementById('open-left'), 'click', function(){
	// snapper.open('left');
// });

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