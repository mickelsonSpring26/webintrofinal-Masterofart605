import { AddToCustomList, EditWeaponList, GetCustomList, GetWeaponList} from "./domain.js";
import { GetFullList } from "./service.js";

const mainContentElement = document.getElementById("pageContent");
const tableElement = document.createElement("article");
const createPageDetectorElement = document.getElementById("create");

const createPage = async() => {
  tableElement.classList.add("table");
  tableElement.textContent = "";
  let list = await GetWeaponList();
  console.log(list)
  const searchFormElement = document.createElement("form");
  const inputLabelElement = document.createElement("label");
  const searchBarElement = document.createElement("input");
  searchBarElement.type = "text";
  searchBarElement.id = "filterBar";
  inputLabelElement.for = "searchBox";
  inputLabelElement.textContent = "Filter list by what ever you want!";
  searchFormElement.classList.add("searchBox");
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
        //   ||weapon.Sub.toLowerCase().includes(filter)||weapon.Special.toLowerCase().includes(filter)
      );
    });
    renderList(newList);
  });

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
    const newTableElement = document.createElement("article");
    newTableElement.id = "customListElement"
    newTableElement.classList.add("table");
    newTableElement.textContent = "";
    mainTableDiv.appendChild(newTableElement);
    addDropabble(newTableElement,list);



    if (GetCustomList() !== ""){
      renderList(GetCustomList());
    }
  }
  mainContentElement.appendChild(mainTableDiv);
  //   mainContentElement.appendChild(tableElement);
};

const renderList = (inputList) => {
  tableElement.replaceChildren();
  let id = 1;
  inputList.forEach((weapon) => {
    const newRow = createRow(weapon, id);
    tableElement.appendChild(newRow);
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

const addDropabble = (listElement,list) => {
  listElement.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  listElement.addEventListener("dragenter", (event) => {
    event.preventDefault();
  });
  listElement.addEventListener("drop", async (e) => {
    const id = e.dataTransfer.getData(`text/plain`);
    console.log("moved id: ", id);
    const weaponList = await GetWeaponList();
    console.log(weaponList[id-1]);
    if(listElement.id = "customListElement"){
      listElement.appendChild(createRow(weaponList[id-1],id))
      const tempList = await GetWeaponList()
      let newList = tempList.filter((element)=>{
        return element.name !== weaponList[id-1].name;
      })
      EditWeaponList(newList);
      renderList(await GetWeaponList());
    }
  })
};



createPage();
