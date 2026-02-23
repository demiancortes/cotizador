/* ================================
   NAVEGACIÓN GENERAL
================================ */

const navLinks = document.querySelectorAll(".bottom-nav .nav-link");
const screens = document.querySelectorAll(".screen");

navLinks.forEach(link => {
	link.addEventListener("click", (e) => {
		e.preventDefault();

		navLinks.forEach(l => l.classList.remove("active"));
		link.classList.add("active");

		const target = link.dataset.target;

		screens.forEach(s => s.classList.add("d-none"));
		document.getElementById(target).classList.remove("d-none");
	});
});
