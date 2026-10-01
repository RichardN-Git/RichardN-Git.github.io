(function() {
    var savedStyle = localStorage.getItem("preferredStyle");
    var styleElement = document.getElementById("mainStyleSheet");
    
    // Apply the saved style immediately
    if (savedStyle === "style1.css" || savedStyle === "style2.css") {
        styleElement.setAttribute("href", savedStyle);
    }
    // else keep the default style1.css
})();

var num = 0; // global variable

function button1() {
    num++;
    document.getElementById("output").innerHTML = "Press x " + num;
}

function toggleStyleSheet(){
    // Task 1
    // Steps
    // 1 (a) Get style element by ID (hint: getElementById)
    var styleElement = document.getElementById("mainStyleSheet");
    
    // 1 (b) Check the current stylesheet file name. (hint: element.getAttribute)
    var currentStyle = styleElement.getAttribute("href");
   
    // 1 (c) Determine new stylesheet file name
    var newStyle;
    if (currentStyle.includes("style1.css")) {
        newStyle = "style2.css";
        animateTransition(currentStyle, newStyle, "style1-to-style2");
    } else {
        newStyle = "style1.css";
        animateTransition(currentStyle, newStyle, "style2-to-style1");
    }
   

    // 1 (d) replace stylesheet with new stylesheet (hint: element.setAttribute)
    styleElement.setAttribute("href", newStyle);


    // TASK 2
    // 2 (d) For persistence when page is refreshed. save new stylesheet name to localStorage
    // hint: localStorage.setItem(name, value)
    localStorage.setItem("preferredStyle", newStyle);
  
}
// Added this in after seeing an example online, pretty cool
function animateTransition(currentStyle, newStyle, transitionType) {
    // The overlay
    var overlay = document.createElement("div");
    overlay.className = "transition-overlay " + transitionType;
    document.body.appendChild(overlay);
    
    // Force to make sure that NO MATTER WHAT the animation plays
    overlay.offsetHeight;
    // Start transition
    overlay.classList.add("active");
    // After transition completes, then may I let the change stylesheet
    setTimeout(function() {
        var styleElement = document.getElementById("mainStyleSheet");
        styleElement.setAttribute("href", newStyle);
        localStorage.setItem("preferredStyle", newStyle);
        // Wait for new styles to load, then fade out overlay
        setTimeout(function() {
            overlay.classList.add("fade-out");
            // Remove overlay after fade completes since it is not needed anymore whatsoever
            setTimeout(function() {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 500);
        }, 50); // Small delay as a gurantee
    }, 500); // Another wait for animation itself
}

window.onload = function(){
    // TASK 2
    // TODO: Make the last div color persist even when someone refreshes the page.

    // Steps
    // 2 (a) get stylesheet name from local storage hint: localStorage.getItem(name)
    var savedStyle = localStorage.getItem("preferredStyle");
    // 2 (b) get html style element by ID
    var styleElement = document.getElementById("mainStyleSheet");
    // 2 (c) replace href attribute of html element.
    // Took me way too long to realize I needed to fix this 
    if (savedStyle === "style1.css" || savedStyle === "style2.css") {
        styleElement.setAttribute("href", savedStyle);
    } else {
        styleElement.setAttribute("href", "style1.css");
    }

}

