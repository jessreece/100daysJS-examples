// VARIABLES
const modal = document.querySelector(".modal"),
    btn = document.querySelector(".btn"),
    closing = document.querySelector(".close");

btn.addEventListener("click", openModal);
closing.addEventListener("click", closeModal);
modal.addEventListener("click", closeModal);

// open modal
function openModal(e) {
    e.preventDefault();
    modal.style.display = "block";
}

// close modal
function closeModal(e) {
    modal.style.display = "none";
}