console.log("Connected");

const searchTermsInput = document.body.querySelector("#search-terms");

// Fetch meal categories data from TheMealDB API
const getMealCategories = async () => {
  const mealCategoriesApiURL =
    "https://www.themealdb.com/api/json/v1/1/categories.php";
  try {
    const response = await fetch(mealCategoriesApiURL);
    //console.log(response);
    const data = await response.json();
    //console.log("data: ", data)
    const categories = data.categories;
    console.log(`categories: `, categories);
    return categories;
  } catch (error) {
    console.log(error);
    alert("Something went wrong, try again later");
  }
};

// Render meal categories data to DOM
const renderMealCategories = (mealCategoriesObj) => {
  console.log("renderMealCategories");
  console.table(mealCategoriesObj);

  //   Create a wrapping element - class of card
};

// Function to call when form input is given focus
const handleFormInputFocus = async () => {
  console.log("focus ocurred");

  //   const mealCategoriesObj =
  const mealCategoriesObj = await getMealCategories();
  renderMealCategories(mealCategoriesObj);
};

// Add event listener to search term input
searchTermsInput.addEventListener("focus", handleFormInputFocus);
