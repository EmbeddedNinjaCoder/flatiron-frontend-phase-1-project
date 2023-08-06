console.log("Connected");

// Capture dropdown and container elements into const
const artItemFromList = document.querySelector("#artItems");
//const categorySelect = document.querySelector("#categories");
const recipeContainer = document.querySelector(".recipe-container");

// Intializing function calls
getArtIds();
//renderArtistOptions(); // xxx
//getCategories();

// Event Listeners
artItemFromList.addEventListener("change", getArtItemByTitle);
//categorySelect.addEventListener("change", getRecipesByCategory);

// Dropdown functions

// Retrieve art id list for specific artist and pass to dropdown rendering function
function getArtIds() {
  //API fetch of art id list for specific artist
  fetch(
    "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=AugusteRenoir"
  )
    .then((r) => r.json())
    //.then((artItems) => console.log(artItems.objectIDs))
    .then((artItems) => renderArtTitles(artItems.objectIDs))
    .catch((error) => alert(error));
}

// function getCategories() {
//   fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
//     .then((r) => r.json())
//     .then((categories) => renderCategoryOptions(categories.meals))
//     .catch((error) => alert(error));
// }

//Receive art ID list and render as dropdown list item in the form of an art title
function renderArtTitles(artItems) {
  // console.log(artItems);
  artItems.forEach((artwork) => {
    //`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${cuisine}`
    //"https://collectionapi.metmuseum.org/public/collection/v1/objects/459123"
    const option = document.createElement("option");

    //Retrieve object related to art ID
    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artwork}`
    )
      //`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${cuisine}`
      //"https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=cuisine"
      .then((r) => r.json())
      //.then((artObject) => console.log(artObject))

      .then((artObject) => {
        option.value = artObject.objectID;
        option.textContent = artObject.title;
      })
      .catch((error) => alert(error));

    //option.value = cuisine; //vvvvvvvvvvvvvvvvvvvvvv
    //option.textContent = cuisine; //vvvvvvvvvvvvvvvvvvv
    //console.log(option);
    artItemFromList.append(option);
  }); //vvvvvvvvvvvvvvvvv
} //vvvvvvvvvvvvvvvvv

// function renderCategoryOptions(categories) {
//   //console.log(categories);
//   categories.forEach((category) => {
//     const option = document.createElement("option");
//     option.value = category.strCategory;
//     option.textContent = category.strCategory;
//     categorySelect.append(option);
//   });
// }

// Recipe collection functions

//Render specific art item data and present
function getArtItemByTitle(e) {
  //console.log(e);
  console.log(e.target.value);
  const cuisine = e.target.value;
  fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${cuisine}`
  )
    //fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`)
    .then((r) => r.json())
    //.then((recipes) => renderRecipeCard(recipes)) //nnnnnnnnnnnnnnnnnnnnnnnnnnnn
    //.then((recipes) => renderAllRecipes(recipes))
    .then((recipes) => console.log(recipes))
    .catch((error) => alert(error));

  // fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`) vvv
  //   .then((r) => r.json())    vvv
  //   .then((recipes) => renderAllRecipes(recipes.meals))   vvv
  //   .catch((error) => alert(error));   vvv
}

// function getRecipesByCategory(e) {
//   //console.log(e);
//   //console.log(e.target.value);
//   const category = e.target.value;

//   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
//     .then((r) => r.json())
//     .then((recipes) => renderAllRecipes(recipes.meals))
//     .catch((error) => alert(error));
// }

// function renderAllRecipes(recipes) {
//   //clear container for the next selection
//   recipeContainer.replaceChildren();

//   console.log(recipes);
//   recipes.forEach((recipe) => {
//     //console.log(recipe);
//     renderRecipeCard(recipe);
//   });
//   artItemFromList.value = "";
//   categorySelect.value = "";
// }

function renderRecipeCard(recipe) {
  //console.log(recipe.strMeal);
  //console.log(strMeal);

  // Deconstructing
  const {
    idMeal: recipeId,
    strMeal: recipeName,
    strMealThumb: recipeImage,
  } = recipe;

  //console.log(recipe);
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  // add event listener to card
  cardDiv.addEventListener("click", (e) => getRecipeDetails(e, recipeId));

  const image = document.createElement("img");
  image.src = recipeImage;

  const title = document.createElement("h3");
  title.textContent = recipeName;

  cardDiv.append(image, title);
  recipeContainer.append(cardDiv);
}

function getRecipeDetails(e, recipeId) {
  //console.log(recipeId);

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
    .then((r) => r.json())
    .then((recipe) => console.log(recipe.meals[0]))
    .catch((error) => alert(error));
}

// ---------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------

// console.log("Connected");  vvvvvvvvvvvvvvvvvvv
// // https://www.themealdb.com/api/json/v1/1/list.php?a=list
// //https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}

// // Elements
// const artItemFromList = document.querySelector("#artItems"); vvvvvvvvvvv
// const categorySelect = document.querySelector("#categories"); vvvvvvvvvvvvv
// const recipeContainer = document.querySelector(".recipe-container"); vvvvvvvvvvv

// //console.log(artItemFromList);

// // Function calls
// getArtIds(); vvvvvvvvvvvv
// getCategories(); vvvvvvvvvvvvvvv

// // Event Listeners

// artItemFromList.addEventListener("change", getArtItemByTitle);  vvvvvvvvvvvvv
// categorySelect.addEventListener("change", getRecipesByCategory);  vvvvvvvvvvv

