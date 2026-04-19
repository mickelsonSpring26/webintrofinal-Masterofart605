import { GetFullList } from "./service.js";


let user = "";
let hideSidebar = "no";
let weaponList = "";
let customList = "";


export const GetCurrentUser = () => {
  return user;
};

export const SetCurrentUser = (newUsername) => {
  if (user !== "" && newUsername !== "") {
    console.log("Cannot switch users, please sign out");
    return false;
  }
  user = newUsername;
  return true;
};

export const ToggleSideBar = () => {
  if (hideSidebar === "no") {
    hideSidebar = "yes";
  } else {
    hideSidebar = "no";
  }
  return hideSidebar;
};
export const GetHideValue = () => {
  return hideSidebar;
};


export const GetWeaponList = async() =>{
  if(weaponList === ""){
    weaponList = await GetFullList();

  }
    return weaponList;
}
export const EditWeaponList = (newList) => {
  weaponList = newList;
}

export const GetCustomList = () =>{
  return customList;
}
export const EditCustomList = (newList) => {
  customList = newList;
}

export const AddToCustomList = (newElement) =>{
  customList = customList + newElement;
}