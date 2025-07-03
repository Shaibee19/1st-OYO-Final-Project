async function main() {
  const movies = await fetch("http://www.omdbapi.com/?i=tt3896198&apikey=4ea1d0b9");
  const moviesData = await movies.json();
  const movieListEl = document.querySelector(".movie-list")

  console.log(moviesData);
  movieListEl.innerHTML = moviesData
    .map(
      (movie) => 
        `<div class="movie-card">
          <div class="movie-card__container">
          <img src=${movie.Poster} alt=""/>
            <div class="movie-card__info">
            <h4>${movie.Title}</h4>
            <p><b>Year:</b> ${movie.Year}</p>
            <p><b>Genre:</b> ${movie.Genre}</p>
            <p><b>Rating:</b> ${movie.Rating}</p>
            </div>
          </div>
        </div>`
    )
    .join("");
}

main();

// const apiKey = "4ea1d0b9";
// const movieListEl = document.querySelector(".movie-list");
// const searchForm = document.getElementById("search-form");
// const searchInput = document.getElementById("search-input");
// const toggleBtn = document.getElementById("theme-toggle");

// let isModalOpen = false;

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
//   movieListEl.innerHTML = movies.map(movieHTML).join("");
// }

// function movieHTML(movie) {
//   return `
//     <div class="movie-card">
//       <img src="\${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x445?text=No+Image"}" alt="\${movie.Title}" />
//       <div class="movie-card__info">
//         <h4>\${movie.Title}</h4>
//         <p><b>Year:</b> \${movie.Year}</p>
//         <p><b>Type:</b> \${movie.Type}</p>
//       </div>
//     </div>
//   `;
// }

// Theme toggle (dark/light)
// toggleBtn.addEventListener("click", () => {
//   document.body.classList.toggle("dark-mode");
//   toggleBtn.textContent = document.body.classList.contains("dark-mode")
//     ? "Switch to Light Mode"
//     : "Switch to Dark Mode";
// });

// Modal
// function contact(event) {
//   event.preventDefault();
//   const loading = document.querySelector(".modal__overlay--loading");
//   const success = document.querySelector(".modal__overlay--success");
//   loading.classList += " modal__overlay--visible";
//   emailjs
//     .sendForm(
//       "service_lq4pqm1",
//       "template_j57chsp",
//       event.target,
//       "M_OoP5ANfy9nBleaM"
//     )
//     .then(() => {
//       loading.classList.remove("modal__overlay--visible");
//       success.classList += " modal__overlay--visible";
//     })
//     .catch(() => {
//       loading.classList.remove("modal__overlay--visible");
//       alert(
//         "The email service is temporarily unavailable. Please contact me directly at shaipattzgray@gmail.com"
//       );
//     });
// }

// function toggleModal() {
//   if (isModalOpen) {
//     isModalOpen = false;
//     return document.body.classList.remove("modal--open");
//   }
//   isModalOpen = true;
//   document.body.classList += " modal--open";
// }
