
// fetch("http://127.0.0.1:8000/api/v1/titles?sort_by=-imdb_score")
//     .then(function(res) {
//         if (res.ok) {
//             return res.json();
//         }
//     })
//     .then(function(data) {
//         bestMovies.push(data)
//         console.log(bestMovies[0])
//     })

//     .catch(function(err) {
//         console.log("An error has occured !")
//     });



// async function getBestMovies() {
//     let response = await fetch("http://127.0.0.1:8000/api/v1/titles?sort_by=-imdb_score");
//     let data = await response.json();
//     return data
// }


// getBestMovies()
//     .then(function(res) {
//         var bestMovieImage = new Image(500, 500);
//         bestMovieImage.src = res.results[0].image_url;

//         document
//         .getElementById('best_movie')
//         .innerHTML = `<img width="500" height="500" src="${res.results[0].image_url}">`;
//         // .appendChild(bestMovieImage)
//     }
// )

// async function getMostRatedMovies() {
//     let response = await Promise.all([
//         fetch("http://127.0.0.1:8000/api/v1/titles?sort_by=-imdb_score").then((value)=> value.json()),
//         fetch("http://127.0.0.1:8000/api/v1/titles?page=2&sort_by=-imdb_score").then((value)=> value.json())
//     ]);
//     return response
// }



class Movies {
    constructor(url) {
        this.url = url;
    }

    async getDetailMovie(id) {
        return await (await fetch(`${this.url}/${id}`)).json()
    }

    async getBestMovie () {
        await (await fetch(`${this.url}?sort_by=-imdb_score`)).json()
        .then(function(res) {
            var bestMovieImage = new Image(500, 500);
            bestMovieImage.src = res.results[0].image_url;

            document
            .getElementById('best_movie')
            .appendChild(bestMovieImage)

            bestMovieImage.addEventListener("click", (event) => {
                event.preventDefault()
                console.log(res.results[0].id.toString())
                // this.getDetailMovie(res.results[0].id)
            })
        })
    }

    getMostRatedMovies() {


    }
}

var movie = new Movies("http://127.0.0.1:8000/api/v1/titles");
movie.getBestMovie()
