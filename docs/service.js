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
