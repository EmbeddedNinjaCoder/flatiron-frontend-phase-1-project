console.log("Connected");
// https://www.themealdb.com/api/json/v1/1/list.php?a=list
//https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}

// Elements
const cuisineSelect = document.querySelector("#cuisines");
const categorySelect = document.querySelector("#categories");
const recipeContainer = document.querySelector(".recipe-container");

//console.log(cuisineSelect);

// Function calls
getArtTitles(); //vvv
//renderArtistOptions(); // xxx
getCategories();

// Event Listeners

cuisineSelect.addEventListener("change", getRecipesByCuisine);
categorySelect.addEventListener("change", getRecipesByCategory);

// Dropdown functions
function getArtTitles() {
  // fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list") vvv
  fetch(
    "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=AugusteRenoir"
  )
    .then((r) => r.json())
    //.then((cuisines) => console.log(cuisines.objectIDs))
    .then((cuisines) => renderCuisineOptions(cuisines.objectIDs))
    //.then((cuisines) => renderCuisineOptions(cuisines.meals)) vvv
    .catch((error) => alert(error));
}

function getCategories() {
  fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
    .then((r) => r.json())
    .then((categories) => renderCategoryOptions(categories.meals))
    .catch((error) => alert(error));
}

function renderCuisineOptions(cuisines) {
  console.log(cuisines);
  cuisines.forEach((cuisine) => {
    //`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${cuisine}`
    //"https://collectionapi.metmuseum.org/public/collection/v1/objects/459123"
    // `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`

    const option = document.createElement("option"); //vvvvvvvvvvvvvvvvvvv

    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${cuisine}`
    )
      //`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${cuisine}`
      //"https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=cuisine"
      .then((r) => r.json())
      //.then((artObject) => console.log(artObject))

      .then((artObject) => {
        option.value = artObject.title;
        option.textContent = artObject.title;
      })
      .catch((error) => alert(error));

    //option.value = cuisine; //vvvvvvvvvvvvvvvvvvvvvv
    //option.textContent = cuisine; //vvvvvvvvvvvvvvvvvvv
    //console.log(option);
    cuisineSelect.append(option); //vvvvvvvvvvvvvvvvvvvvvv
  }); //vvvvvvvvvvvvvvvvv
} //vvvvvvvvvvvvvvvvv

function renderCategoryOptions(categories) {
  //console.log(categories);
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.strCategory;
    option.textContent = category.strCategory;
    categorySelect.append(option);
  });
}

// Recipe collection functions

function getRecipesByCuisine(e) {
  //console.log(e);
  //console.log(e.target.value);
  const cuisine = e.target.value;

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`)
    .then((r) => r.json())
    .then((recipes) => renderAllRecipes(recipes.meals))
    .catch((error) => alert(error));
}

function getRecipesByCategory(e) {
  //console.log(e);
  //console.log(e.target.value);
  const category = e.target.value;

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((r) => r.json())
    .then((recipes) => renderAllRecipes(recipes.meals))
    .catch((error) => alert(error));
}

function renderAllRecipes(recipes) {
  //clear container for the next selection
  recipeContainer.replaceChildren();

  //console.log(recipes);
  recipes.forEach((recipe) => {
    //console.log(recipe);
    renderRecipeCard(recipe);
  });
  cuisineSelect.value = "";
  categorySelect.value = "";
}

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
// const cuisineSelect = document.querySelector("#cuisines"); vvvvvvvvvvv
// const categorySelect = document.querySelector("#categories"); vvvvvvvvvvvvv
// const recipeContainer = document.querySelector(".recipe-container"); vvvvvvvvvvv

// //console.log(cuisineSelect);

// // Function calls
// getArtTitles(); vvvvvvvvvvvv
// getCategories(); vvvvvvvvvvvvvvv

// // Event Listeners

// cuisineSelect.addEventListener("change", getRecipesByCuisine);  vvvvvvvvvvvvv
// categorySelect.addEventListener("change", getRecipesByCategory);  vvvvvvvvvvv

// // Dropdown functions
// function getArtTitles() {  vvvvvvvvvvvvvv
//   fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list") vvvvvvvvvv
//     .then((r) => r.json())  vvvvvvvvvvvv
//     .then((cuisines) => renderCuisineOptions(cuisines.meals)) vvvvvvv
//     .catch((error) => alert(error)); vvvvvvvvvvvv
// }  vvvvvvvvvvvvvvvvv

// function getCategories() {   vvvvvvvvvvvvvv
//   fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")  vvvvvvvvvvvv
//     .then((r) => r.json())   vvvvvvvvvvvvvvvv
//     .then((categories) => renderCategoryOptions(categories.meals))  vvvvvvvvvvvv
//     .catch((error) => alert(error));   vvvvvvvvvvvvvvv
// }  vvvvvvvvvv

// function renderCuisineOptions(cuisines) {   vvvvvvvvvvvv
//   //console.log(cuisines);
//   cuisines.forEach((cuisine) => {    vvvvvvvvvvvvvvvvvvvv
//     const option = document.createElement("option");   vvvvvvvvvvvvvvvvvvv
//     option.value = cuisine.strArea;  vvvvvvvvvvvvvvvvvvvvvv
//     option.textContent = cuisine.strArea;   vvvvvvvvvvvvvvvvvvv
//     //console.log(option);
//     cuisineSelect.append(option);  vvvvvvvvvvvvvvvvvvvvvv
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

// function getRecipesByCuisine(e) {   vvvvvvvvvvvv
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
//   cuisineSelect.value = "";  vvvvvvvvvvvvvv
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
