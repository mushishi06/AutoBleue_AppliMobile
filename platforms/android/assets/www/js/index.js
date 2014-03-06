/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners

    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		gallery = new SwipeView('#wrapper', { numberOfPages: slides.length });

	// Load initial data
	for (i=0; i<3; i++) {
		page = i==0 ? slides.length-1 : i-1;
		el = document.createElement('img');
		el.className = 'loading';
		el.src = slides[page].img;
		el.width = slides[page].width;
		el.height = slides[page].height;
		el.onload = function () { this.className = ''; }
		gallery.masterPages[i].appendChild(el);
		el = document.createElement('span');
		el.innerHTML = slides[page].desc;
		gallery.masterPages[i].appendChild(el)
	}
		
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

var	gallery,
	el,
	i,
	page,
	dots = document.querySelectorAll('#nav li'),
	slides = [
		{
			img: 'images/pic01.jpg',
			width: 300,
			height: 213,
			desc: 'Piazza del Duomo, Florence, Italy'
		},
		{
			img: 'images/pic02.jpg',
			width: 300,
			height: 164,
			desc: 'Tuscan Landscape'
		},
		{
			img: 'images/pic03.jpg',
			width: 300,
			height: 213,
			desc: 'Colosseo, Rome, Italy'
		},
		{
			img: 'images/pic04.jpg',
			width: 147,
			height: 220,
			desc: 'Somewhere near Chinatown, San Francisco'
		},
		{
			img: 'images/pic05.jpg',
			width: 300,
			height: 213,
			desc: 'Medieval guard tower, Asciano, Siena, Italy'
		},
		{
			img: 'images/pic06.jpg',
			width: 165,
			height: 220,
			desc: 'Leaning tower, Pisa, Italy'
		}
	];

gallery.onFlip(function () {
	var el,
		upcoming,
		i;

	for (i=0; i<3; i++) {
		upcoming = gallery.masterPages[i].dataset.upcomingPageIndex;

		if (upcoming != gallery.masterPages[i].dataset.pageIndex) {
			el = gallery.masterPages[i].querySelector('img');
			el.className = 'loading';
			el.src = slides[upcoming].img;
			el.width = slides[upcoming].width;
			el.height = slides[upcoming].height;
			
			el = gallery.masterPages[i].querySelector('span');
			el.innerHTML = slides[upcoming].desc;
		}
	}
	
	document.querySelector('#nav .selected').className = '';
	dots[gallery.pageIndex+1].className = 'selected';
});

gallery.onMoveOut(function () {
	gallery.masterPages[gallery.currentMasterPage].className = gallery.masterPages[gallery.currentMasterPage].className.replace(/(^|\s)swipeview-active(\s|$)/, '');
});

gallery.onMoveIn(function () {
	var className = gallery.masterPages[gallery.currentMasterPage].className;
	/(^|\s)swipeview-active(\s|$)/.test(className) || (gallery.masterPages[gallery.currentMasterPage].className = !className ? 'swipeview-active' : className + ' swipeview-active');
});

// Note: Like all Javascript password scripts, this is hopelessly insecure as the user can see 
//the valid usernames/passwords and the redirect url simply with View Source.  
// And the user can obtain another three tries simply by refreshing the page.  
//So do not use for anything serious!

var connecion = {	
	var count = 2;
	function validate() {
		var un = document.myform.username.value;
		var pw = document.myform.pword.value;
		var valid = false;

		var unArray = ["belia", "belia-_r", "Sarah", "Michael"];  // as many as you like - no comma after final entry
		var pwArray = ["romain", "romain2", "Password3", "Password4"];  // the corresponding passwords;

		for (var i=0; i <unArray.length; i++) {
			if ((un == unArray[i]) && (pw == pwArray[i])) {
				valid = true;
				break;
			}
		}

		if (valid) {
			alert ("Login was successful");
			window.location = "http://www.google.com";
			return false;
		}

		var t = " tries";
		if (count == 1) {t = " try"}

		if (count >= 1) {
			alert ("Invalid username and/or password.  You have " + count + t + " left.");
			document.myform.username.value = "";
			document.myform.pword.value = "";
			setTimeout("document.myform.username.focus()", 25);
			setTimeout("document.myform.username.select()", 25);
			count --;
		}
		else {
			alert ("Still incorrect! You have no more tries left!");
			document.myform.username.value = "No more tries allowed!";
			document.myform.pword.value = "";
			document.myform.username.disabled = true;
			document.myform.pword.disabled = true;
			return false;
		}
	}
}

