var base_url = "http://127.0.0.1:8000/api/v1/titles"


function modal(info) {
    let modalBtn = document.getElementById("modal-btn")
    let modal = document.querySelector(".modal")
    let closeBtn = document.querySelector(".close-btn")
    let modalContent = document.querySelector(".modal-content p")

    modalContent.innerHTML = `<img class="modal-img" src="${info.image_url}" />`
    modalContent.innerHTML += `<p>title: ${info.title}</p>`
    modalContent.innerHTML += `<p>genre: ${info.genres}</p>`
    modalContent.innerHTML += `<p>released: ${info.date_published}</p>`
    modalContent.innerHTML += `<p>vote: ${info.avg_vote}</p>`
    modalContent.innerHTML += `<p>imdb score: ${info.imdb_score}</p>`
    modalContent.innerHTML += `<p>director: ${info.directors}</p>`
    modalContent.innerHTML += `<p>actors: ${info.actors}</p>`
    modalContent.innerHTML += `<p>duration: ${info.duration} min</p>`
    modalContent.innerHTML += `<p>country: ${info.countries}</p>`
    modalContent.innerHTML += `<p>gross income: ${info.worldwide_gross_income}</p>`
    modalContent.innerHTML += `<p>plot: ${info.long_description}</p>`

    modalBtn.onclick = function(){
        modal.style.display = "block"
    }
    closeBtn.onclick = function(){
        modal.style.display = "none"
    }
    window.onclick = function(e){
        if(e.target == modal){
            modal.style.display = "none"
        }
    }
}

async function bestMovie() {

    let getBestMoviesResponse = await fetch(`${base_url}?sort_by=-imdb_score`)
    let getBestMoviesData = await getBestMoviesResponse.json()

    let modalBtn = document.getElementById("modal-btn")

    modalBtn
    .innerHTML = `<img class="modal-img" src="${getBestMoviesData.results[0].image_url}" />`

    modalBtn
    .innerHTML += `<p>${getBestMoviesData.results[0].title}</p>`

    let best_movie = document.getElementById('best_movie')

    let getDetailMovieRes = await fetch(`${base_url}/${getBestMoviesData.results[0].id}`)
    let getDetailMovieData = await getDetailMovieRes.json()

    best_movie.onclick = function() {
        modal(getDetailMovieData)
    }

}

function carrousel(moviesInfo) {
    let images = new Array
    let firstSection = document.querySelector("#most_rated_movies .wrapper #section1 .item")

    for (const movie of moviesInfo) {
        images.push(movie.image_url)
    }
    // console.log(firstSection)
    firstSection
    .innerHTML = `<img src="${images[0]}" /> `

}

async function mostRatedMovies() {
    let getRatedMoviesRes = await fetch(`${base_url}?sort_by=-avg_vote`)
    let getRatedMoviesData = await getRatedMoviesRes.json()
    // console.log(getRatedMoviesData.results.length)
    // console.log(getRatedMoviesData)
    let movies = new Array
    while (movies.length * 5 < 7) {
        let request = getRatedMoviesData

        movies.push(request.results)

    }
    let moviesInfo = movies.flat()

    carrousel(moviesInfo)
}

bestMovie()
mostRatedMovies()