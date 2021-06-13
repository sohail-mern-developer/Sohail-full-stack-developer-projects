// Get DOMS Elements
const search = document.getElementById('search');
const submit = document.getElementById('submit');
const generate = document.getElementById('generate');
const resultsHeading = document.getElementById('results-heading');
const meals = document.getElementById('meals');
const selectedMeal = document.getElementById('selected-meal');

// Function for search meal using the API
function searchMeal(e) {
    e.preventDefault();
    //Get the value from search field
    const searchText = search.value;
    //check if search input field is empty

    if(searchText.trim()) {
        // fetch data from API
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            resultsHeading.innerHTML = `
            <h2>Search results for ${searchText}</h2>
            `;
            //check if any meal returned
            if(data.meals === null) {
                resultsHeading.innerHTML = `
            <h2>No results found for ${searchText}</h2>
            `;
            } else {
                meals.innerHTML = data.meals.map( meal => `
                <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="meal-info" data-mwealID="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                    </div>
                </div>`)
                .join('')
                
            }
        });
        // Clear search text
        search.value = '';

    } else {
        alert('Please enter search keyword');
    }
}

// Event Listners
//1- Clck on form Submit

submit.addEventListener('submit', searchMeal);