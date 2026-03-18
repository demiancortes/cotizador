/* ================================
	CONFIGURACIÓN
================================ */

function generarFormularioConfiguracion() {

	const div = document.getElementById("config-form");

	const configActual =
		JSON.parse(localStorage.getItem(LS_KEYS.CONFIG)) || {
			empresa: "PERSIANAS VIZUAL MAZATLÁN",
			vendedor: "Demian Cortés",
			telefono: "6691 632 351",
			slogan: "Dale a tu hogar el toque que se merece ✨"
		};

	let html = `<form id="form-precios">`;

	function row(label, key) {
		return `
			<div class="d-flex justify-content-between align-items-center mb-2">
				<label class="form-label fw-bold mb-0">${label}</label>
				<input 
					type="number"
					class="form-control precio-input w-50"
					data-key="${key}"
					value="${precios[key]}"
					step="0.01"
					min="0"
					inputmode="decimal">
			</div>
		`;
	}

	function rowText(label, key){
		return `
			<div class="d-flex justify-content-between align-items-center mb-2">
				<label class="form-label fw-bold mb-0">${label}</label>
				<input 
					type="text"
					class="form-control config-input w-50"
					data-key="${key}"
					value="${configActual[key] || ""}">
			</div>
		`;
	}

	html += row("Básico","basico");
	html += row("Intermedio","intermedio");
	html += row("Mejor calidad","premium");
	html += row("Semiblackout","semiBlackout");
	html += row("Blackout","blackout");

	html += `<hr>`;

	html += row("Enrollable Base","enrollableBase");
	html += row("Enrollable Extra","enrollableExtra");

	html += `<hr class="mt-4">`;
	html += `<h6 class="fw-bold mb-3">Configuración del sistema</h6>`;

	html += rowText("Empresa","empresa");
	html += rowText("Vendedor","vendedor");
	html += rowText("Teléfono","telefono");
	html += rowText("Slogan","slogan");

	html += `<button class="btn btn-primary w-100 py-2 mt-3 mb-5">Guardar configuración</button></form>`;

	div.innerHTML = html;

	document.getElementById("form-precios").addEventListener("submit", e => {
		e.preventDefault();

		const nuevos = {};

		document.querySelectorAll(".precio-input").forEach(inp => {
			nuevos[inp.dataset.key] = Number(inp.value);
		});

		localStorage.setItem(LS_KEYS.PRECIOS, JSON.stringify(nuevos));
		Object.assign(precios, nuevos);

		const nuevaConfig = {};

		document.querySelectorAll(".config-input").forEach(inp => {
			nuevaConfig[inp.dataset.key] = inp.value.trim();
		});

		localStorage.setItem(LS_KEYS.CONFIG, JSON.stringify(nuevaConfig));

		alert("Configuración actualizada correctamente.");
		location.reload();
	});
}

generarFormularioConfiguracion();