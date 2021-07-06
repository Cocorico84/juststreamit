var base_url = "http://127.0.0.1:8000/api/v1/titles"

function modal(info) {
    let modalBtn = document.getElementById("modal-btn")
    let modal = document.querySelector(".modal")
    let closeBtn = document.querySelector(".close-btn")
    let modalContent = document.querySelector(".modal-content p")

    modalContent.innerHTML =
        `
            <img class="modal-img" src="${info.image_url}" />
            <p>title: ${info.title}</p>
            <p>genre: ${info.genres}</p>
            <p>released: ${info.date_published}</p>
            <p>vote: ${info.avg_vote}</p>
            <p>imdb score: ${info.imdb_score}</p>
            <p>director: ${info.directors}</p>
            <p>actors: ${info.actors}</p>
            <p>duration: ${info.duration} min</p>
            <p>country: ${info.countries}</p>
            <p>gross income: ${info.worldwide_gross_income}</p>
            <p>plot: ${info.long_description}</p>
        `

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
    .innerHTML =
        `
            <img class="modal-img" src="${getBestMoviesData.results[0].image_url}" />
            <p>${getBestMoviesData.results[0].title}</p>
        `

    let best_movie = document.getElementById('best_movie')

    let getDetailMovieRes = await fetch(`${base_url}/${getBestMoviesData.results[0].id}`)
    let getDetailMovieData = await getDetailMovieRes.json()

    best_movie.onclick = function() {
        modal(getDetailMovieData)
    }
}

function carrousel(moviesInfo) {
    let images = new Array
    // let firstSection = document.querySelector("#most_rated_movies .wrapper #section1 .item")
    // let firstSection = document.getElementById("most_rated_movies")
    let firstSection = document.querySelector("#most_rated_movies .slider")

    for (const movie of moviesInfo) {
        images.push(movie.image_url)
    }

    for (let image of images) {
        firstSection
        .innerHTML += `
            <div class="slide">
                <img src="${image}" />
            </div>
        `
    }
}

async function mostRatedMovies() {
    let movies = new Array
    for (let i = 1; movies.length * 5 < 7; i++) {
        let getRatedMoviesRes = await fetch(`${base_url}?page=${i}&sort_by=-avg_vote`)
        let getRatedMoviesData = await getRatedMoviesRes.json()

        let request = getRatedMoviesData

        movies.push(request.results)

    }
    let moviesInfo = movies.flat()
    let carrouselMovies = moviesInfo.slice(3)

    carrousel(carrouselMovies)
}

bestMovie()
mostRatedMovies()