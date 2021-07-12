const base_url = "http://127.0.0.1:8000/api/v1/titles"
// const modals = document.querySelectorAll(".modal-btn")

function modal(info) {

    // let btn = document.getElementById(`${info.id}`)
    // let btn = document.querySelectorAll(".modal-btn")
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

    // btn.onclick = function() {
    modal.style.display = "block"
    // }
    // btn.onclick = function() {
    //     modal.style.display = "block"
    // }

    // modal.style.display = "block"
    // console.log(btn)

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
    let getDetailMovieRes = await fetch(`${movieInfo.url}`)
    let getDetailMovieData = await getDetailMovieRes.json()
    return getDetailMovieData
}

async function bestMovie() {
    let getBestMoviesResponse = await fetch(`${base_url}?sort_by=-imdb_score`)
    let getBestMoviesData = await getBestMoviesResponse.json()

    let modalBtn = document.querySelector(".modal-btn")

    modalBtn
    .innerHTML =
        `
            <img class="modal-img" src="${getBestMoviesData.results[0].image_url}" />
            <p>${getBestMoviesData.results[0].title}</p>
        `

    let best_movie = document.getElementById("bm_id")

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
    <button class="modal-btn" id="btn_${imageInfo.id}">
        <img class="modal-img" src="${imageInfo.image_url}" alt="" />
    </button>
    `

    var myEl = document.getElementById(`btn_${imageInfo.id}`)

    myEl.onclick = async function() {
        let res = await detailMovie(imageInfo)
        modal(res)
    }
    console.log(myEl.onclick)


    // selector.onclick = async function() {
    //     let res = await detailMovie(imageInfo)
    //     modal(res)
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
    let lastElement = moviesImages.slice(-1)[0]
    moviesImages.unshift(lastElement)
    return moviesImages.slice(0,7)
}

function previous(moviesImages) {
    return moviesImages.slice(1).concat(moviesImages.slice(0,1))
}

function addCategoryName(genre, id) {
    let cat = document.querySelector(`#${id} .category_name`)

    if (genre !== "undefined") {
        cat.innerText += `${genre}`
    } else {
        cat.innerText += `best movies`
    }
}

async function getData(genre, best_movie=false) {
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

    return carrouselMovies
}

function addArrows(genre, id) {
    document
    .querySelector(`#${id} .slider`)
    .innerHTML +=
    `
    <a id="prev_${genre}" class="prev">&#10094;</a>
    <a id="next_${genre}" class="next">&#10095;</a>
    `
}


async function categoryMovies(genre, id) {
    addCategoryName(genre, id)

    let dataMovies = await getData(genre)

    carrousel(dataMovies, id)

    // addArrows(genre, id)

    // next(dataMovies)

    // const btnPrev = document.getElementById(".prev")
    // const btnNext = document.querySelector(".next")

    // for (let movieInfo of dataMovies) {
    //     modal(movieInfo)
    // }

    // btnNext.addEventListener("click", function() {
        // let modal = document.querySelector(".modal")
    // })

    // modal(dataMovies)

    // btnPrev.addEventListener("click", function () {
    //     console.log("hello")
    // })

}

bestMovie()
categoryMovies("undefined","most_rated_movies")
categoryMovies("action", "cat_1")
categoryMovies("horror", "cat_2")
categoryMovies("animation", "cat_3")
