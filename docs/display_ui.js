let queryValue;
const imageElement = document.getElementById("imageElement");


const getQuereystingValue = () => {
  const url = new URL(window.location);
  const currentUser = url.searchParams.get("value") ?? "";
  queryValue = currentUser.toLowerCase();
  console.log(queryValue);
};


const pageLoad = () =>{
    getQuereystingValue();
    if (queryValue === "deco"){
        imageElement.src = "Blob-Lobba_deco.png"
    }
    if(queryValue === "map"){
        // show these on the page
        const list = ["one","two","three"]
        console.log(list)
        const newlist = list.map((element)=>{return element+" Bloblobbers"})
        console.log(newlist)
    }
}

pageLoad();