// // Dropdown functions
// function getArtIds() {  vvvvvvvvvvvvvv
//   fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list") vvvvvvvvvv
//     .then((r) => r.json())  vvvvvvvvvvvv
//     .then((artItems) => renderArtTitles(artItems.meals)) vvvvvvv
//     .catch((error) => alert(error)); vvvvvvvvvvvv
// }  vvvvvvvvvvvvvvvvv

// function getCategories() {   vvvvvvvvvvvvvv
//   fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")  vvvvvvvvvvvv
//     .then((r) => r.json())   vvvvvvvvvvvvvvvv
//     .then((categories) => renderCategoryOptions(categories.meals))  vvvvvvvvvvvv
//     .catch((error) => alert(error));   vvvvvvvvvvvvvvv
// }  vvvvvvvvvv

// function renderArtTitles(artItems) {   vvvvvvvvvvvv
//   //console.log(artItems);
//   artItems.forEach((cuisine) => {    vvvvvvvvvvvvvvvvvvvv
//     const option = document.createElement("option");   vvvvvvvvvvvvvvvvvvv
//     option.value = cuisine.strArea;  vvvvvvvvvvvvvvvvvvvvvv
//     option.textContent = cuisine.strArea;   vvvvvvvvvvvvvvvvvvv
//     //console.log(option);
//     artItemFromList.append(option);  vvvvvvvvvvvvvvvvvvvvvv
//   });   vvvvvvvvvvvvvvvvv
// }  vvvvvvvvvvvvvvvvv

// function renderCategoryOptions(categories) {  vvvvvvvvvv
//   //console.log(categories);
//   categories.forEach((category) => {   vvvvvvvvvvvvvvv
//     const option = document.createElement("option");  vvvvvvvvvvvv
//     option.value = category.strCategory;    vvvvvvvvvvvvvvvvv
//     option.textContent = category.strCategory;    vvvvvvvvvvvvvvv
//     categorySelect.append(option);   vvvvvvvvvvvvvvvvvvvvvv
//   });   vvvvvvvvvvvvvvv
// }  vvvvvvvvvvvvvvvvv

// // Recipe collection functions

// function getArtItemByTitle(e) {   vvvvvvvvvvvv
//   //console.log(e);
//   //console.log(e.target.value);
//   const cuisine = e.target.value;   vvvvvvvvvvvvvvvvv

//   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`)  vvvvvvvv
//     .then((r) => r.json())   vvvvvvvvvvvv
//     .then((recipes) => renderAllRecipes(recipes.meals))   vvvvvvvvvvvv
//     .catch((error) => alert(error));  vvvvvvvvvvvvvvvvv
// }  vvvvvvvvvvvvvvvvv

// function getRecipesByCategory(e) {  vvvvvvvvvvvvv
//   //console.log(e);
//   //console.log(e.target.value);
//   const category = e.target.value;  vvvvvvvvvvvvvv

//   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)  vvvvv
//     .then((r) => r.json())   vvvvvvvvvvv
//     .then((recipes) => renderAllRecipes(recipes.meals))  vvvvvvvvvv
//     .catch((error) => alert(error));  vvvvvvvvvvvvvvvv
// } vvvvvvvvv

// function renderAllRecipes(recipes) {  vvvvvvvvvvv
//   //clear container for the next selection
//   recipeContainer.replaceChildren();  vvvvvvvvvvv

//   //console.log(recipes);
//   recipes.forEach((recipe) => {  vvvvvvvvvvvvv
//     //console.log(recipe);
//     renderRecipeCard(recipe);   vvvvvvvvvvvvvvvvv
//   });  vvvvvvvvvvv
//   artItemFromList.value = "";  vvvvvvvvvvvvvv
//   categorySelect.value = "";  vvvvvvvvvvvvvvvvv
// }  vvvvvvvvvvvvvvvvvvvv

// function renderRecipeCard(recipe) {  vvvvvvvvvvvvvvvv
//   //console.log(recipe.strMeal);
//   //console.log(strMeal);

//   // Deconstructing
//   const {                     vvvvvvvvvvvvvvv
//     idMeal: recipeId,        vvvvvvvvvvvvvv
//     strMeal: recipeName,     vvvvvvvvvvvvvvvvv
//     strMealThumb: recipeImage,  vvvvvvvvvvvv
//   } = recipe;                  vvvvvvvvvvvvvvvv

//   //console.log(recipe);
//   const cardDiv = document.createElement("div");  vvvvvvvvvvvv
//   cardDiv.classList.add("card");  vvvvvvvvvvvvvv
//   // add event listener to card
//   cardDiv.addEventListener("click", (e) => getRecipeDetails(e, recipeId));  vvvvvv

//   const image = document.createElement("img");  vvvvvvvvvvvv
//   image.src = recipeImage;  vvvvvvvvvvvvvvv

//   const title = document.createElement("h3");  vvvvvvvvvvvvv
//   title.textContent = recipeName;   vvvvvvvvvvvvvvvv

//   cardDiv.append(image, title);    vvvvvvvvvvvvvvvvvvvvvv
//   recipeContainer.append(cardDiv);   vvvvvvvvvvvvvvvvvvvv
// }   vvvvvvvvvvvvvvvv

// function getRecipeDetails(e, recipeId) {  vvvvvvvvv
//   //console.log(recipeId);

//   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)  vvvvv
//     .then((r) => r.json())            vvvvv
//     .then((recipe) => console.log(recipe.meals[0]))  vvvvv
//     .catch((error) => alert(error));   vvvvv
// } vvvvv

// ---------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
