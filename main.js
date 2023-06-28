console.log("Connected");

const searchTermsInput = document.body.querySelector("#search-terms");

const getMealCategories = async () => {
    const mealCategoriesApiURL = "https://www.themealdb.com/api/json/v1/1/categories.php"
    try {
        const response = await fetch(mealCategoriesApiURL)
        // console.log(response) 
        const data = response.json()
        console.log(`data: `, data)
    } catch(error) {
        console.log(error)
        alert('Something went wrong, try again later')
    }   
}   

const handleFormInputFocus = async () => {
  console.log("focus ocurred");

  await getMealCategories();
};


searchTermsInput.addEventListener("focus", handleFormInputFocus);
