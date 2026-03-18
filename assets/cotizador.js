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

	tr.dataset.descripcion = desc;
	tr.dataset.ancho = ancho;
	tr.dataset.alto = alto;

	tr.innerHTML = `
		<td><input type="checkbox" class="filaCheck"></td>
		<td>${desc}</td>
		<td class="text-nowrap">${ancho.toFixed(2)} x ${alto.toFixed(2)}</td>
		<td>
			<span class="badge" style="background:${colores[modelo]}; color:white;">
				${nombres[modelo]}
			</span>
		</td>
		<td class="text-end">$${precio}.00</td>
		<td class="text-end">
			<button class="btn btn-sm btn-outline-primary me-1"
				data-bs-toggle="tooltip"
				data-bs-placement="top"
				title="Copiar"
				onclick="copiarMedida(this)">
				<i class="bi bi-files"></i>
			</button>
			<button class="btn btn-sm btn-outline-danger"
				data-bs-toggle="tooltip"
				data-bs-placement="top"
				title="Eliminar"
				onclick="eliminarFila(this)">
				<i class="bi bi-trash"></i>
			</button>
		</td>
	`;

	return tr;
}

function copiarMedida(btn) {
	const fila = btn.closest("tr");

	descInput.value = fila.dataset.descripcion;
	anchoInput.value = fila.dataset.ancho;
	altoInput.value = fila.dataset.alto;

	descInput.focus();
}

function eliminarFila(btn) {
	const ok = confirm("¿Eliminar esta medida?");
	if (!ok) return;
	const fila = btn.closest("tr");
	fila.remove();
}

function obtenerModelosSeleccionados(){

	const modelos = [];

	if (document.getElementById("basico").checked)
		modelos.push("basico");

	if (document.getElementById("intermedio").checked)
		modelos.push("intermedio");

	if (document.getElementById("premium").checked)
		modelos.push("premium");

	if (document.getElementById("semiBlackout").checked)
		modelos.push("semiBlackout");

	if (document.getElementById("blackout").checked)
		modelos.push("blackout");

	if (document.getElementById("enrollable").checked)
		modelos.push("enrollable");

	return modelos;
}

document.getElementById("btnModeloExtra").addEventListener("click", () => {

	const checksFilas = [...document.querySelectorAll(".filaCheck:checked")];

	if (!checksFilas.length){
		alert("Selecciona al menos una medida.");
		return;
	}

	const modelos = obtenerModelosSeleccionados();

	if (!modelos.length){
		alert("Selecciona al menos un modelo arriba.");
		return;
	}

	checksFilas.forEach(chk => {

		const fila = chk.closest("tr");

		const desc = fila.dataset.descripcion;
		const ancho = parseFloat(fila.dataset.ancho);
		const alto = parseFloat(fila.dataset.alto);

		console.log("medidas: ",  ancho, alto)

		modelos.forEach(modelo => {
			const precio = calcularPrecio(modelo, ancho, alto);
			const nuevaFila = crearFilaTabla(desc, ancho, alto, modelo, precio);
			document.getElementById("tabla-medidas").appendChild(nuevaFila);
		});

	});

	activarTooltips();

});

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

	// ⭐ Guardar tabla base de medidas
	const htmlTabla = document.getElementById("tabla-medidas").innerHTML;
	localStorage.setItem("tablaMedidas", htmlTabla);
});

selectAll.addEventListener("change", () => {
	document.querySelectorAll(".filaCheck")
	.forEach(ch => ch.checked = selectAll.checked);
});

document.getElementById("btnNuevaCotizacion").addEventListener("click", () => {
	const ok = confirm("¿Deseas iniciar una nueva cotización?");
	if (!ok) return;
	localStorage.removeItem("tablaMedidas");
	document.getElementById("desc").focus();
	document.getElementById("tabla-medidas").innerHTML = `<tr><td colspan="5" class="text-center text-muted py-4">Aún no agregas ninguna medida</td></tr>`;
});

document.addEventListener("DOMContentLoaded", () => {
	const guardada = localStorage.getItem("tablaMedidas");
	if (!guardada) return;
	document.getElementById("tabla-medidas").innerHTML = guardada;
	setTimeout(() => {
		document.getElementById("desc").focus();
	}, 200);
});