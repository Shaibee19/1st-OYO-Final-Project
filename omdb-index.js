const apiKey = "4ea1d0b9"

// GRABBING ELEMENTS FROM HTML
let isModalOpen = false;
const movieListEl = document.querySelector(".movie-list");
//   movieListEl.innerHTML = "<p>Loading movies...</p>";
const searchName = document.querySelector(".searchName")

// GLOBAL MOVIES VARIABLE
let currentMovies = [];

// SEARCH BUTTON
function onSearchChange(event) {
  main(event.target.value);
  searchName.innerHTML = event.target.value;
}

// CALLING API
async function main(searchInput) {
  try {
    const movies = await fetch(`http://www.omdbapi.com/?s=${searchInput}&apikey=${apiKey}`);
    const moviesData = await movies.json();
    currentMovies = moviesData.Search;
    displayMovies(currentMovies);
  
  // DISPLAYING MOVIES
  function displayMovies(movieList) {
    if (moviesData.Response === "True" && currentMovies) {
      movieListEl.innerHTML = currentMovies.map((movie) => movieHTML(movie))
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
  } catch (err) {
    console.error("Error fetching movies:", err);
    movieListEl.innerHTML =
      "<p>An error occurred while rounding up those mooviez. Please try again later.</p>";
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

// SORT BUTTON
function onSortChange(event) {
  const sortOption = event.target.value;

  let sortedMovies = [...currentMovies]

  if (sortOption === "NEWEST") {
    sortedMovies.sort((a, b) => parseInt(b.Year - a.Year))
  } else if (sortOption === "OLDEST") {
    sortedMovies.sort((a, b) => parseInt(a.Year - b.Year))
  } else if (sortOption === "DESCENDING") {
    sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title))
  } else if (sortOption === "ASCENDING") {
    sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title))
  }

  displayMovies();
}

// THEME TOGGLE (dark/light)
const toggleBtn = document.getElementById("theme-toggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggleBtn.textContent = document.body.classList.contains("dark-mode")
    ? "Light Mode"
    : "Dark Mode";
  console.log("dark");
});

// MODAL
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
