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
const renderMealCategories = (mealCategoriesArray) => {
  console.log("renderMealCategories");
  console.table(mealCategoriesArray);

  // find and select a UL with meal categories ID DOM element to append my data into

  // for each element in our meal categories array
  // create a wrapping element maybe <article> class of card
  // appendChild  the article.card to DOM elemtn
  // display the category name, image and description
  // image
  // create an img element
  // set img src to category thumbnail url
  // give class of category-thumbnail
  // give it a mobile friendly max width of 300px
  // appendChild image to card
  // name
  // create an h4 element
  // set h4 element textContent to be meal category name
  // appendChild h4 to card
  // description
  // create p element
  // set p element textContent to be meal category description
  // appendChild p to card
};

// Function to call when form input is given focus
const handleFormInputFocus = async () => {
  console.log("focus ocurred");

  //   const mealCategoriesObj =
  const mealCategoriesArray = await getMealCategories();
  renderMealCategories(mealCategoriesArray);
};

// Add event listener to search term input
searchTermsInput.addEventListener("focus", handleFormInputFocus);
