import {
  GetCurrentUser,
  GetHideValue,
  SetCurrentUser,
  ToggleSideBar,
} from "./domain.js";
import { GetFullList, GetRandom, GetRandomKitless } from "./service.js";

const formElement = document.getElementById("generatorForm");
const nameElement = document.getElementById("nameInput");
const playerNumberElement = document.getElementById("playerInput");
const radioSectionElement = document.getElementById("radioSection");
const radioYesElement = document.getElementById("kitsYes");
const radioNoElement = document.getElementById("kitsNo");
const radioCustomYesElement = document.getElementById("customYes");
const radioCustomNoElement = document.getElementById("customNo");
const consoleElement = document.getElementById("falseConsole");
const signInSectionElement = document.getElementById("signInSection");
const hideElement = document.getElementById("hideButton");
const sideBarElement = document.getElementById("pageDescription");
const mainPageDetectorElement = document.getElementById("mainPage");

const renderMain = async () => {
  const miniDisplayElement = document.getElementById("singleDisplay");
  const currentUser = await GetCurrentUser();
  radioCustomNoElement.addEventListener("input", () => {
    radioSectionElement.classList.remove("hide");
  });
  radioCustomYesElement.addEventListener("input", () => {
    radioSectionElement.classList.add("hide");
  });

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

    let customResponce = "";
    if (radioCustomYesElement.checked === true) {
      customResponce = "yes";
    } else if (radioCustomNoElement.checked === true) {
      customResponce = "no";
    } else {
      customResponce = "This should not be happening";
    }

    const fullResponce = {
      number: playerNumberElement.value,
      kit: kitResponce,
      custom: customResponce,
    };
    consoleElement.replaceChildren();
    let returnedValue = "";
    for (let index = 0; index < playerNumberElement.value; index++) {
      if (fullResponce.kit === "no") {
        if(fullResponce.custom === yes){
          
        }else{
          returnedValue = await GetRandomKitless();
          displayConsleElement(returnedValue, index + 1);
        }
      } else {
        returnedValue = await GetRandom();
        displayConsleElement(returnedValue, index + 1);
      }
      if (index === 0) {
        const displayImage = document.createElement("img");
        displayImage.src = "https://placehold.co/50x50";
        const nameBoxElement = document.createElement("h1");
        nameBoxElement.textContent = returnedValue.name;
        const subElement = document.createElement("h3");
        subElement.textContent = returnedValue.sub;
        const specialElement = document.createElement("h3");
        specialElement.textContent = returnedValue.special;
        const classElement = document.createElement("h3");
        classElement.textContent = returnedValue.class;
        miniDisplayElement.replaceChildren();
        miniDisplayElement.appendChild(displayImage);
        miniDisplayElement.appendChild(nameBoxElement);
        miniDisplayElement.appendChild(subElement);
        miniDisplayElement.appendChild(specialElement);
        miniDisplayElement.appendChild(classElement);
      }
    }
  });
};

hideElement.addEventListener("click", () => {
  ToggleSideBar();
  console.log(GetHideValue());
  userToQueryString();
  renderLogin();
});

const userToQueryString = () => {
  const user = GetCurrentUser();
  localStorage.setItem("name", user);
  const hideBar = GetHideValue();
  localStorage.setItem("hide", hideBar);
};
const logInFromQueryString = () => {
  const currentUser = localStorage.getItem("name") ?? "";
  SetCurrentUser(currentUser);
  const shouldHide = localStorage.getItem("hide") ?? "";
  if (shouldHide === "yes") {
    ToggleSideBar();
  }
};

const renderLoginForm = () => {
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
  if (!user) {
    renderLoginForm();
  } else {
    renderLoginComplete();
  }
  const titleElement = document.getElementById("title");
  const descriptionElement = document.getElementById("description");
  const growElement = document.getElementById("grow");
  if (GetHideValue() === "yes") {
    signInSectionElement.classList.add("hide");
    titleElement.classList.add("hide");
    descriptionElement.classList.add("hide");
    growElement.classList.remove("hide");
    sideBarElement.classList.add("small");
    hideElement.textContent = ">";
  } else {
    signInSectionElement.classList.remove("hide");
    titleElement.classList.remove("hide");
    descriptionElement.classList.remove("hide");
    growElement.classList.add("hide");
    sideBarElement.classList.remove("small");
    hideElement.textContent = "<";
  }
};

const displayConsleElement = (input, number) => {
  const nameElement = document.createElement("p");
  nameElement.textContent = "Player " + number + ": " + input.name;
  consoleElement.appendChild(nameElement);
};

logInFromQueryString();
renderLogin();
if (mainPageDetectorElement !== null) {
  renderMain();
}
