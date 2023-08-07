// Capture dropdown and container elements into const
const artItemFromList = document.querySelector("#artItems");
const artImageContainer = document.querySelector(".art-container");

// Function for populating art ID's list
getArtIds();

// Event Listener for dropdown list
artItemFromList.addEventListener("change", getArtItemByTitle);

// Retrieve art id list for specific artist and pass to dropdown rendering function
function getArtIds() {
  //API fetch of art id list for specific artist
  fetch(
    "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=AugusteRenoir"
  )
    .then((r) => r.json())
    .then((artItems) => renderArtTitles(artItems.objectIDs))
    .catch((error) => alert(error));
}

//Receive art ID list and render as dropdown list item in the form of an art title
function renderArtTitles(artItems) {
  // Added if to remove problem object record on Met museum server side
  artItems.forEach((artwork) => {
    if (artwork !== 844492) {
      const option = document.createElement("option");

      //Retrieve object related to art ID
      fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artwork}`
      )
        .then((r) => r.json())
        .then((artObject) => {
          //Add filter for no primary image here
          if (artObject.primaryImage !== "") {
            option.value = artObject.objectID;
            option.textContent = artObject.title;
            artItemFromList.append(option);
          }
        })
        .catch((error) => alert(error));
    }
  });
}

//Render specific art item data and present
function getArtItemByTitle(e) {
  console.log(e.target.value);
  const nextArtId = e.target.value;
  fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${nextArtId}`
  )
    .then((r) => r.json())
    .then((artObjectReady) => renderArtCard(artObjectReady))
    .catch((error) => alert(error));
}

function renderArtCard(famousArtwork) {
  //clear container for the next selection
  artImageContainer.replaceChildren();
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  // add event listener to card
  cardDiv.addEventListener("click", (e) =>
    getArtworkDetails(e, famousArtwork.medium, famousArtwork.objectDate)
  );

  const image = document.createElement("img");
  image.src = famousArtwork.primaryImage;

  const title = document.createElement("h3");
  title.textContent = famousArtwork.title;

  cardDiv.append(image, title);
  artImageContainer.append(cardDiv);
}

function getArtworkDetails(e, a, z) {
  console.log(a);
  console.log(z);

  const moreInfoDiv = document.createElement("div");
  moreInfoDiv.classList.add("moreInfoCard");

  const title2 = document.createElement("h1");
  title2.textContent = a;

  const title3 = document.createElement("h1");
  title3.textContent = z;

  moreInfoDiv.append(title2, title3);
  artImageContainer.append(moreInfoDiv);
}
