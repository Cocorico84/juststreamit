var base_url = "http://127.0.0.1:8000/api/v1/titles"

function modal(info) {
    let modalBtn = document.getElementById("modal-btn")
    let modal = document.querySelector(".modal")
    let closeBtn = document.querySelector(".close-btn")
    let modalContent = document.querySelector(".modal-content p")

    modalContent.innerHTML =
        `
            <img class="modal-img" src="${info.image_url}" alt="" />
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

async function detailMovie(movieInfo) {
    let moviesDetails = new Array
    let getDetailMovieRes = await fetch(`${movieInfo.url}`)
    let getDetailMovieData = await getDetailMovieRes.json()
    moviesDetails.push(getDetailMovieData)
    return moviesDetails
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

function createModalButton(selector, imageInfo) {
    selector
    .innerHTML +=
    `
    <button class="modal-btn">
        <img class="modal-img" src="${imageInfo.image_url}" alt="" />
    </button>

    <div class="modal">
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <p></p>
        </div>
    </div>
    `
    for (let btn of selector.children) {
        // console.log(btn)
        btn.onclick = function() {
            modal(detailMovie(imageInfo))
        }

    }
    // selector.children.onclick = function() {
    //     modal(detailMovie(imageInfo))
    // }
}

function getMoviesImages(moviesInfo) {
    let images = new Array

    for (const movie of moviesInfo) {
        images.push(movie.image_url)
    }
    return images
}

function carrousel(moviesImages, id) {
    let firstSection = document.querySelector(`#${id} .slider`)

    for (let image of moviesImages) {
        createModalButton(firstSection, image)
    }
}

function next(moviesImages) {
    let restElement = moviesImages.slice(1)
    let firstElement = moviesImages.slice(0,1)[0]

    restElement.push(firstElement)

    carrousel(restElement, "most_rated_movies")
}

function previous(moviesImages) {

}

function addCategoryName(genre, id) {
    let cat = document.getElementById(id)

    if (genre !== "undefined") {
        cat.innerHTML += `<h1>${genre}</h1>`
    } else {
        cat.innerHTML += `<h1>best movies</h1>`
    }
}

async function categoryMovies(genre, id) {
    addCategoryName(genre, id)

    let movies = new Array
    for (let i = 1; movies.length * 5 < 7; i++) {
        if (genre === "undefined") {
            var moviesRes = await fetch(`${base_url}?page=${i}&sort_by=-avg_vote`)
        } else {
            var moviesRes = await fetch(`${base_url}?page=${i}&sort_by=-avg_vote&genre=${genre}`)
        }
        let moviesData = await moviesRes.json()


        let request = moviesData

        movies.push(request.results)

    }
    let moviesInfo = movies.flat()
    let carrouselMovies = moviesInfo.slice(3)

    carrousel(carrouselMovies, id)

    var imageArray = new Array
    for (const movie of moviesInfo) {
        imageArray.push(movie.image_url)
    }

    document
    .querySelector(`#${id} .slider`)
    .innerHTML +=
    `
    <a class="prev">&#10094;</a>
    <a class="next">&#10095;</a>
    `
    // const btnPrev = document.querySelector(".prev")
    // const btnNext = document.querySelector(".next")

    // btnPrev.addEventListener("click", function () {
    //     console.log("hello")
    // })

}

function changeSlide() {
    categoryMovies("action", "cat_1")
}

bestMovie()
categoryMovies("undefined","most_rated_movies")
categoryMovies("action", "cat_1")
categoryMovies("horror", "cat_2")
categoryMovies("animation", "cat_3")
