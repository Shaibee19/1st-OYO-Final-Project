// *****key!!!!!!*****: 'b1800b0031mshe8a726c7a8fcdc2p17faeajsn0814e57392c3'
// API: https://plants-api-docs.netlify.app/

let isModalOpen = false;
const plantListEl = document.querySelector(".plant-list");
const filterSelect = document.getElementById("filter");

async function main() {
  const token = "YOUR_TREFLE_API_TOKEN_HERE";
  const url = `https://trefle.io/api/v1/plants?token=3_RD8n6fAsTpmUNncke09lMKT8zl21iWnqFgeYxVsjg`;
  const response = await fetch(url);
  const json = await response.json();
  const data = json.data;

  try {
    plantListEl.innerHTML = "<p>Loading plants...</p>";
    const response = await fetch(url, options);
    const data = await response.json();

    // Save the original data for future use (e.g., sorting)
    window.plantData = data;
    displayPlants(data);
  } catch (error) {
    console.error("API Fetch Error:", error);
    plantListEl.innerHTML = "<p>Failed to load plant data.</p>";
  }
}

function displayPlants(plants) {
  const limitedPlants = plants.slice(0, 6); // Only take the first 6
  plantListEl.innerHTML = limitedPlants
    .map((plant) => plantHTML(plant))
    .join("");
}

function plantHTML(plant) {
  return `
    <div class="plant-card">
      <div class="plant-card__container">
        <h4>${plant.common_name || "Unknown Name"}</h4>
        <p><b>Scientific Name:</b> ${plant.scientific_name || "N/A"}</p>
        <p><b>Family:</b> ${plant.family_common_name || "N/A"}</p>
        <p><b>Year Discovered:</b> ${plant.year || "N/A"}</p>
        <p><b>Bibliography:</b> ${plant.bibliography || "N/A"}</p>
      </div>
    </div>
  `;
}

filterSelect.addEventListener("change", function (event) {
  const sortBy = event.target.value;
  let sortedData = [...(window.plantData || [])];

  if (sortBy === "RARITY") {
    const rarityOrder = ["common", "uncommon", "rare", "very rare"];
    sortedData.sort((a, b) => {
      const rA = rarityOrder.indexOf((a.rarity || "").toLowerCase());
      const rB = rarityOrder.indexOf((b.rarity || "").toLowerCase());
      return rA - rB;
    });
  } else {
    sortedData.sort((a, b) => {
      valA = (a[sortBy] || "").toString().toLowerCase();
      valB = (b[sortBy] || "").toString().toLowerCase();
      return valA.localeCompare(valB);
    });
  }

  displayPlants(sortedData);
});

main();

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
