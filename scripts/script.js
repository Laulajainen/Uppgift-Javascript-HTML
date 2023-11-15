function saveData() {
  const newTitle = document.getElementById("title").value; //hämta värdet från formulär
  const newAge = document.getElementById("agerestriction").value;
  const newDescription = document.getElementById("description").value;
  let existingData = localStorage.getItem("savedData"); // hämta tidigare data
  existingData = existingData ? JSON.parse(existingData) : []; //om det finns data sedan innan, konvertera från JSON till objekt, annars skapa en tom array.

  existingData.push({
    title: newTitle.toLowerCase(),
    age: newAge.toLowerCase(),
    description: newDescription.toLowerCase(),
  });
  localStorage.setItem("savedData", JSON.stringify(existingData)); //gör om data till sträng, spara i local

  alert("Data saved to local storage!");
  document.getElementById("title").value = ""; // töm formulären
  document.getElementById("agerestriction").value = "";
  document.getElementById("description").value = "";
  location.reload();
}
let input = document.getElementById("searchbar"); // eventlyssnare för sökfältet så att man kan även trycka på enter för att söka
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("showbutton").click();
  }
});
function showData() {
  // visar data från vald titel
  const savedData = localStorage.getItem("savedData");
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    if (parsedData.length > 0) {
      let input = document.getElementById("searchbar").value;
      let index = parsedData.findIndex((x) => x.title === input);
      console.log(index);
      if (index > -1) {
        document.getElementById("title").value = parsedData[index].title;
        document.getElementById("agerestriction").value = parsedData[index].age;
        document.getElementById("description").value = parsedData[index].description;
        document.getElementById("searchbar").value = "";
        document.getElementById("list").style = "";
        lockForms();
      } else {
        alert("Ingen titel matchar det namnet");
      }
    } else {
      alert("Ingen data hittad");
    }
  } else {
    alert("Ingen data hittad");
  }
}
function unlockForms() {
  // låser upp formulären för input
  document.getElementById("title").removeAttribute("readonly");
  document.getElementById("agerestriction").removeAttribute("readonly");
  document.getElementById("description").removeAttribute("readonly");
  document.getElementById("title").value = "";
  document.getElementById("agerestriction").value = "";
  document.getElementById("description").value = "";
  document.getElementById("title").style.backgroundColor = "white";
  document.getElementById("agerestriction").style.backgroundColor = "white";
  document.getElementById("description").style.backgroundColor = "white";
}
function lockForms() {
  // låser formulären för input
  document.getElementById("title").setAttribute("readonly", true);
  document.getElementById("agerestriction").setAttribute("readonly", true);
  document.getElementById("description").setAttribute("readonly", true);
  document.getElementById("title").style.backgroundColor = "#f7f7f7";
  document.getElementById("agerestriction").style.backgroundColor = "#f7f7f7";
  document.getElementById("description").style.backgroundColor = "#f7f7f7";
}

function clearStorage() {
  // töm minnet
  localStorage.removeItem("savedData");
  alert("Local storage cleared");
  const list = document.getElementById("list");
  location.reload();
}

function loadSearchData() {
  // laddar data från minnet och lägger in dom i en lista
  const savedData = localStorage.getItem("savedData");
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    if (parsedData.length > 0) {
      for (const key in parsedData) {
        let a = document.createElement("a");
        a.innerText = parsedData[key].title;
        a.classList.add("listItem");
        list.appendChild(a);
      }
    }
  }
}

function search() {
  //uppdatera sökfältet med passande titlar beroende på input
  let listContainer = document.getElementById("list");
  let listItems = document.getElementsByClassName("listItem");
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  let noResults = true;

  for (i = 0; i < listItems.length; i++) {
    if (!listItems[i].innerHTML.toLowerCase().includes(input) || input === "") {
      listItems[i].style.display = "none";
      continue;
    } else {
      listItems[i].style.display = "flex";
      noResults = false;
      listContainer.style.display = noResults ? "none" : "block";
      listContainer.style.border = "1px solid lightgrey";
    }
  }
}
function lastUpdated() {
  document.getElementById("time").innerHTML = document.lastModified;
}

lastUpdated();
