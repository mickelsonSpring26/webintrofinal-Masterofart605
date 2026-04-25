import {
  AddToCustomList,
  EditCustomList,
  EditFilteredWeaponList,
  EditWeaponList,
  GetCurrentUser,
  GetCustomList,
  GetFilteredWeaponList,
  GetWeaponList,
} from "./domain.js";
import {
  fetchListData,
  GetFullList,
  SendListData,
  SendUsername,
} from "./service.js";

const mainContentElement = document.getElementById("pageContent");
const tableElement = document.createElement("article");
tableElement.id = "mainTable";
const createPageDetectorElement = document.getElementById("create");
const newTableElement = document.createElement("article");

const createPage = async () => {
  const currentUser = { user: await GetCurrentUser() };
  if (currentUser !== "") {
    SendUsername(currentUser);
  }

  tableElement.classList.add("table");
  tableElement.textContent = "";
  let list = await GetWeaponList();
  console.log(list);
  const searchFormElement = document.createElement("form");
  const inputLabelElement = document.createElement("label");
  const searchBarElement = document.createElement("input");
  searchBarElement.type = "text";
  searchBarElement.id = "filterBar";
  inputLabelElement.for = "searchBox";
  inputLabelElement.textContent = "Filter by Anything";
  searchFormElement.classList.add("searchBox");

  //Get custom list if it exists
  if (createPageDetectorElement != null) {
    if (currentUser !== "") {
      console.log(await fetchListData());
      const fetchData = await fetchListData();
      EditCustomList(fetchData);
    }
  }

  let filter = "";
  let newList = await list;
  searchBarElement.addEventListener("input", async (e) => {
    filter = searchBarElement.value.toLowerCase();
    list = await GetWeaponList();
    newList = list.filter((weapon) => {
      return (
        weapon.class.toLowerCase().includes(filter) ||
        weapon.reKit.toLowerCase().includes(filter) ||
        weapon.name.toLowerCase().includes(filter)
        // ||weapon.Sub.toLowerCase().includes(filter)
        // ||weapon.Special.toLowerCase().includes(filter)
      );
    });
    if (createPageDetectorElement != null) {
      newList = filterFromCustom(newList);
    }
    EditFilteredWeaponList(newList);
    // console.log(await GetFilteredWeaponList())
    renderList(newList);
  });

  //Filter stuff already in custom list.
  if (createPageDetectorElement != null) {
    newList = filterFromCustom(newList);
    EditFilteredWeaponList(newList);
  }

  searchFormElement.appendChild(inputLabelElement);
  searchFormElement.appendChild(searchBarElement);
  mainContentElement.appendChild(searchFormElement);
  if (filter === "") {
    renderList(newList);
  }
  const mainTableDiv = document.createElement("div");
  mainTableDiv.classList.add("tablesContainer");
  mainTableDiv.appendChild(tableElement);
  if (createPageDetectorElement != null) {
    newTableElement.id = "customListElement";
    newTableElement.classList.add("table");
    newTableElement.textContent = "";
    mainTableDiv.appendChild(newTableElement);
    addDropabble(newTableElement, list);
    addDropabble(tableElement);

    if (GetCustomList() !== "") {
      renderCustomList(GetCustomList());
    }
    const submitElement = document.createElement("button");
    submitElement.type = "submit";
    submitElement.textContent = "Save List";
    submitElement.id = "submitCustom";
    submitElement.classList.add("customButton");
    submitElement.addEventListener("click", async (e) => {
      e.preventDefault();
      const username = { user: await GetCurrentUser() };
      SendUsername(username);
      SendListData(await GetCustomList());
    });
    searchFormElement.appendChild(submitElement);
  }
  mainContentElement.appendChild(mainTableDiv);
  //   mainContentElement.appendChild(tableElement);
};

