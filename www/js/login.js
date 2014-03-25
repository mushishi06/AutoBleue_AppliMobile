	//synchrone
var xmlHttp = null;

	
function			logMeIn(username, password, saveUser, savePass) {
	alert("Username = " + username + ". Password = " + password);
	
	saveUser.value = username;
	savePass.value = password;
   	// var xmlHttp = null;
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", "http://belia-bourgeois.fr/AutoBleue/server.php?method=login&mail=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password), false );
	xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && (xmlHttp.status == 200 || xmlHttp.status == 0)) {
				callBackLogMeIn(xmlHttp.responseText, saveUser, savePass);
               // alert(xmlHttp.responseText); // Données textuelles récupérées
				 document.getElementById("loader").style.display = "none";
        } else if (xmlHttp.readyState < 4) {
            document.getElementById("loader").style.display = "inline";
        }
	};
	xmlHttp.send();
}

function callBackLogMeIn(sdata, saveUser, savePass){
	 alert("yepaaaa");

	var res = JSON.parse(sdata);
	if (res.success){
	// document.getElementById("errorLogin").style.display = "none";
		alert("success = "+ res.success + " msg = " + res.msg + " token = " + res.token);
		window.localStorage.removeItem("userLogin");
		window.localStorage.removeItem("userPass");
		if (saveUser.checked){
			window.localStorage.setItem("userLogin", JSON.stringify(saveUser.value));
		}
		if (savePass.checked){
			window.localStorage.setItem("userPass", JSON.stringify(savePass.value));
		}
		window.sessionStorage.removeItem("tokenLogin");
		window.sessionStorage.removeItem("errorLogin");
		window.sessionStorage.setItem("tokenLogin", JSON.stringify(res.token));
	} else {
		window.sessionStorage.removeItem("tokenLogin");
		window.localStorage.removeItem("userLogin");
		window.localStorage.removeItem("userPass");
		window.sessionStorage.setItem("errorLogin", true);
		document.getElementById("errorLogin").style.display = "inline";
	}
}

	//asynchrone
function			testMe() {
   	// var xmlHttp = null;
	if (tokenLogin != null) {
	xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange=function()	{
		if (xmlHttp.readyState == 4)	{
			if (xmlHttp.status == 200)
				alert(xmlHttp.responseText);
			else
				alert("got 404 or 403 error");
		}
	}
	xmlHttp.open( "GET", "http://belia-bourgeois.fr/AutoBleue/server.php?method=test&token=" + tokenLogin +"", true);
	xmlHttp.send();
	}
	else
	alert("error not loget");
		
}

function			logout() {
   	var xmlHttp = null;

	xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange=function()	{
		if (xmlHttp.readyState == 4)	{
			if (xmlHttp.status == 200)
				alert(xmlHttp.responseText);
			else
				alert("got 404 or 403 error");
		}
	}
	xmlHttp.open( "GET", "http://belia-bourgeois.fr/AutoBleue/server.php?method=logout", true);
	xmlHttp.send();
}