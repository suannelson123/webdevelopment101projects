document.addEventListener('DOMContentLoaded', () => {

    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    const cities = [];

    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            cities.push(...data);
            console.log(cities);
        });

    function findTheMatches(wordToMatch, cities) {
        return cities.filter(place => {
            const regex = new RegExp(wordToMatch, 'gi');
            return place.city.match(regex) || place.state.match(regex);
        });
    }

  

    const search = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    


  function displayState() {
        const matches = findTheMatches(this.value, cities);
         console.log(matches);
    
        const displaySuggestions = matches.map(place => {

            const regex = new RegExp(this.value, 'gi');
            const cityName = place.city.replace(regex, `<span class="highlight">${this.value}</span>`); 
            
            return `<li>
                        <span>${cityName}, ${place.state}</span>
                        <span class="population">${numberWithCommas(place.population)}</span>
                    </li>`;

                    

                    
        }).join('');
        
        suggestions.innerHTML = displaySuggestions; 
    }



    search.addEventListener('change', displayState);
    search.addEventListener('keyup', displayState);

});
