/*
  TVK DIGITAL GALLERY — SIMPLE PHOTO MANAGEMENT
  To add photos: place image files in /images/... and add a new item
  to the photos array below. Newest items should be placed first.
  This static GitHub Pages site does not have a server-side upload dashboard.
*/

const photos = [
  { title: "Together in the community", category: "Community", date: "2026-11-08", image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=85" },
  { title: "A gathering to remember", category: "Events", date: "2026-11-06", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=85" },
  { title: "Moments of celebration", category: "Celebrations", date: "2026-11-04", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=85" },
  { title: "Working side by side", category: "Community", date: "2026-10-29", image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=85" },
  { title: "An evening together", category: "Events", date: "2026-10-24", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=85" },
  { title: "A special occasion", category: "Celebrations", date: "2026-10-18", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=85" },
  { title: "Community spirit", category: "Community", date: "2026-10-12", image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1000&q=85" },
  { title: "People coming together", category: "Events", date: "2026-10-05", image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=85" },
  { title: "Festival lights", category: "Celebrations", date: "2026-09-28", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=85" }
];

// Replace these sample portrait records with approved local profile photographs and details.
const personalities = [
  { name: "Add personality name", role: "Add designation", image: ""C:\Users\Harikrishna Babu\OneDrive\Pictures\WhatsApp Image 2026-06-20 at 12.53.501 PM.jpg"" },
  { name: "Add personality name", role: "Add designation", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=85" },
  { name: "Add personality name", role: "Add designation", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=85" },
  { name: "Add personality name", role: "Add designation", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=85" }
];

const grid = document.getElementById("galleryGrid");
const count = document.getElementById("photoCount");
const searchInput = document.getElementById("searchInput");
let activeFilter = "All";
let visiblePhotos = [...photos];
let currentPhotoIndex = 0;

function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  return Number.isNaN(date.getTime()) ? dateString : date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function renderGallery() {
  const query = searchInput.value.trim().toLowerCase();
  visiblePhotos = photos.filter(photo => {
    const matchesFilter = activeFilter === "All" || photo.category === activeFilter;
    const matchesSearch = `${photo.title} ${photo.category} ${photo.date}`.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  grid.innerHTML = "";
  if (!visiblePhotos.length) {
    grid.innerHTML = '<div class="empty-state">No photographs found. Try another search or category.</div>';
  } else {
    visiblePhotos.forEach((photo, index) => {
      const card = document.createElement("button");
      card.className = "photo-card";
      card.type = "button";
      card.setAttribute("aria-label", `View ${photo.title}`);
      card.innerHTML = `
        <img src="${photo.image}" alt="${photo.title}" loading="lazy">
        <span class="photo-overlay"><small>${photo.category.toUpperCase()} · ${formatDate(photo.date)}</small><strong>${photo.title}</strong><span>↗</span></span>`;
      card.addEventListener("click", () => openLightbox(index));
      grid.appendChild(card);
    });
  }
  count.textContent = `Showing ${visiblePhotos.length} photograph${visiblePhotos.length === 1 ? "" : "s"}`;
}

function renderPeople() {
  const peopleGrid = document.getElementById("peopleGrid");
  peopleGrid.innerHTML = personalities.map(person => `
    <article class="person-card">
      <div class="person-photo"><img src="${person.image}" alt="${person.name}" loading="lazy"></div>
      <div class="person-info"><small>PROFILE</small><h3>${person.name}</h3><p>${person.role}</p></div>
    </article>`).join("");
}

function openLightbox(index) {
  currentPhotoIndex = index;
  updateLightbox();
  const box = document.getElementById("lightbox");
  box.classList.add("open");
  box.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function updateLightbox() {
  const photo = visiblePhotos[currentPhotoIndex];
  if (!photo) return;
  document.getElementById("lightboxImage").src = photo.image;
  document.getElementById("lightboxImage").alt = photo.title;
  document.getElementById("lightboxTitle").textContent = photo.title;
  document.getElementById("lightboxMeta").textContent = `${photo.category} · ${formatDate(photo.date)}`;
}
function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.getElementById("lightbox").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
function moveLightbox(direction) {
  currentPhotoIndex = (currentPhotoIndex + direction + visiblePhotos.length) % visiblePhotos.length;
  updateLightbox();
}

document.getElementById("filters").addEventListener("click", event => {
  const button = event.target.closest(".filter-btn");
  if (!button) return;
  activeFilter = button.dataset.filter;
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.toggle("active", btn === button));
  renderGallery();
});
searchInput.addEventListener("input", renderGallery);
document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
document.getElementById("lightboxPrev").addEventListener("click", () => moveLightbox(-1));
document.getElementById("lightboxNext").addEventListener("click", () => moveLightbox(1));
document.getElementById("lightbox").addEventListener("click", event => { if (event.target.id === "lightbox") closeLightbox(); });
document.addEventListener("keydown", event => {
  if (!document.getElementById("lightbox").classList.contains("open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") moveLightbox(-1);
  if (event.key === "ArrowRight") moveLightbox(1);
});
document.querySelectorAll("[data-event-filter]").forEach(card => card.addEventListener("click", () => {
  activeFilter = card.dataset.eventFilter;
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.toggle("active", btn.dataset.filter === activeFilter));
  renderGallery();
}));
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => mainNav.classList.remove("open")));
document.getElementById("year").textContent = new Date().getFullYear();

renderGallery();
renderPeople();
