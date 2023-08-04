// console.log("Connected");

// const searchTermsInput = document.body.querySelector("#search-terms");

// // Fetch meal categories data from TheMealDB API
// const getMealCategories = async () => {
//   const mealCategoriesApiURL =
//     "https://www.themealdb.com/api/json/v1/1/categories.php";
//   try {
//     const response = await fetch(mealCategoriesApiURL);
//     //console.log(response);
//     const data = await response.json();
//     //console.log("data: ", data)
//     const categories = data.categories;
//     console.log(`categories: `, categories);
//     return categories;
//   } catch (error) {
//     console.log(error);
//     alert("Something went wrong, try again later");
//   }
// };

// // Render meal categories data to DOM
// const renderMealCategories = (mealCategoriesArray) => {
//   console.log("renderMealCategories");
//   console.table(mealCategoriesArray);

//   // find and select a UL with meal categories ID DOM element to append my data into
//   const mealCategoriesList = document.body.querySelector(
//     "#meal-categories-List"
//   );

//   mealCategoriesArray.forEach((mealCategory) => {
//     const mealCategoryListItem = document.createElement("li");
//     mealCategoryListItem.className = "meal-category-card";
//     mealCategoriesList.appendChild(mealCategory);
//   });

//   // for each element in our meal categories array
//   // create a wrapping element maybe <li> class of card
//   // appendChild  the li.card to DOM elemtn
//   // display the category name, image and description
//   // image
//   const mealCategoryImg = document.createElement("img");

//   // create an img element
//   // set img src to category thumbnail url
//   mealCategoryImg.src = mealCategory.strCategoryThumbnail;
//   mealCategoryImg.width = 300;
//   // appendChild image to card
//   mealCategoryListItem.appendChild(mealCategoryImg);
//   // give it a mobile friendly max width of 300px
//   // name
//   const mealCategoryName = document.createElement("h4");
//   mealCategoryName.textContent = mealCategory.strCategory;
//   // create an h4 element
//   // set h4 element textContent to be meal category name
//   // appendChild h4 to card
//   mealCategoryListItem.appendChild(mealCategoryName);
//   // description
//   // create p element
//   const mealCategoryDescription = document.createElement("p");

//   // set p element textContent to be meal category description
//   mealCategoryDescription.textContent = mealCategory.strCategoryDescription;
//   // appendChild p to card
//   mealCategoryListItem.appendChild(mealCategoryDescription);
// };

// // Function to call when form input is given focus
// const handleFormInputFocus = async () => {
//   console.log("focus ocurred");

//   //   const mealCategoriesObj =
//   const mealCategoriesArray = await getMealCategories();
//   renderMealCategories(mealCategoriesArray);
// };

// // Add event listener to search term input
// searchTermsInput.addEventListener("focus", handleFormInputFocus);