const renderList = (inputList, isCustom) => {
  tableElement.replaceChildren();
  if (createPageDetectorElement === null) {
    const titleRow = createRow({ name: "Weapon Name",reKit:"Is it a Rekit?",sub:"Sub Weapon",special:"Speacial Weapon",class:"Weapon Class" });
    tableElement.appendChild(titleRow);
  }
  let id = 1;
  inputList.forEach((weapon) => {
    const newRow = createRow(weapon, id);
    tableElement.appendChild(newRow);
    id++;
  });
};

const filterFromCustom = (newList) => {
  const filterList = GetCustomList();
  filterList.forEach((element) => {
    newList = newList.filter((weapon) => {
      if (weapon.name.toLowerCase() === element.name.toLowerCase()) {
        return false;
      } else {
        return true;
      }
    });
  });
  return newList;
};

const renderCustomList = (inputList, isCustom) => {
  newTableElement.replaceChildren();
  let id = 1;
  inputList.forEach((weapon) => {
    const newRow = createRow(weapon, id);
    newTableElement.appendChild(newRow);
    id++;
  });
};

const createRow = (weapon, id) => {
  const myId = id;
  const rowElement = document.createElement("section");
  rowElement.classList.add("row");
  const name = document.createElement("p");
  name.textContent = weapon.name;
  const kit = document.createElement("p");
  kit.textContent = weapon.reKit;
  const sub = document.createElement("p");
  sub.textContent = weapon.sub;
  const special = document.createElement("p");
  special.textContent = weapon.special;
  const type = document.createElement("p");
  type.textContent = weapon.class;

  if (createPageDetectorElement != null) {
    kit.classList.add("hide");
    sub.classList.add("hide");
    special.classList.add("hide");
    type.classList.add("hide");
  }
  rowElement.appendChild(name);
  rowElement.appendChild(kit);
  rowElement.appendChild(sub);
  rowElement.appendChild(special);
  rowElement.appendChild(type);
  rowElement.draggable = true;
  rowElement.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData(`text/plain`, myId);
  });
  return rowElement;
};

const addDropabble = (listElement, list) => {
  listElement.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  listElement.addEventListener("dragenter", (event) => {
    event.preventDefault();
  });
  listElement.addEventListener("drop", async (e) => {
    const id = e.dataTransfer.getData(`text/plain`);
    // console.log("moved id: ", id);
    const weaponList = await GetFilteredWeaponList();
    // console.log(weaponList[id - 1]);

    if (listElement.id == "customListElement") {
      listElement.appendChild(
        createRow(weaponList[id - 1], listElement.childElementCount + 1),
      );
      console.log(listElement.childElementCount);
      const weaponName = weaponList[id - 1].name;
      let tempCustom = await GetCustomList();
      if (tempCustom !== "") {
        tempCustom.push(weaponList[id - 1]);
      } else {
        tempCustom = [];
        tempCustom.push(weaponList[id - 1]);
      }
      EditCustomList(tempCustom);
      console.log(await GetCustomList());

      const tempList = await GetFilteredWeaponList();
      let newList = tempList.filter((element) => {
        return element.name !== weaponList[id - 1].name;
      });
      EditFilteredWeaponList(newList);
      renderList(await GetFilteredWeaponList());
    }

    const weaponListCustom = await GetCustomList();

    if (listElement.id == "mainTable") {
      listElement.appendChild(
        createRow(weaponListCustom[id - 1], listElement.childElementCount + 1),
      );
      const weaponName = weaponListCustom[id - 1].name;
      let tempCustom = await GetFilteredWeaponList();
      if (tempCustom !== "") {
        tempCustom.push(weaponListCustom[id - 1]);
      } else {
        tempCustom = [];
        tempCustom.push(weaponListCustom[id - 1]);
      }
      EditFilteredWeaponList(tempCustom);
      // console.log(await GetFilteredWeaponList());

      const tempList = await GetCustomList();
      let newList = tempList.filter((element) => {
        return element.name !== weaponListCustom[id - 1].name;
      });
      EditCustomList(newList);
      renderCustomList(await GetCustomList());
    }
  });
};

createPage();
