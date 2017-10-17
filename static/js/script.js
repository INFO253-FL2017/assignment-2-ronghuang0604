// Contact
function callback() {
	missing = findMissing();
	var pop = document.getElementById('pop');
	if (pop.hidden) {
        pop.hidden = false;
    }
	if (missing == '') {
		pop.style.color = "black";
        pop.innerHTML = "Your message has been sent";
		// var xhttp = new XMLHttpRequest();
        // xhttp.onreadystatechange = function() {
        //     if (this.readyState == 4 && this.status == 204) {
        //         pop.style.color = "green";
        //         pop.innerHTML = "Hi " + first + ", your message has been sent";
        //     }
        // };
        // xhttp.open("POST", "/f", true);
        // xhttp.send('{"name":"' + first + '","email":"' + email + '","subject":"' + subject + '","msg":"' + message + '"}')
	}else {
		pop.style.color = "red";
        pop.innerHTML = "Fields " + missing.substr(0, missing.length-1) + " need to be filled out";
	}
}

function findMissing() {
	var missing = '';
	if (document.getElementById('input-name').value == '') {
		missing += "Name,";
	}
	if (document.getElementById('input-email').value == '') {
		missing += "Email,";
	}
	if (document.getElementById('input-subject').value == '') {
		missing += "Subject,";
	}
	if (document.getElementById('input-message').value == '') {
		missing += "Message,";
	}
	return missing;
}


//====================================================================
// Comment
var chart = document.getElementById('old-posts');
var title = localStorage.getItem("current");
var comments = [];

function comment() {
	var user = document.getElementById('input-name').value;
	var msg = document.getElementById('input-message').value;
	// insert user and msg
	var post_name = document.createElement('div');
	post_name.innerHTML = " | " + user;
	post_name.className += 'comment-name';
	var post_comment = document.createElement('div');
	post_comment.innerHTML = msg;
	post_comment.className += 'comment-post';
	chart.appendChild(post_comment);
	chart.appendChild(post_name);
	chart.appendChild(document.createElement('hr'));
	parent.postMessage("resize","*");

	comments.push({name:user, comment: msg});
	localStorage.setItem(title, JSON.stringify(comments));
	document.getElementById('input-name').value = '';
	document.getElementById('input-message').value = '';

	// restore
	var storage = localStorage.getItem(title);
	if (storage != null) {
		var old_comments = JSON.parse(storage);
		for (var i = 0; i < old_comments.length; i++) {
			var n = old_comments[i].name;
			var c = old_comments[i].comment;
			insert(n, c);
			comments.push({name:n, comment: c});
		}
	}
}
