// use query selector when getting a class
const btn = document.querySelector(".get-quotes");
btn.addEventListener("click", getQuotes);


function getQuotes(e) {
    e.preventDefault();
    const number = +document.getElementById("number").value;

    
    if (number == 0) {
        return alert("Please enter a number");
    }
    else {
        const https = new XMLHttpRequest();
    
        https.open("GET", "https://type.fit/api/quotes", true);
    
        https.onload = function() {
            if (this.status === 200) {
                // console.log(this.responseText);
                // console.log(number);
    
                const response = JSON.parse(this.responseText);
                let output = "";
                usedArray = [];
                // response.forEach(function(quote) {
                    // })
                    for(let i=0; i< Math.min(response.length, number); i++) {
                        arrayNumber = Math.floor(Math.random() * response.length);
                        function usedArrayLoop() {
                            for(let a =0; a<usedArray.length; a++){
                                if (usedArray[a] === arrayNumber) {
                                    return false;
                                }
                            }
                            return true;
                        }
                        if (usedArrayLoop()){
                            usedArray.push(arrayNumber);
                            output += `
                            <li>Quote: ${response[arrayNumber].text} </li>
                            <li>Author: ${response[arrayNumber].author} </li>
                            <hr>`;
                        }
                        else {
                            i--;
                        }
                    }
    
                document.querySelector(".quotes").innerHTML = output;
                
            }
        }
    
        https.send();
    }
}
