var audio_player = document.getElementById("player");
var clientID = "1dff55bf515582dc759594dac5ba46e9";
var template = document.querySelector("#results .template").cloneNode(true);

function playAudio() {
    // Grabs user's chosen track URL from function audioResults & allows other variables in this function access to it
    var stream_url = this.dataset["streamURLclient"];
	// Creates the share link by adding site domain name with the now playing SoundCloud track URL.  Escape is needed to handle special characters.
	var share_url = "http://ryanspahn.com/mubiquity/#" + escape(stream_url);
	
    // Marries stream_url with variable clientID to prepare track playback
    audio_player.src = stream_url + "?client_id=" + clientID;
	// Starts playback
	audio_player.play();
	
	// Displays the now playing track title 
	document.getElementById("nowPlaying").innerHTML = this.dataset["trackTitle"];
    // Displays share link to a track when user starts playing it
    document.getElementById("shareLink").innerHTML = share_url;
}
			
function audioResults() {
    // Obtains and records user search term
	var search = document.getElementById("search").value;
	// General JS call to an API
	var xhr = new XMLHttpRequest();
    // Calls/opens specified API resource 
	xhr.open('GET', "https://api.soundcloud.com/tracks?client_id=" + clientID + "&q=" + search, false);
	
	// On user click and or hitting enter in search this function and all it's code lists search results per user query
	xhr.addEventListener("load", function () {
		// parse JSON result
		var tracks = JSON.parse(xhr.response);
		console.log(tracks);
		
        var results_node = document.getElementById("results");
        results_node.innerHTML = "";
		
		var sorted_tracks = {};
		
		// for (var track in tracks) {
			// sorted_tracks[tracks[track].playback_count] = tracks[track];
		// }
        
		for (var track in tracks) {
			var elem = template.cloneNode(true);
			var trck = tracks[track];
			
			elem.classList.remove("template");
			
			if ( tracks[track].artwork_url == null ) {
			elem.querySelector(".track-artwork").src = tracks[track].user.avatar_url;
		   }
		   else {
			elem.querySelector(".track-artwork").src = tracks[track].artwork_url; 
		   }

			elem.querySelector(".track-title").innerHTML = tracks[track].title;
			elem.querySelector(".track-artist").innerHTML = tracks[track].user.username;
            
            
            elem.dataset["trackTitle"] = tracks[track].title;
            elem.dataset["streamURLclient"] = tracks[track].stream_url;
            elem.addEventListener("click", playAudio, false);
            
			results_node.appendChild(elem);
		}
					
	}, false);

	xhr.send();
}

document.getElementById("play").addEventListener('click', function() {audio_player.play();}, false);
document.getElementById("pause").addEventListener('click', function() {audio_player.pause();}, false);  
window.onload = function() {
		var pollSliderButton = document.querySelector('.pollSlider-button');
		pollSliderButton.classList.toggle('pollSlider');
}
$(document).ready(function(){
	$('.pollSlider-button').click(function() {$('.pollSlider').toggleClass('open');});
}); 


if (location.hash.length > 1) {
    var hash = location.hash.substr(1)
    var stream_url = unescape(hash);
    audio_player.src = stream_url + "?client_id=" + clientID;
    audio_player.play();
  
}
