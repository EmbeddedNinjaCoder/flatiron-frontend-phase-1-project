console.log("Connected");

const handleFormInputFocus = () => {
  console.log("focus ocurred");
};

const searchTermsInput = document.body.querySelector("#search-terms");
searchTermsInput.addEventListener("focus", handleFormInputFocus);
