// Global
var audio_player = document.getElementById("player");
var clientID = "1dff55bf515582dc759594dac5ba46e9";
var template = document.querySelector("#results .template").cloneNode(true);

function audioResults() {
	var search = document.getElementById("search").value;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', "https://api.soundcloud.com/tracks?client_id=" + clientID + "&q=" + search, false);

	xhr.addEventListener("load", xhr_load_handler, false);

	xhr.send();
}	

function xhr_load_handler() {
	var tracks = JSON.parse(this.response);
	console.log(tracks);
	
	var results_node = document.getElementById("results");
    results_node.innerHTML = "";
		
	for(track in tracks) {
	
		
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
			
	elem.dataset["trackArtWork"] = tracks[track].artwork_url;
    elem.dataset["trackTitle"] = tracks[track].title;
    elem.dataset["streamURLclient"] = tracks[track].stream_url;
    elem.addEventListener("click", playAudio, false);
			
	elem.addEventListener("click", playAudio, false);
	elem.addEventListener("click", playList, false);
            
	results_node.appendChild(elem);
			
	}
		
}

// Upon user click event their audio selection starts playing via this function
function playAudio() {
    var stream_url = this.dataset["streamURLclient"];
	var share_url = "http://ryanspahn.com/mubiquity/#" + escape(stream_url);
	
    audio_player.src = stream_url + "?client_id=" + clientID;
	audio_player.play();
 
	document.getElementById("nowPlaying").innerHTML = this.dataset["trackTitle"];
    document.getElementById("shareLink").innerHTML = share_url;
}

function playList() {

	document.getElementById("PlaylistAdd").innerHTML = '<a href="#" onclick="addPlaylist()">' + "Add to Playlist" + '</a>';

}

function addPlaylist() {
		document.getElementById("playList").innerHTML = this.dataset["trackTitle"];
	}
			
// Global - Actual code that makes the play and pause buttons function.  Also, executes the share module pop up from bottom right
document.getElementById("play").addEventListener('click', function() {audio_player.play();}, false);
document.getElementById("pause").addEventListener('click', function() {audio_player.pause();}, false);  
$(document).ready(function(){
	$('.pollSlider-button').click(function() {$('.pollSlider').toggleClass('open');});
}); 

//  Says: If there is a hashtag in the URL on page load then start playing track user shared w/friend
if (location.hash.length > 1) {
    var hash = location.hash.substr(1)
    var stream_url = unescape(hash);
    audio_player.src = stream_url + "?client_id=" + clientID;
    audio_player.play();
}

