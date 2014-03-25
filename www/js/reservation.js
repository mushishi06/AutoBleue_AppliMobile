	//synchrone
var xmlHttp = null;

function callBackDoReservation(reply, station, car, start, end){
	// alert("yepaaaa");

	var res = JSON.parse(reply);
	//alert("callbackdoreservationsuccess = "+ res.success + " msg = " + res.msg + " token = " + res.token);
	if (res.success == true)
	{
		alert("Réservation effectuée")
	}
	else
		alert(res.msg);
}


function			doReservation(station, car, start, end) {
//	alert(" DO RESstation = " + station + ". Car = " + car  + ". start = " + start +  ". End = " + end + "token " + tokenLogin);
	
	//saveUser.value = username;
	//savePass.value = password;
   	// var xmlHttp = null;
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", "http://belia-bourgeois.fr/AutoBleue/server.php?method=reservation&token=" +  tokenLogin + "&station=" + encodeURIComponent(station) + "&car=" + encodeURIComponent(car) + "&start=" + encodeURIComponent(start) + "&end=" + encodeURIComponent(end), false );
	xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && (xmlHttp.status == 200 || xmlHttp.status == 0)) {
				callBackDoReservation(xmlHttp.responseText, station, car, start, end);
               // alert(xmlHttp.responseText); // Données textuelles récupérées
				 document.getElementById("loader").style.display = "none";
        } else if (xmlHttp.readyState < 4) {
            document.getElementById("loader").style.display = "inline";
        }
	};
	xmlHttp.send();
}


function callBackcheckReservation(reply, station, car, start, end){
	var res = JSON.parse(reply);
	//alert("callbackchecksuccess = "+ res.success + " msg = " + res.msg + " token = " + res.token);
	if (res.success == true)
	{
		if 	(confirm("Votre créneau est disponible, voulez-vous confirmer votre réservation ?"))
			doReservation(station, car, start, end);
	}
	else
		alert(res.msg);
}

function			checkReservation(station, car, start, end) {
	//alert("station = " + station + ". Car = " + car  + ". start = " + start +  ". End = " + end + "token " + tokenLogin);
	
	//saveUser.value = username;
	//savePass.value = password;
   	// var xmlHttp = null;
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", "http://belia-bourgeois.fr/AutoBleue/server.php?method=check&token=" +  tokenLogin + "&station=" + encodeURIComponent(station) + "&car=" + encodeURIComponent(car) + "&start=" + encodeURIComponent(start) + "&end=" + encodeURIComponent(end), false );
	xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && (xmlHttp.status == 200 || xmlHttp.status == 0)) {
				callBackcheckReservation(xmlHttp.responseText, station, car, start, end);
               // alert(xmlHttp.responseText); // Données textuelles récupérées
				 document.getElementById("loader").style.display = "none";
        } else if (xmlHttp.readyState < 4) {
            document.getElementById("loader").style.display = "inline";
        }
	};
	xmlHttp.send();
}