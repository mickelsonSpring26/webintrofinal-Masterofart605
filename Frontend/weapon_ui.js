import { GetFullList } from "./service.js";

const mainContentElement = document.getElementById("pageContent");


const createPage = async() =>{
    const tableElement = document.createElement("article");
    tableElement.classList.add("table");
    tableElement.textContent = ""
    const list = await GetFullList()
    console.log(list)
    
    list.forEach(weapon => {
        const rowElement = document.createElement("section")
        rowElement.classList.add("row")
        const name = document.createElement("p")
        name.textContent = weapon.name
        const kit = document.createElement("p")
        kit.textContent = weapon.reKit
        const sub = document.createElement("p")
        sub.textContent = weapon.sub
        const special = document.createElement("p")
        special.textContent = weapon.special
        const type = document.createElement("p")
        type.textContent = weapon.class


        rowElement.appendChild(name)
rowElement.appendChild(kit)
rowElement.appendChild(sub)
rowElement.appendChild(special)
        rowElement.appendChild(type)
        tableElement.appendChild(rowElement);
    });

    mainContentElement.appendChild(tableElement);
}


createPage();