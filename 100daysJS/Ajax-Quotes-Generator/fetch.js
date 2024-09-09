const btn = document.querySelector(".get-quotes");
btn.addEventListener("click", getQuotes);


function getQuotes(e) {
    e.preventDefault();
    const number = +document.getElementById("number").value;

    if (number == 0) {
        return alert("Please enter a number");
    }
    else {
        fetch("https://type.fit/api/quotes")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            // console.log(JSON.stringify(data));
            let output = "";
            usedArray = [];
            for(let i=0; i< Math.min(data.length, number); i++) {
                arrayNumber = Math.floor(Math.random() * data.length);
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
                    <li>Quote: ${data[arrayNumber].text} </li>
                    <li>Author: ${data[arrayNumber].author} </li>
                    <hr>`;
                }
                else {
                    i--;
                }
            }
            document.querySelector(".quotes").innerHTML = output;
        })
    }
}