// Create the global variables that are required for the food generation API

var key = '2929663d6dd7ee94db20d78f5c2a2235';
var applicationId = '86631bdd';


var pairingListEl = document.querySelector('#storedPairing')
var pairings = ['Jamaican jerk chicken wings', 'Corn dogs', 'Strawberry ice cream sundae']
var apiUrlName = '';

// Render the food pairing suggestions from the beer generation page that were stored in local storage

function renderPairing() {
    pairingListEl.innerHTML = '';
    var pairings = JSON.parse(localStorage.getItem('pairings')) || [];
    for(var i= pairings.length-1; i >=0; i--) {
        var pairingEl = document.createElement('button');
        pairingEl.classList.add('button', 'my-3' ,'is-link', 'is-rounded', 'is-hover', 'is-fullwidth', 'is-focused')
        pairingEl.innerText = pairings[i];
        pairingListEl.appendChild(pairingEl);
    }
}

// Generate and display the 3 top recipe suggestions form the pairing button

function getRecipeSuggestions(choice) {
   
    var recipeName = choice;
    var recipeArray = recipeName.split(' ');
    for (i=0; i < recipeArray.length; i++) {
        apiUrlName = apiUrlName + recipeArray[i]+ ',+';
        
    }
    console.log(apiUrlName);
    var apiUrl = 'https://api.edamam.com/api/recipes/v2/?app_id=86631bdd&app_key='+ key + '&q=' + apiUrlName + '&type=public';
    
    
    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
        console.log(data);
        displayRecipe(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to GitHub');
    });
};

function displayRecipe(data) {
    var firstSuggestedRecipeEl = document.querySelector('#firstSuggestion');
    var firstPhotoUrl = data.hits[0].recipe.image;
    var firstPhoto = document.createElement('img');
    firstPhoto.setAttribute('src', firstPhotoUrl);
    firstPhoto.setAttribute('alt', 'Photo of ' + data.hits[0].recipe.label),
    firstSuggestedRecipeEl.appendChild('firstPhoto');

    console.log(firstPhotoUrl);
}
    

















renderPairing(pairings);

pairingListEl.addEventListener('click', function(event) {
    
    var element =event.target;
    element = element.innerHTML;
   
    // forecastWeatherEl.innerHTML = '';
    // currentWeatherEl.innerHTML = '';
    // generateApiUrl(element);
    getRecipeSuggestions(element);
    // getFiveDayForecast(element);
});