let isModalOpen = false;
const plantListEl = document.querySelector(".plant-list");

async function main() {
  const plants = await fetch("https://plants10.p.rapidapi.com/plants");
  const plantsData = await plants.json();
  plantListEl.innerHTML = plantsData.map(plant => plantHTML(plant)).join("");
}

main();

function showPlants(key) {
  localStorage.setItem("id", key);
  window.location.href = `${window.location.origin}/plant.html`
}


function plantsHTML(plant){
    return `<div class="plant-card" onclick="showPlants(${plant.id})">
    <div class="plant-card__container">
        <h3>${plant.name}</h4>
        <p><b>Details:</b> ${plant.details}</p>
        <p><b>Growth Habit:</b> ${plant.growth_habit}</p>
        <p><b>Rarity:</b> ${plant.rarity}</p>
        <p><b>States:</b> ${plant.states}</p>
    </div>
    </div>`;
}

// Growth Habit - https://plants10.p.rapidapi.com/plants/growth_habit
// States - https://plants10.p.rapidapi.com/plants/states
// Rarity - https://plants10.p.rapidapi.com/plants/rarity
// Details - https://plants10.p.rapidapi.com/plants/details

// const postListEl = document.querySelector('.post-list');
// const id = localStorage.getItem("id");

// async function onSearchChange(event) {
//     const id = event.target.value;
//     renderPosts(id)
// }

// async function renderPosts(plantId) {
//   const posts = await fetch(`https://plants10.p.rapidapi.com/plants${plantId || id}`);
//   const postsData = await posts.json();
//   postListEl.innerHTML = postsData.map(post => postHTML(post)).join('');
// }

// function postHTML(post) {
//     return `
//     <div class="post">
//             <div class="post__title">
//                 ${post.title}
//             </div>
//             <p class="post__body">
//                 ${post.body}
//             </p>
//             </div>
//     `
// }

// renderPosts();

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

function toggleModal () {
    if (isModalOpen) {
        isModalOpen = false;
        return document.body.classList.remove("modal--open");
    }
    isModalOpen = true;
    document.body.classList += " modal--open";
}





