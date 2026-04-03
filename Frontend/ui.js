import {} from "./domain.js";

const formElement = document.getElementById("generatorForm");
const nameElement = document.getElementById("nameInput");
const playerNumberElement = document.getElementById("playerInput")
const radioSectionElement = document.getElementById("radioSection")
const radioYesElement = document.getElementById("kitsYes")
const radioNoElement = document.getElementById("kitsNo")

formElement.addEventListener("submit",(e)=>{
    e.preventDefault();
    let kitResponce = ""
    if (radioYesElement.checked === true){
        kitResponce = "yes"
    }else if(radioNoElement.checked === true){
        kitResponce = "no"
    }else{
        kitResponce = "This should not be happening"
    }
    
    const fullResponce = {name:nameElement.value,number:playerNumberElement.value,kit:kitResponce}
    console.log(fullResponce)

})