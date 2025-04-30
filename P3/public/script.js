document.addEventListener("keydown", function(event) {
	if (event.key === "Enter" && document.getElementById("userName")) {
    console.log("Enter key pressed");
		login();
  }
});

function login() {
	console.log("Click => ejecucion de login()");
	USERNAME = document.getElementById("userName").value;
	var xml = new XMLHttpRequest();
	xml.open("POST", "/login", true);
	xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xml.onreadystatechange = function() {
		if (xml.readyState== 4 && xml.status == 200) {
			// Script elements
			var scriptElement = document.createElement("script");
			scriptElement.setAttribute("type", "text/javascript");
			scriptElement.setAttribute("src", "user.js");
			document.head.appendChild(scriptElement);
			// CSS elements
			var linkElement = document.createElement("link");
			linkElement.setAttribute("rel", "stylesheet");
			linkElement.setAttribute("type", "text/css");
			linkElement.setAttribute("href", "user.css")
			document.head.appendChild(linkElement);

			document.body.innerHTML = xml.responseText;
			document.body.innerHTML = document.body.innerHTML.replace("<!--REPLACENAME-->", USERNAME)
		} else if (xml.readyState== 4 && xml.status == 404) {
			console.log("Error")
			document.getElementById("feedbackText").innerHTML =  ""
			document.getElementById("feedbackText").innerHTML =  "<p id='feedbackResponse' >" + xml.responseText + "</p>"
		}
	};
	xml.send(`userName=${USERNAME}`);
	// Delete script elements (script.js and styles.css)
	var script = document.getElementById("script");
	var styles = document.getElementById("styles");
	document.head.removeChild(script);
	document.head.removeChild(styles);
	
}
