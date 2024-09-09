const image= document.getElementById("image");
const statusDisplay = document.getElementById("status");
const bgColor = document.getElementById("main");

function setColor() {
    bgColor.classList.add("online");
}

async function connectionStatus() {
    try {
        const fetchResult = await fetch('https://upload.wikimedia.org/wikipedia/en/thumb/7/7d/Lenna_%28test_image%29.png/440px-Lenna_%28test_image%29.png?time=' + (new Date()).getTime());
        image.src = "./images/online.png",
        setColor();
        return fetchResult.status >= 200 && fetchResult.status < 300;
    }

    catch (error) {
        // console.log(error);
        statusDisplay.textContent = "oops your internet connection is down";
        image.src = "./images/offline.png",
        bgColor.classList.remove("online");
    }
}

//Moniter the connection
setInterval(async () => {
    const result = await connectionStatus();
    if (result) {
        statusDisplay.textContent = "You are ONLINE, connection looks good!";
        setColor();
    }
}, 5000);

//check connection when the page loads
window.addEventListener("load", (event) => {
    if (connectionStatus()) {
        statusDisplay.textContent = "You are ONLINE";
    }
    else {
        statusDisplay.textContent = "You are OFFLINE";
    }
})
