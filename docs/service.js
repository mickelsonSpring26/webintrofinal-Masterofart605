const baseUrl = `http://localhost:5050`;
// const baseUrl = `https://webintrofinal-masterofart605.onrender.com`

export const GetFullList = async () => {
  const responce = await fetch(`${baseUrl}/fullList`);
  const data = await responce.json();
  return data;
};

export const GetRandom = async () => {
  const responce = await fetch(`${baseUrl}/random`);
  const data = await responce.json();
  return data;
};

export const GetRandomKitless = async () => {
  const responce = await fetch(`${baseUrl}/randomKitless`);
  const data = await responce.json();
  return data;
};

export const SendListData = async (data) =>{
  await fetch(`${baseUrl}/customList`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
export const SendUsername = async (input) =>{
  console.log(input)
  await fetch(`${baseUrl}/name`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
}
