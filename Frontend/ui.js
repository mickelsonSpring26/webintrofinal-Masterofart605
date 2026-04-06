import { GetCurrentUser, SetCurrentUser } from "./domain.js";
import { GetFullList } from "./service.js";

const formElement = document.getElementById("generatorForm");
const nameElement = document.getElementById("nameInput");
const playerNumberElement = document.getElementById("playerInput");
const radioSectionElement = document.getElementById("radioSection");
const radioYesElement = document.getElementById("kitsYes");
const radioNoElement = document.getElementById("kitsNo");

formElement.addEventListener("submit", async (e) => {
  e.preventDefault();
  let kitResponce = "";
  if (radioYesElement.checked === true) {
    kitResponce = "yes";
  } else if (radioNoElement.checked === true) {
    kitResponce = "no";
  } else {
    kitResponce = "This should not be happening";
  }

  const fullResponce = {
    name: nameElement.value,
    number: playerNumberElement.value,
    kit: kitResponce,
  };
  console.log(fullResponce);

  console.log(await GetFullList());
});

const userToQueryString = () =>{
    const user = GetCurrentUser();
    localStorage.setItem("name", user)
}
const logInFromQueryString = () =>{
    const currentUser = localStorage.getItem("name")?? ""
    SetCurrentUser(currentUser);
}

const renderLoginForm = () => {
  const signInSectionElement = document.getElementById("signInSection");
  const signInFormElement = document.createElement("form");
  signInFormElement.id = "signInForm";
  const userLabelElement = document.createElement("label");
  userLabelElement.htmlFor = "userName";
  userLabelElement.textContent = "Sign in here";
  const userInputElement = document.createElement("input");
  userInputElement.type = "text";
  userInputElement.id = "userName";
  userInputElement.name = "userName";
  const submitElement = document.createElement("input");
  submitElement.type = "submit";
  submitElement.textContent = "submit";
  submitElement.id = "submitButton";

  signInFormElement.addEventListener("submit", (e) => {
    e.preventDefault();
    SetCurrentUser(userInputElement.value);
    userToQueryString();
    renderLogin();
  });

  signInSectionElement.replaceChildren();
  signInSectionElement.appendChild(signInFormElement);
  signInFormElement.appendChild(userLabelElement);
  signInFormElement.appendChild(userInputElement);
  signInFormElement.appendChild(submitElement);
};

const renderLoginComplete = () => {
    const userName = GetCurrentUser();
  const signInSectionElement = document.getElementById("signInSection");

  const signInFormElement = document.createElement("form");
  signInFormElement.id = "signInForm";

  const replyElement = document.createElement("p");

  const submitElement = document.createElement("input");
  submitElement.type = "submit";
  submitElement.value = "Sign Out";
  submitElement.id = "submitButton";

  signInFormElement.addEventListener("submit", (e) => {
    e.preventDefault();
    SetCurrentUser("");
    userToQueryString();
    renderLogin();
  });

  replyElement.textContent = "Welcome " + userName + "!";
  signInSectionElement.replaceChildren();
  signInSectionElement.appendChild(signInFormElement);
  signInFormElement.appendChild(replyElement);
  signInFormElement.appendChild(submitElement);
};

const renderLogin = () => {
    const user = GetCurrentUser();
    if (!user){
        renderLoginForm();
    }else{
        renderLoginComplete();
    }
};

logInFromQueryString();
renderLogin();
