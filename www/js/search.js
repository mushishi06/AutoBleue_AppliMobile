	//synchrone
var xmlHttp = null;

function callBackSearchByCar(reply){
	var res = JSON.parse(reply);
	if (res.success == true)
	{
		var i = 0;
		 first = document.getElementById("result43");
		 first.innerHTML = "";
	    var out = '';
	    for (var i in res.stations)
	    {
	  		maDiv = document.createElement("div");
			maDiv.id = res.stations[i].station;
			//maDiv.style.border = '1px solid black'; //Pour mettre un border à ta div, par exemple
			maDiv.innerHTML = res.stations[i].name + " - " + res.stations[i].address ;
			first.appendChild(maDiv);
	    }
	}
	else
		alert(res.msg);
}

function			searchByCar(carName, tokenLog) {
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", "http://belia-bourgeois.fr/AutoBleue/server.php?method=list_stations_cars&token=" +  42 +"&car=" + carName, false );
	xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && (xmlHttp.status == 200 || xmlHttp.status == 0)) {
				callBackSearchByCar(xmlHttp.responseText);
				document.getElementById("loader").style.display = "none";
        } else if (xmlHttp.readyState < 4) {
            document.getElementById("loader").style.display = "inline";
        }
	};
	xmlHttp.send();
}