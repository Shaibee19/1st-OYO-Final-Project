let isModalOpen = false;
const movieListEl = document.querySelector(".movie-list");

async function main() {
  // const apiKey = "4ea1d0b9"
  const movies = await fetch("http://www.omdbapi.com/?s=fast&apikey=4ea1d0b9");
  const moviesData = await movies.json();
  // const searchForm = document.getElementById("search-form");
  // const searchInput = document.getElementById("search-input");
  movieListEl.innerHTML = moviesData.Search.map((movie) => movieHTML(movie))
  .slice(0, 6)
  .join("");
}

main();

function displayMovies(imdbID) {
  console.log(window.location);
  // window.location.href = `http://127.0.0.1:5500/drivein.html`
  // console.log(imdbID);
}

function movieHTML(movie) {
  return `<div class="movie-card" onClick="displayMovies(${movie.imdbID})">
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

// Event listener for search
// searchForm.addEventListener("submit", async function (e) {
//   e.preventDefault();
//   const query = searchInput.value.trim();
//   if (!query) return;

//   const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`;
//   movieListEl.innerHTML = "<p>Loading movies...</p>";

//   try {
//     const res = await fetch(url);
//     const data = await res.json();

//     if (data.Response === "False") {
//       movieListEl.innerHTML = "<p>No results found.</p>";
//     } else {
//       displayMovies(data.Search);
//     }
//   } catch (err) {
//     movieListEl.innerHTML = "<p>Failed to load movie data.</p>";
//     console.error(err);
//   }
// });

// function displayMovies(movies) {
//   // Save globally for sorting
//   window.foundMovies = movies;

// document.getElementById("filter").addEventListener("change", function (e) {
//   const key = e.target.value;
//   const sorted = [...(window.foundMovies || [])];

//   sorted.sort((a, b) => {
//     const valA = a[key] ? a[key].toString().toLowerCase() : "";
//     const valB = b[key] ? b[key].toString().toLowerCase() : "";
//     return valA.localeCompare(valB);
//   });

//   displayMovies(sorted);
// });

const toggleBtn = document.getElementById("theme-toggle");

// Theme toggle (dark/light)
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
