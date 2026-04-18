const add = function(a, b) {
    return a + b
};

const subtract = function(a, b) {
    return a - b
};

const multiply = function(a, b) {
    return a * b
};

const divide = function(a, b) {
    if (b === 0){
        alert("You must not divide by 0 ! 😊");
        return "Division by 0 error";
    }
    return a / b;
};

const exponent = function(base, exponent) {
    return base ** exponent
};

function operate(a, b, operator){
    let res = 0;
    if (operator === "+" ){
        res = add(a,b)
    }
    else if (operator === "-"){
        res = subtract(a, b)
    }
    else if (operator === "*"){
        res = multiply(a, b)
    }
    else if (operator ==="/"){
        res = divide(a, b)
    }
    else if (operator === "**"){
        res = exponent(a, b)
    }
    else{
        return "";
    }
    return typeof(res) === "string" ? res : Math.round(res * 100)/100;
};
//console.log(operate(8,0,"/"));

let firstNumber = "";
let secondNumber = "";
let operator = "";
let resultDisplayed = false;

const padDiv = document.querySelector(".padDiv");
const screen = document.querySelector(".screen");
const screenText = document.createElement("div");

screenText.style.backgroundColor = "gainsboro";
screenText.style.fontSize = "60px" ;
screenText.style.boxSizing = "border-box";

padDiv.addEventListener("click",(e) => {

    if (resultDisplayed === true){
        /* */
        if (e.target.dataset.type === "operator"){
            operator = e.target.dataset.value;
        }
        else if (e.target.dataset.type === "decimal"){
            firstNumber = "0."
        }
        else{
            firstNumber = e.target.dataset.value;
        }
        resultDisplayed = false;
    }
    else{

    if(e.target.dataset.type === "number" && operator === ""){
        firstNumber += e.target.dataset.value;
        console.log("first "+firstNumber+ " "+ firstNumber.slice(0,-1));
    }
    else if (e.target.dataset.type === "operator"){

        if ((e.target.dataset.value !== "-") && firstNumber === ""){
           return;
       }
       else if ((e.target.dataset.value === "-") && firstNumber === ""){
        firstNumber = "-";
        return;
       }



        if (secondNumber !== ""){
            let resultat = operate(+firstNumber, +secondNumber, operator);
            firstNumber = String(resultat);
            secondNumber ="";
        }
        operator = e.target.dataset.value;

    }
    else if (e.target.dataset.type === "number"){
        secondNumber += e.target.dataset.value;

    }
    else if (e.target.dataset.type === "decimal" && operator === "" && !firstNumber.includes(".") && firstNumber !== ""){
        firstNumber += ".";

    }
    else if (e.target.dataset.type === "decimal" && !secondNumber.includes(".") && secondNumber !== ""){
        secondNumber += ".";

    }
};

    screenText.textContent = firstNumber + operator + secondNumber;

});

const equalDiv = document.querySelector(".equalDiv");
equalDiv.addEventListener( "click", () => {

    if (secondNumber === "" || operator === ""){

        return;
    }

    let resultat = operate (+firstNumber, +secondNumber, operator);
    if (resultat === "Division by 0 error"){
        firstNumber = "";
        operator = "";
        secondNumber = "";
        screenText.textContent = "";
        return;
    }
    screenText.textContent = resultat;
    firstNumber = String(resultat);
    operator = ""
    secondNumber ="";
    resultDisplayed = true;
});


const deleteButton = document.querySelector(".deleteButton");
deleteButton.addEventListener(  "click", () => {

    if (secondNumber !== ""){
        secondNumber = secondNumber.slice(0, secondNumber.length - 1);
    }
    else if( operator !== ""){
        operator = "";
    }
    else if (firstNumber !== ""){
        firstNumber = firstNumber.slice(0, firstNumber.length - 1);
    };

    screenText.textContent = firstNumber + operator + secondNumber;

});




const clearButton = document.querySelector(".clearButton");
clearButton.addEventListener("click", () => {
    firstNumber = "";
    secondNumber = "";
    operator = "";

    screenText.textContent = firstNumber + operator + secondNumber;

})

document.addEventListener("keydown", e => {
    const btn = document.querySelector(`[data-value="${e.key}"]`);
    if (btn) {
        btn.click();
        btn.classList.add("pressed");
        setTimeout(() => btn.classList.remove("pressed"), 100);
    };


    if (e.key === "Backspace") deleteButton.click();
    if (e.key === "Enter") equalDiv.click();


})


screen.appendChild(screenText);
