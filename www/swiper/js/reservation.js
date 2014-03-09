
function onLoad()
{
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady()
{
    checkConnection();
	navigator.splashscreen.hide();
	window.addEventListener("batterycritical", onBatteryCritical, false);
	window.addEventListener("batterylow", onBatteryLow, false);
	document.addEventListener("menubutton", onMenuKeyDown, false);
}
	
// Handle the menu button
//
function onMenuKeyDown() 
{
}

// Handle the batterycritical event
//
function onBatteryCritical(info)
{
    alert("Battery Level Critical " + info.level + "%\nRecharge Soon!");
}

 // Handle the batterylow event
//
function onBatteryLow(info)
{
    alert("Battery Level Low " + info.level + "%");
}

function checkConnection()
{
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

    alert('Connection type: ' + states[networkState]);
}

function checkAndSend()
{
    alert("sending !");   
}
//jQuery(window).load(function(){initialize_gmap();}); 

