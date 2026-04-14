var user = "";
var hideSidebar = "no";

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
