// apiKey = "4ea1d0b9"

let isModalOpen = false;
const movieListEl = document.querySelector(".movie-list");
//   movieListEl.innerHTML = "<p>Loading movies...</p>";
const searchName = document.querySelector(".searchName")
let currentMovies = [];

// Search Button || Calling/Displaying API
function onSearchChange(event) {
  main(event.target.value);
  searchName.innerHTML = event.target.value;
}


async function main(searchInput) {
  try {
    const movies = await fetch(`http://www.omdbapi.com/?s=${searchInput}&apikey=4ea1d0b9`);
    const moviesData = await movies.json();
    currentMovies = moviesData.Search;
    displayMovies(currentMovies);
  } catch (err) {
    console.error("Error fetching movies:", err);
    movieListEl.innerHTML =
      "<p>An error occurred while rounding up those mooviez. Please try again later.</p>";
  }
}
    
function displayMovies(movieList) {
    if (moviesData.Response === "True" && movieList) {
      movieListEl.innerHTML = movieList.map((movie) => movieHTML(movie))
        .slice(0, 6)
        .join("");
    } else {
      movieListEl.innerHTML =
        "<p>No mooviez found for your search. Please low a different term.</p>";
      console.warn(
        "OMDB API response:",
        moviesData.Error || "No search results."
      );
    }
  }

function movieHTML(movie) {
  return `<div class="movie-card" onClick="movieDetails()">
            <div class="movie-card__container">
            <img src=${movie.Poster} alt=""/>
              <div class="movie-card__info">
                <h4>${movie.Title}</h4>
                <p><b>Year:</b> ${movie.Year}</p>
                <p><b>Genre:</b> ${movie.Genre}</p>
                <p><b>Rating:</b> ${movie.Rating}</p>
              </div>
            </div>
          </div>`;
}

function movieDetails() {
  // console.log("Displaying details for movie ID:", imdbID)
  // window.location.href = `movie-details.html?id=${imdbID}`;
  alert("Haven't done this coding yet :'[");
}

main("lion");

// Sort Button
function onSortChange(event) {
  const sortOption = event.target.value;

  let sortedMovies = [...currentMovies]

  if (sortOption === "newest") {
    sortedMovies.sort((a, b) => b.Year - a.Year)
  } else if (sortOption === "oldest") {
    sortedMovies.sort((a, b) => a.Year - b.Year)
  }

  displayMovies(sortedMovies);
}

// Theme toggle (dark/light)
const toggleBtn = document.getElementById("theme-toggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggleBtn.textContent = document.body.classList.contains("dark-mode")
    ? "Light Mode"
    : "Dark Mode";
  console.log("dark");
});

// Modal
function contact(event) {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  loading.classList += " modal__overlay--visible";
  emailjs
    .sendForm(
      "service_lq4pqm1",
      "template_j57chsp",
      event.target,
      "M_OoP5ANfy9nBleaM"
    )
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList += " modal__overlay--visible";
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visible");
      alert(
        "The email service is temporarily unavailable. Please contact me directly at shaipattzgray@gmail.com"
      );
    });
}

function toggleModal() {
  if (isModalOpen) {
    isModalOpen = false;
    return document.body.classList.remove("modal--open");
  }
  isModalOpen = true;
  document.body.classList += " modal--open";
}
