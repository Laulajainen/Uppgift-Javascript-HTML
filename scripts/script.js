function saveData() {
  const newTitle = document.getElementById("title").value; //hämta värdet från formulär
  const newAge = document.getElementById("agerestriction").value;
  const newDescription = document.getElementById("description").value;
  let existingData = localStorage.getItem("savedData"); // hämta tidigare data
  existingData = existingData ? JSON.parse(existingData) : []; //om det finns data sedan innan, konvertera från JSON till objekt, annars skapa en tom array.

  existingData.push({
    title: newTitle,
    age: newAge,
    description: newDescription,
  }); //lägg till data
  localStorage.setItem("savedData", JSON.stringify(existingData)); //gör om data till sträng, spara i local

  alert("Data saved to local storage!");
  document.getElementById("title").value = ""; // Clear input field
  document.getElementById("agerestriction").value = ""; // Clear input field
  document.getElementById("description").value = ""; // Clear input field
}

function showData() {
  const savedData = localStorage.getItem("savedData");
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    if (parsedData.length > 0) {
      let a = document.getElementById("searchbar").value;
      let b = parsedData.findIndex((x) => x.title === a);
      document.getElementById("title").value = parsedData[b].title;
      document.getElementById("agerestriction").value = parsedData[b].age;
      document.getElementById("description").value = parsedData[b].description;
    } else {
      alert("Ingen data hittad");
    }
  } else {
    alert("Ingen data hittad");
  }
}

function loadSearchData() {
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
    }
  }
}
