	//synchrone
var xmlHttp = null;

function callBackCheckCurrentReservation(reply){
	var res = JSON.parse(reply);
	if (res.success == true)
	{
		var i = 0;
		 first = document.getElementById("result42");
		 first.innerHTML = "";
	    var out = '';
	    for (var i in res.reservations)
	    {
	  		maDiv = document.createElement("div");
			maDiv.id = res.reservations[i].station;
	//maDiv.style.border = '1px solid black'; //Pour mettre un border à ta div, par exemple
			maDiv.innerHTML = "[" + res.reservations[i].start + "  au " + res.reservations[i].start + "]    Station: " + res.reservations[i].station + "    Voiture: " + res.reservations[i].car ; //Peut contenir de l'html
			first.appendChild(maDiv);

	    }

	}
	else
		alert(res.msg);


}

function			checkCurrentReservation() {
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", "http://belia-bourgeois.fr/AutoBleue/server.php?method=current_res&token=" +  tokenLogin  , false );
	xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && (xmlHttp.status == 200 || xmlHttp.status == 0)) {
				callBackCheckCurrentReservation(xmlHttp.responseText);
               // alert(xmlHttp.responseText); // Données textuelles récupérées
				 document.getElementById("loader").style.display = "none";
        } else if (xmlHttp.readyState < 4) {
            document.getElementById("loader").style.display = "inline";
        }
	};
	xmlHttp.send();
}