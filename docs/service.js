export const GetFullList = async () => {
  const responce = await fetch("http://localhost:5050/fullList");
  const data = await responce.json();
  return data;
};

export const GetRandom = async () => {
  const responce = await fetch("http://localhost:5050/random");
  const data = await responce.json();
  return data;
};

export const GetRandomKitless = async () => {
  const responce = await fetch("http://localhost:5050/randomKitless");
  const data = await responce.json();
  return data;
};

export const SendListData = async (data) =>{
  await fetch("http://localhost:5050/customList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
export const SendUsername = async (data) =>{
  await fetch("http://localhost:5050/name", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}