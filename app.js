//toggle visibility of translate section
$("#translate").click(function () {
  $("#translateContainer").toggleClass("closed");
});

//example data
let tabledata = [
  [{
      domain: "Stonegrey",
      range: "Dark Grey"
    },
    {
      domain: "Caribbean Sea",
      range: "Turquoise"
    },
    {
      domain: "Indian Ocean",
      range: "Dark Blue"
    },
    {
      domain: "Angry Pony",
      range: "Violet Pink"
    },
    {
      domain: "Candy Pop",
      range: "Light Green"
    },
    {
      domain: "Caramel Cluster",
      range: "Beige"
    },
    {
      domain: "Coffee Break",
      range: "Dark brown"
    },
    {
      domain: "Milky Way",
      range: "Light Grey"
    },
    {
      domain: "Grapefruit delight",
      range: "Salmon Orange"
    },
    {
      domain: "Blueberry Mist",
      range: "Violet Blue"
    }
  ],
  [{
      domain: "Butcher of Blaviken",
      range: "Geralt of Rivia"
    },
    {
      domain: "The Boy Who Lived",
      range: "Harry Potter"
    },
    {
      domain: "Padfoot",
      range: "Sirius Black"
    },
    {
      domain: "No one",
      range: "Arya Stark"
    },
    {
      domain: "Sneaky little hobbit",
      range: "Frodo Baggins"
    },
    {
      domain: "Child of Surprise",
      range: "Ciri"
    },
    {
      domain: "Lady of the Woods",
      range: "Galadriel"
    },
    {
      domain: "Half Blood Prince",
      range: "Severus Snape"
    },
    {
      domain: "Lord Voldemort",
      range: "Tom Riddle"
    },
    {
      domain: "Fred Weasley",
      range: "George Weasley"
    }
  ],
  [

    {
      domain: "Hühnchen",
      range: "Chicken"
    },
    {
      domain: "Kaffee",
      range: "Coffee"
    },
    {
      domain: "Kartoffeln",
      range: "Potatoes"
    },
    {
      domain: "Zwiebeln",
      range: "Onions"
    },
    {
      domain: "Eiskrem",
      range: "Ice cream"
    },
    {
      domain: "Brot",
      range: "Bread"
    },
    {
      domain: "Katze",
      range: "Cat"
    },
    {
      domain: "Wasser",
      range: "Water"
    },
    {
      domain: "Pinguin",
      range: "Penguin"
    },
    {
      domain: "Herz",
      range: "Heart"
    },
    {
      domain: "Tschüss!",
      range: "Goodbye"
    }

  ]
];


//generate tables from tabledata array
const drawTables = () => {
  document.getElementById("dictionaries").innerHTML = '';

  for (let dictionary = 0; dictionary < tabledata.length; dictionary++) {
    //create a tableContainer div
    let tableContainer = document.createElement("div");
    tableContainer.classList.add("tableContainer");
    document.getElementById("dictionaries").appendChild(tableContainer);

    //create table heading
    let tableh3 = document.createElement("h3");
    tableh3.classList.add("tableh3");
    tableh3.innerText = `Table ${dictionary+1}`
    tableContainer.appendChild(tableh3);

    //create a new div for each dictionary
    let elem = document.createElement("div");
    elem.style.border = "7px solid rgb(224, 234, 238)"
    elem.style.width = "400px";
    elem.id = "dictionary-" + dictionary;
    tableContainer.appendChild(elem);

    //create table-control div
    let tableControlContainer = document.createElement("div");
    tableControlContainer.classList.add("tableControlContainer");
    tableContainer.appendChild(tableControlContainer);

    //create a "Add new entry" button
    let addBtn = document.createElement("button");
    addBtn.classList.add("addBtn");
    addBtn.innerHTML = "Add new entry"
    addBtn.addEventListener("click", function () {
      tabledata[dictionary].unshift({
        domain: "",
        range: "",
      });
    });
    tableControlContainer.appendChild(addBtn);

    //create "Delete" button
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.innerHTML = "Delete dictionary"
    deleteBtn.addEventListener("click", () => {
      tabledata.splice([dictionary], 1)
      tableContainer.remove();
    });
    tableControlContainer.appendChild(deleteBtn);

    let table = new Tabulator(("#dictionary-" + dictionary), {
      data: tabledata[dictionary],
      layout: "fitColumns",
      height: "400px",
      reactiveData: true,
      // headerSort: false,
      layoutColumnsOnNewData: true,
      columns: [ //define the table columns
        {
          title: "domain",
          field: "domain",
          editor: "input",
          validator: "unique"
        },
        {
          title: "range",
          field: "range",
          editor: "input",
          validator: "unique"
        },
        {
          formatter: "buttonCross",
          headerSort: false,
          width: 40,
          align: "center",
          //   deletes row and removes object from tabledata accordingly
          cellClick: function (e, cell) {
            let a = {
              domain: cell.getRow().getData().domain,
              range: cell.getRow().getData().range
            };
            let f = tabledata[dictionary].filter(function (x) {
              return x.domain != a.domain && x.range != a.range;
            });
            tabledata[dictionary] = f;
            cell.getRow().delete();
            table.setData(tabledata[dictionary]);
          }
        },
      ],
    });
  }
}

//populate the tables
drawTables();

//manual add dictionary
let newDictionary = document.querySelector("#newDictionary")
newDictionary.addEventListener("click", function () {
  addDictionary();
});

const addDictionary = () => {
  let newDictionary = [{
    domain: "",
    range: ""
  }]
  tabledata.push(newDictionary)
  drawTables();
}

//Validate Data button listener
let validateForm = document.querySelector("#translate-form")
validateForm.addEventListener("submit", function (e) {
  e.preventDefault();
  validateDictionary();
})



const validateDictionary = () => {
  //turning form inputs to newDataSet
  let newDataSet = []
  let domainInput = document.querySelectorAll(".domainInput");
  let rangeInput = document.querySelectorAll(".rangeInput");

  //looping through form entries and adding them to the newDataSet array only if both fields are filled out
  for (let i = 0; i < domainInput.length; i++) {
    if (domainInput[i].value && rangeInput[i].value) {
      newDataSet.push({
        domain: domainInput[i].value,
        range: rangeInput[i].value
      });
    }
    // newDataSet now ready
  }

  // getting compareDataSet dictionary 
  let selectMenu = document.querySelector("#chooseTable")
  let tableIdx = selectMenu.options[selectMenu.selectedIndex].value;
  let compareDataSet = tabledata[tableIdx];

  // comparing values of object keys
  function validate() {
    compareDataSet.forEach(function (compareElement) {
      newDataSet.forEach(function (newDataElement) {
        if (compareElement.domain.toLowerCase() === newDataElement.domain.toLowerCase()) {
          newDataElement.range = compareElement.range;
        } else if (compareElement.range.toLowerCase() === newDataElement.domain.toLowerCase()) {
          newDataElement.range = compareElement.domain;
        }
      });
    });
  }

  validate();

  // generating results in DOM
  let table = new Tabulator("#results", {
    data: newDataSet, //load row data from array
    layout: "fitData", //fit columns to width of table
    responsiveLayout: "hide", //hide columns that dont fit on the table
    tooltips: true, //show tool tips on cells
    movableColumns: true, //allow column order to be changed
    columns: [ //define the table columns
      {
        title: "domain",
        field: "domain"
      },
      {
        title: "range",
        field: "range"
      },
    ],
  });

}
