const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search');
const searchResults = [];

const handleSearch = (e) => {
    
    console.log('submit')

    e.preventDefault();

    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
        return;
    }

    performSearch(query);

}

searchForm.addEventListener('submit', handleSearch);

const getCard = (destination) => {

    return `
        <div class="card mb-3">
            <img src="./images/${destination.imageUrl}" class="card-img-top" alt="Destination">
            <div class="card-body">
                <h5 class="card-title">${destination.name}</h5>
                <p class="card-text">${destination.description}</p>
                <button class="btn btn-primary">Visit</button>
            </div>
        </div>
    `;

}

const displayResults = (data) => {

    console.log(data);

    const resultsContainer = document.createElement('div');
    resultsContainer.classList.add('cards');

    let cards = '';
    data.forEach((destination) => {
        cards += getCard(destination);
    });

    console.log(cards);
    resultsContainer.innerHTML = cards;

    const searchResultsEl = document.querySelector('#search-results');
    searchResultsEl.append(resultsContainer);

}

const getSearchResults = (query, data) => {

    const q = query.toLowerCase();

    const categories = Object.keys(data);
    const category = categories.find(cat => {
        return cat.includes(q);
    });

    if (category === 'beaches' || category === 'temples') {
        displayResults(data[category]);
    } else {

        console.log(data.countries);
        console.log(q);

        const country = data.countries.find(c => {
            const name = c.name.toLowerCase();
            return name.includes(q);
        });
        if (country) {
            displayResults(country.cities);
        }
    }

}

const performSearch = (query) => {

    clearResults();

    const url = './travel_recommendation_api.json';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const searchResults = getSearchResults(query, data);
        });

}

const clearResults = () => {
    document.querySelector('#search-results').innerHTML = '';
    searchResults.length = 0;
}