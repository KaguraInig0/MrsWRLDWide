document.addEventListener("DOMContentLoaded", function () {});
var customIcon = L.icon({
  iconUrl: "/static/images/Map_marker_V2.png", // Default color
  iconSize: [64, 64],
  popupAnchor: [0, -16],
});

var customIconHover = L.icon({
  iconUrl: "/static/images/Map_marker_Hover_V2.png", // Hover color
  iconSize: [64, 64],
  popupAnchor: [0, -16],
});
var lcont = [
  "Africa",
  "Asia",
  "Europe",
  "North_America",
  "Australia",
  "South_America",
];
var count = [0, 0, 0, 0, 0, 0];

var map = L.map("map", {
  center: [0, 0], // Centered at (0, 0) (latitude, longitude)
  zoom: 2, // Initial zoom level
  zoomControl: false, // Disable zoom control
});

map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();

// Add a tile layer (e.g., OpenStreetMap)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Define positions of markers for each continent
var continents = {
  Africa: [0, 20],
  //'Antarctica': [-80, 0],
  Asia: [30, 100],
  Europe: [50, 10],
  North_America: [40, -100],
  Australia: [-20, 140],
  South_America: [-20, -60],
};

function clicked(popup) {
  popup.remove();
}



function check(button, ans, cont, correctAnswer) {
  if (ans == correctAnswer) {
    // Change button color to green
    button.classList.add("correct");
    // Disable further selection
    const buttons = document.querySelectorAll("#" + cont);
    buttons.forEach((cbutton) => {
      cbutton.disabled = true;
    });
    count[lcont.indexOf(cont)] += 1;
    clicked(button);
    generate(questions);
  } else {
    button.classList.add("wrong");
    // Disable further selection
    button.disabled = true;
  }
    // Perform actions for wrong answer, if needed
    // For example, you can display a message or provide a hint
//   }
        // if (ans == correctAnswer) {
        //   // Change button color to green
        //   button.classList.add("correct");
        //   // Disable further selection
        //   const buttons = document.querySelectorAll("#" + cont);
        //   buttons.forEach((cbutton) => {
        //     cbutton.disabled = true;
        //   });
        //   count[lcont.indexOf(cont)] += 1;
      
        //   // Update popup content instead of closing it
        //   const marker = button.closest('.leaflet-popup-content').parentElement.parentElement.__marker;
        //   updatePopupContent(marker, cont, questions);
        // } else {
        //   button.classList.add("wrong");
        //   // Disable further selection
        //   button.disabled = true;
        //   // Perform actions for wrong answer, if needed
        //   // For example, you can display a message or provide a hint
        // }
}


// function updatePopupContent(marker, continent, questions) {
//     var popupContent = `
//       <div class='custom-popup'>
//           <div class='popup-content'>
//               <div class='popup-image'><img src='${questions[continent]["image"]}' alt='Continent Image'></div>
//                 <div class='question_banks'>
//                       <h1>'${questions[continent]["question_bank"][count[lcont.indexOf(continent)]]}'<h1>
//                 <div>
//                   <div class='popup-questions'>
//                       <h3>Multiple Choice Questions:</h3>
//                   <ul>`;
  
//     questions[continent]["answer_bank"][
//       count[lcont.indexOf(continent)]
//     ].forEach(function (question) {
//       popupContent += `<li><button id="${continent}" onclick="check(this, '${question}', '${continent}', '${questions[continent]["answer_all"][count[lcont.indexOf(continent)]]}')" class='choice-btn'>${question}</button></li>`;
//     });
  
//     popupContent += `
//                 </ul>
//             </div>
//             <button onclick="clicked(this)" class='popup-close-btn'>Close</button>
//         </div>
//     </div>`;
  
//     marker.getPopup().setContent(popupContent).update();
//   }

function load_questions(questions) {
  // Initialize the map on the "map" div with a given center and zoom
  // Define the custom popup content
  // Show Continent Markers with the custom popup and custom icon
  window.questions = questions;
  generate(questions);
  console.log(questions);

  var bounds = L.latLngBounds(
    L.latLng(-90, -180), // Southwest corner of the world
    L.latLng(90, 180), // Northeast corner of the world
  );

  // Set maximum bounds to prevent panning outside the world
  map.setMaxBounds(bounds);
  map.on("drag", function () {
    map.panInsideBounds(bounds, { animate: false });
  });
}

function generate(questions) {
    for (var continent in continents) {
        if (count[lcont.indexOf(continent)] >= questions[continent]["question_bank"].length) {
            count[lcont.indexOf(continent)] = 0; 
        }

        var marker = L.marker(continents[continent], { icon: customIcon }).addTo(map);


    var popupContent = `
    <div class='custom-popup'>
        <div class='popup-content'>
            <div class='popup-image'><img src='${questions[continent]["image"]}' alt='Continent Image'></div>
              <div class='question_banks'>
                    <h1>'${questions[continent]["question_bank"][count[lcont.indexOf(continent)]]}'<h1>
              <div>
                <div class='popup-questions'>
                    <h3>Multiple Choice Questions:</h3>
                <ul>`;

    questions[continent]["answer_bank"][
      count[lcont.indexOf(continent)]
    ].forEach(function (question) {
      popupContent += `<li><button id="${continent}" onclick="check(this, '${question}', '${continent}', '${questions[continent]["answer_all"][count[lcont.indexOf(continent)]]}')" class='choice-btn'>${question}</button></li>`;
    });

    popupContent += `
              </ul>
          </div>
          <button onclick="clicked(this)" class='popup-close-btn'>Close</button>
      </div>
  </div>`;

    marker.bindPopup(popupContent);

    marker.on("popupopen", function (e) {}.bind(this));

    marker.on("mouseover", function (e) {
      this.setIcon(customIconHover);
    });

    marker.on("mouseout", function (e) {
      this.setIcon(customIcon);
    });
  }
}