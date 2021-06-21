const submit = document.getElementById('submit');
const search = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const generateBtn = document.getElementById('generate-btn');
const resultsHeading = document.getElementById('results-heading');
const meals = document.getElementById('meals');
const selectedMeal = document.getElementById('selected-meal');

function searchMeal(e) {
    e.preventDefault();

    const searchText = search.value;
    
    if(searchText.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                resultsHeading.innerHTML = `<h2>Search results for ${searchText}</h3>`;  
              if(data.meals === null) {
                resultsHeading.innerHTML = `<h2>No results found for ${searchText}</h3>`;
              } else {
                    meals.innerHTML = data.meals.map(meal => `
                        <div class = "meal"><img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                        <div class = "meal-info" data-mealID = "${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                        </div>
                    `)
                    .join('')
                    
                    
              }
            });
            search.value = '';
    } 
}

function displayMealDetails(meal) {
    const ingredients = [];

    for(let i = 1; i <= 20; i++) {
        if( meal[`strIngredient${i}`] ) {
            ingredients.push(`${meal[`strIngredient${i}`]} : ${meal[`strMeasure${i}`]} `);
        } else {
            break;
        }
    }
    console.log(meal);
    selectedMeal.innerHTML = `
        <div class="selected-meal-details">
            <h1>${meal.strMeal}</h1>
            <img src = "${meal.strMealThumb}" alt = "${meal.strMeal}" />
            <div class = "selected-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : '' }
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class="selected-meal-instructions">
                <p>${meal.strInstructions}</p>
                <h3>Ingredients</h3>
                <ul>
                    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
        </div>

        
    `;
    meals.innerHTML = '';
    
}


function getMeal(mealID) {
    fetch(`HTTPS://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            displayMealDetails(meal);
        });
}

submit.addEventListener('click', searchMeal);

meals.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        
       if(item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
        
    });
    if(mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealID');
        getMeal(mealID); 
    }
});