let isModalOpen = false;
const userListEl = document.querySelector(".user-list");

async function main() {
  const users = await fetch("https://plants10.p.rapidapi.com/plants");
  const usersData = await users.json();
  userListEl.innerHTML = usersData.map(user => userHTML(user)).join("");
}

main();

function showUserPosts(id) {
    localStorage.setItem("id", id);
    window.location.href = `${window.location.origin}/user.html`
}

function userHTML(user){
    return `<div class="user-card" onclick="showUserPosts(${user.id})">
    <div class="user-card__container">
        <h3>${user.name}</h4>
        <p><b>Email:</b> ${user.email}</p>
        <p><b>Phone:</b> ${user.phone}</p>
        <p><b>Website:</b> <a href="https://${user.website}" target="_blank">${user.website}</a></p>
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

// async function renderPosts(userId) {
//   const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId || id}`);
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





