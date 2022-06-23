const APIKEY = '04c35731a5ee918f014970082a0088b1';
const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280/';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&query=';

const main = document.getElementById("main");
// now for Form search list command
const form = document.getElementById("form");
// now for Search for movies command
const search = document.getElementById("search");


async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    

    //For each image and movie fetching script
    //respData.results.forEach(movie => {
    //    const img = document.createElement('img');
    //    img.src = IMGPATH + movie.poster_path;

    //    document.body.appendChild(img);
    //)}
    showMovies(respData.results);

}
getMovies(APIURL);    //get fav moviez

function showMovies(movies){
    main.innerHTML = '';
    movies.forEach(movie=> {
        const { poster_path, title, vote_average, overview} = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
        <img src="${IMGPATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class= "${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">${overview}</div>`;
        main.appendChild(movieEl);
    });

}

function getClassByRate(vote){
    if(vote > 8) {
        return 'green';
    } else if(vote >=5){
        return 'yellow';
    } else{
        return 'red';
    }
}

//form function area
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    //Search Term

    if(searchTerm){
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});
