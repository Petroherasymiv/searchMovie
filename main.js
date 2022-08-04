const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const body = document.querySelector('body')

document.getElementById('btn').onclick = () => getMovies();
form.addEventListener('submit', (e) => {
    e.preventDefault();
    getMovies();
})

async function getMovies() {
    try {
        const searchTerm = search.value;
        const response = await fetch(`https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`);
        const data = await response.json();
        showMovies(data.Search)
        console.log(data.Search)
    } catch (err){
        return main.innerHTML= `<h1 class="no-results">No Results Found</h1>`
    }
}
async function getMovieByID() {
    const response = await fetch(`http://www.omdbapi.com/?i=${event.target.dataset.id}&apikey=fdd06cbb&plot=full`);
    const data = await response.json();
    const infoMovie = document.createElement('div')
    infoMovie.classList.add('knowMoreInfoBox')
    main.onclick = () => {
        let b = document.querySelector('body')
            b.removeChild(b.querySelector('.knowMoreInfoBox'));
    }
    const {Poster, Title, Plot, Rated, Writer, Director, Actors, BoxOffice, Awards, Ratings} = data;
        infoMovie.innerHTML = `
        <img class="images" src="${Poster}">
        <div class="title">${Title}
           <div class="rated">${Rated}</div>
           <div class="plot">${Plot}</div>
           <div class="writer"><b>Written by</b> : ${Writer}</div>
           <div class="writer"><b>Directed by</b> : ${Director}</div>
           <div class="writer"><b>Starring</b> : ${Actors}</div>
           <div class="writer"><b>BoxOffice</b> : ${BoxOffice}</div>
           <div class="writer"><b>Awards</b> : ${Awards}</div>
           <div class="writer" id="Rating"><b>Ratings : </b><br></div>
        </div>
        `
    body.appendChild(infoMovie);
    Ratings.forEach(R => {
        const {Source, Value} = R;
        document.getElementById('Rating').innerHTML += `${Source} ${Value}<br>`
    })
    body.appendChild(infoMovie);
}
function showMovies(data) {
    main.innerHTML = '';
    data.forEach((movie) => {
        const {Title, Poster, Year, imdbID} = movie;
        let movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
             <img src="${Poster}">
            <div class="movie-info">
                <h3>${Title}</h3>
                <span>${Year}</span>
            </div>
            <div class="overview">
                <br/>
                 <input onclick="getMovieByID()" data-id ='${imdbID}' type="button" id="know" class="know-more" value="Know More">
            </div>
        `
        main.appendChild(movieEl);
    })

}
