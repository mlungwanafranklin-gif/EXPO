```javascript
function enterMuseum(){

    const name = document.getElementById("nameInput").value.trim();

    if(name === ""){
        alert("Please enter your name first.");
        return;
    }

    document.getElementById("personalGreeting").textContent =
        "Welcome, " + name + ".";

    document.getElementById("welcomeBox").style.display = "block";
}

function startTour(){
    window.location.href = "index.html";
}
```

