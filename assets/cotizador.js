/* ================================
   PANTALLA COTIZADOR
================================ */

const descInput = document.getElementById("desc");
const anchoInput = document.getElementById("ancho");
const altoInput = document.getElementById("alto");
const tabla = document.getElementById("tabla-medidas");
const selectAll = document.getElementById("selectAll");

function crearFilaTabla(desc, ancho, alto, modelo, precio) {
	const tr = document.createElement("tr");

	tr.innerHTML = `
		<td><input type="checkbox" class="filaCheck"></td>
		<td>${desc}</td>
		<td>${ancho.toFixed(2)} x ${alto.toFixed(2)}</td>
		<td>
			<span class="badge" style="background:${colores[modelo]}; color:white;">
				${nombres[modelo]}
			</span>
		</td>
		<td class="text-end">$${precio}.00</td>
	`;

	return tr;
}

document.getElementById("btnAgregar").addEventListener("click", () => {

	const desc = descInput.value.trim();
	const ancho = parseFloat(anchoInput.value);
	const alto = parseFloat(altoInput.value);

	if (!desc || isNaN(ancho) || isNaN(alto) || ancho <= 0 || alto <= 0) {
		alert("Llena correctamente descripción, ancho y alto.");
		return;
	}

	const modelos = [];
	["basico","intermedio","premium","semiBlackout","blackout","enrollable"]
	.forEach(id => {
		if (document.getElementById(id).checked) modelos.push(id);
	});

	if (!modelos.length) {
		alert("Selecciona al menos un modelo.");
		return;
	}

	if (tabla.children.length === 1 && tabla.children[0].children[0].colSpan === 5) {
		tabla.innerHTML = "";
	}

	modelos.forEach(modelo => {
		const precio = calcularPrecio(modelo, ancho, alto);
		tabla.appendChild(crearFilaTabla(desc, ancho, alto, modelo, precio));
	});

	descInput.value = "";
	anchoInput.value = "";
	altoInput.value = "";
	document.querySelectorAll(".form-check-input").forEach(i => i.checked = false);
});

selectAll.addEventListener("change", () => {
	document.querySelectorAll(".filaCheck")
	.forEach(ch => ch.checked = selectAll.checked);
});
