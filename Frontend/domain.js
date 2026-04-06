var user = "";

export const GetCurrentUser = () =>{
    return user
}

export const SetCurrentUser = (newUsername) =>{
    if (user !== "" && newUsername !== ""){
        console.log("Cannot switch users, please sign out")
    return false;
    }
    user = newUsername;
    return true;
}