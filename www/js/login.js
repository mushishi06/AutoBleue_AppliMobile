	//synchrone
var xmlHttp = null;

	
function			logMeIn(username, password, saveUser, savePass) {
	//alert("Username = " + username + ". Password = " + password);
	
	saveUser.value = username;
	savePass.value = password;
   	// var xmlHttp = null;
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", "http://belia-bourgeois.fr/AutoBleue/server.php?method=login&mail=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password), false );
	xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && (xmlHttp.status == 200 || xmlHttp.status == 0)) {
				callBackLogMeIn(xmlHttp.responseText, saveUser, savePass);
               // alert(xmlHttp.responseText); // Données textuelles récupérées
				// document.getElementById("loader").style.display = "none";
        }
	};
	xmlHttp.send();
}

function callBackLogMeIn(sdata, saveUser, savePass){
	var res = JSON.parse(sdata);
	if (res.success){
		alert("Logged in")
		if (getUserInfo()) {
			var user = "Moi";
			if (saveUser.checked){ user = saveUser.value;}
			var unknownUser = {name: user, lastName: '', mail: 'exemple@domaine.com', descr: 'User logged', img: 'img/userNotLogged.jpeg', isLogged: "true"};
			window.localStorage.removeItem("userInfo")
			window.localStorage.setItem("userInfo", JSON.stringify(unknownUser));
		}
		var menu = window.localStorage.getItem("myMenu");
		menu = JSON.parse(menu);
		menu.push({href: 'javascript:logout()', innerHTML: '<img src="img/ico_info.png" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Logout', start: '10', cur: '10'});
		window.localStorage.removeItem("myMenu");
		window.localStorage.setItem("myMenu", JSON.stringify(menu));
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
		alert("Identifiants incorrects.");
		// alert("success = " + res.success + ", errcode = " + res.errcode + ", msg : " + res.msg);
		// if (res.errcode == 449 || res.errcode == 401)
			// relogAuto();
		window.sessionStorage.removeItem("tokenLogin");
		window.localStorage.removeItem("userLogin");
		window.localStorage.removeItem("userPass");
		// window.sessionStorage.setItem("errorLogin", true);
		//document.getElementById("errorLogin").style.display = "inline";
	}
}

function	autoLogin(username, password) {

	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", "http://belia-bourgeois.fr/AutoBleue/server.php?method=login&mail=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password), false );
	xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && (xmlHttp.status == 200 || xmlHttp.status == 0)) {
				callBackAutoLogin(xmlHttp.responseText);
				document.getElementById("loader").style.display = "none";
        }
	};
	xmlHttp.send();
}

function	callBackAutoLogin(sdata){
	var res = JSON.parse(sdata);
	if (res.success){
		alert("success = "+ res.success +  " msg = " + res.msg + " token = " + res.token);
		
		var menu = window.localStorage.getItem("myMenu");
		menu = JSON.parse(menu);
		menu.push({href: 'javascript:logout()', innerHTML: '<img src="img/ico_info.png" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Logout', start: '10', cur: '10'});
		window.localStorage.removeItem("myMenu");
		window.localStorage.setItem("myMenu", JSON.stringify(menu));
		window.sessionStorage.removeItem("tokenLogin");
		window.sessionStorage.removeItem("errorLogin");
		window.sessionStorage.setItem("tokenLogin", JSON.stringify(res.token));
	} else {
		// if (res.errcode == 449 || res.errcode == 401)
			// relogAuto();		
	}
}