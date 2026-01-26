function addMovie() {
    const input = document.getElementById("movie_input");
    const movieName = input.value.trim();
    if (!movieName) return;
    
    let movies = JSON.parse(localStorage.getItem("movies")) || [];
    movies.push(movieName);
    localStorage.setItem("movies", JSON.stringify(movies));

    renderMovies();
    input.value = "";
}

function renderMovies() {
    const container = document.getElementById("movie_list");
    container.innerHTML = "";

    const movies = JSON.parse(localStorage.getItem("movies")) || [];

    if (movies.length === 0) {
        const empty = document.createElement("div");
        empty.textContent = "ยังไม่มีรายการโปรด";
        empty.style.opacity = "0.6";
        container.appendChild(empty);
        return;
    }

    movies.forEach((movie, index) => {
        const movie_div = document.createElement("div");
        movie_div.id = "mov";
        
        const movieNameElement = document.createElement("span");
        movieNameElement.textContent =  "🎬 " + movie;
        
        const del_button = document.createElement("button");
        del_button.id = "del";
        del_button.textContent = "ลบ";
        del_button.addEventListener("click", function() {
            deleteMovie(index);
        });
        
        movie_div.appendChild(movieNameElement);
        movie_div.appendChild(del_button);
        container.appendChild(movie_div);
    });
}


function deleteAll() {
    localStorage.clear();
    renderMovies();
}

document.addEventListener("DOMContentLoaded", renderMovies);

function deleteMovie(index) {
    let movies = JSON.parse(localStorage.getItem("movies")) || [];
    movies.splice(index, 1);
    localStorage.setItem("movies", JSON.stringify(movies));
    renderMovies();
}
