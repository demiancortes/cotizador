/* ================================
	CONFIGURACIÓN
================================ */

function generarFormularioConfiguracion() {

	const div = document.getElementById("config-form");
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

	html += row("Básico","basico");
	html += row("Intermedio","intermedio");
	html += row("Mejor calidad","premium");
	html += row("Semiblackout","semiBlackout");
	html += row("Blackout","blackout");
	html += `<hr>`;
	html += row("Enrollable Base","enrollableBase");
	html += row("Enrollable Extra","enrollableExtra");

	html += `<button class="btn btn-primary w-100 py-2 mt-3 mb-5">Guardar</button></form>`;

	div.innerHTML = html;

	document.getElementById("form-precios").addEventListener("submit", e => {
		e.preventDefault();

		const nuevos = {};

		document.querySelectorAll(".precio-input").forEach(inp => {
			nuevos[inp.dataset.key] = Number(inp.value);
		});

		localStorage.setItem(LS_KEYS.PRECIOS, JSON.stringify(nuevos));
		Object.assign(precios, nuevos);

		alert("Precios actualizados correctamente.");
		location.reload();
	});
}

generarFormularioConfiguracion();
