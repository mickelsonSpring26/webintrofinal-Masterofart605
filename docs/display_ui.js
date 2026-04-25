let queryValue;
const imageElement = document.getElementById("imageElement");
const mapElement = document.getElementById("map")

const getQuereystingValue = () => {
  const url = new URL(window.location);
  const currentUser = url.searchParams.get("value") ?? "";
  queryValue = currentUser.toLowerCase();
  console.log(queryValue);
};


const pageLoad = () =>{
    const list = [" two"," three"," four"]
    mapElement.textContent = list
    getQuereystingValue();
    if (queryValue === "deco"){
        imageElement.src = "images/Blob-Lobba_deco.png"
    }
    if(queryValue === "map"){
        // show these on the page
        console.log(list)
        const newlist = list.map((element)=>{return element+" Bloblobbers"})
        console.log(newlist)
        mapElement.textContent=newlist
    }
}

pageLoad();