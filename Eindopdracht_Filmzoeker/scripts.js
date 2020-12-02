let addMoviesToDom = movieList => movieList.map(movie => makeListItem(movie));

let makeListItem = function (movie) {

    let newListItem = document.createElement("li");
    mainUl.appendChild(newListItem);
    newListItem.appendChild(makeLinkByMovie(movie));
}

let makeLinkByMovie = function (movie) {

    let newA = document.createElement("a");
    newA.href = `http://www.imdb.com/title/${movie.imdbID}`;
    newA.appendChild(makeImage(movie));
    return newA;
}

let makeImage = function (movie) {

    let newImageTag = document.createElement("img");
    newImageTag.src = movie.Poster;
    return newImageTag;
}

let filterMovies = function (wordInMovieTitle) {

    const filteredMovies = movies.filter(movie => movie.Title.toLowerCase().includes(wordInMovieTitle));
    removeAllMovies();
    addMoviesToDom(filteredMovies);
}

let filterLatestMovies = function () {

    const filteredMovies = movies.filter(movie => movie.Year >= 2014);
    removeAllMovies();
    addMoviesToDom(filteredMovies);
}

let removeAllMovies = function () {

    while (mainUl.lastElementChild) {
        mainUl.removeChild(mainUl.lastElementChild);
    }
}

let searchForMovies = () => filterMovies(searchbar.value.toLowerCase());

let handleOnChangeEvent = function (event) {

    let eventToHandle = event.target.value.toLowerCase();

    switch (eventToHandle) {
        case 'newfilms':
            filterLatestMovies();
            break;

        case 'showall':
            removeAllMovies();
            addMoviesToDom(movies);
            break;

        case 'avengers':
        case 'x-men':
        case 'princess':
        case 'batman':
            filterMovies(eventToHandle);
            break;

        default:
            removeAllMovies();
            console.log("No films were selected");

    }
}

let mainUl = document.getElementById("listofmovies");
let radiobuttons = document.getElementsByName("movieselector");
let searchbar = document.getElementById("searchbar");

searchbar.addEventListener('input', searchForMovies);

Array.from(radiobuttons).forEach(radiobutton => radiobutton.addEventListener('change', handleOnChangeEvent));

addMoviesToDom(movies);