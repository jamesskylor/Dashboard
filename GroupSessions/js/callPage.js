document.getElementById("exitCall").addEventListener("click", (e)=>{
    leaveCall();
});

var togglableButtons = document.getElementsByClassName("toggle");

Array.from(togglableButtons).forEach((e)=>{
    e.addEventListener('click', (el)=>{
        // Find which type of toggle it is
        if(el.target.id == "screen_share" || el.target.id == "stop_screen_share") {
            toggleScreen(el.target.id);
        }
        else {
            toggleButton(el.target.id);
        }
    });
});

function leaveCall(){
    // Possibly some sort of code procedure before leaving the page
    location.assign("groupSessions.html");
}

function toggleScreen(id) {
    if(id.includes("stop_")){
        document.getElementById(id).innerHTML = id.replace("stop_", "");
        document.getElementById(id).id = id.replace("stop_", "");
        if(document.getElementById("videocam") !== null) {
            toggleButton("videocam");
        }
        // Call more complex functions to do actual task
    }
    else {
        document.getElementById(id).innerHTML = "stop_"+id;
        document.getElementById(id).id = "stop_"+id;
        // Call more complex functions to do actual task
    }
}



function toggleButton(id) {
    if(id.includes("_off")) {
        document.getElementById(id).innerHTML = id.replace("_off", "");
        document.getElementById(id).id = id.replace("_off", "");
        console.log("I've turned this damn thig on");
        console.log(id);
        if(id.includes("videocam")) {
            console.log("i recognize this as a videocam");
            if(document.getElementById("screen_share") !== null) {
                console.log("Does it get here?");
                toggleScreen("screen_share");
            }
            // Call more complex functions to do actual task
        }
        else if(id.includes("mic")) {
            // Call more complex functions to do actual task
        }
        else {
            // Call more complex functions to do actual task
        }
    }
    else {
        document.getElementById(id).innerHTML = id+"_off";
        document.getElementById(id).id = id+"_off";
        console.log(id);
        if(id.includes("videocam")) {
            // Call more complex functions to do actual task
        }
        else if(id.include("mic")) {
            // Call more complex functions to do actual task
        }
        else {
            // Call more complex functions to do actual task
        }
    }
}



function openChat(){
    // Possible feature in the future, not sure if enough time
}