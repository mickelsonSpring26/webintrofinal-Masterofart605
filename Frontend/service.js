export const GetFullList = async ()=>{
    const responce = await fetch("http://localhost:5050/fullList");
    const data = await responce.json();
    return data;
}
