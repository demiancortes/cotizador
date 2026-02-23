/* ================================
   PANTALLA COTIZACIÓN
================================ */

const btnGenerar = document.getElementById("btnGenerar");
const gruposContainer = document.getElementById("grupos-modelos");
const btnGenerarImagen = document.getElementById("btnGenerarImagen");
const btnWhatsApp = document.getElementById("btnWhatsApp");

/* ========= GENERAR COTIZACIÓN ========= */

btnGenerar.addEventListener("click", () => {

	const checks = [...document.querySelectorAll(".filaCheck:checked")];

	if (!checks.length) {
		alert("Selecciona al menos una medida.");
		return;
	}

	const grupos = {};

	checks.forEach(chk => {
		const tr = chk.closest("tr");
		const desc = tr.children[1].textContent.trim();
		const modelo = tr.children[3].textContent.trim();
		const precio = Number(tr.children[4].textContent.replace(/[^0-9.]/g,""));

		if (!grupos[modelo]) {
			const key = Object.keys(nombres).find(k => nombres[k] === modelo);
			grupos[modelo] = { color: colores[key], items: [], subtotal: 0 };
		}

		grupos[modelo].items.push({ desc, precio });
		grupos[modelo].subtotal += precio;
	});

	gruposContainer.innerHTML = "";

	for (const modelo in grupos) {

		const group = grupos[modelo];

		const badge = document.createElement("div");
		badge.className = "model-badge";
		badge.style.background = group.color;
		badge.textContent = modelo;

		const table = document.createElement("table");
		table.className = "group-table mb-2";
		table.innerHTML = `
			<thead>
				<tr>
					<th>Descripción</th>
					<th class="text-end">Precio</th>
				</tr>
			</thead>
			<tbody></tbody>
		`;

		group.items.forEach(item => {
			const tr = document.createElement("tr");
			tr.innerHTML = `
				<td>${item.desc}</td>
				<td class="text-end">$${item.precio}.00</td>
			`;
			table.querySelector("tbody").appendChild(tr);
		});

		const subtotal = document.createElement("div");
		subtotal.className = "group-subtotal mt-2 mb-2";
		subtotal.innerHTML = `
			<div class="d-flex justify-content-between">
				<span class="fw-bold">Total:</span>
				<span class="fw-bold">$${group.subtotal}.00</span>
			</div>
		`;

		gruposContainer.appendChild(badge);
		gruposContainer.appendChild(table);
		gruposContainer.appendChild(subtotal);
	}

	const folio = 1000 + Math.floor(Math.random() * 9000);
	document.getElementById("badge-folio").innerText =
	`COTIZACIÓN #${folio} — ${fechaCorta()}`;

	document.querySelector("[data-target='cotizacion']").click();
});

/* ========= GENERAR IMAGEN ========= */

btnGenerarImagen.addEventListener("click", async () => {

	const section = document.getElementById("cotizacion");
	const nav = document.querySelector(".bottom-nav");

	nav.style.display = "none";
	btnGenerarImagen.style.display = "none";
	btnWhatsApp.style.display = "none";

	const canvas = await html2canvas(section, {
		scale: 2,
		useCORS: true,
		scrollY: -window.scrollY
	});

	nav.style.display = "";
	btnGenerarImagen.style.display = "";
	btnWhatsApp.style.display = "";

	const link = document.createElement("a");
	link.download = `cotizacion_${Math.floor(Math.random()*9000)}.png`;
	link.href = canvas.toDataURL("image/png");
	link.click();
});

/* ========= WHATSAPP ========= */

btnWhatsApp.addEventListener("click", () => {

	const checks = [...document.querySelectorAll(".filaCheck:checked")];

	if (!checks.length) {
		alert("Selecciona al menos una medida para compartir.");
		return;
	}

	const grupos = {};

	checks.forEach(chk => {
		const tr = chk.closest("tr");
		const desc = tr.children[1].textContent.trim();
		const modelo = tr.children[3].textContent.trim();
		const precio = Number(tr.children[4].textContent.replace(/[^0-9.]/g,""));

		if (!grupos[modelo]) {
			grupos[modelo] = { items: [], total: 0 };
		}

		grupos[modelo].items.push({ desc, precio });
		grupos[modelo].total += precio;
	});

	let texto = `Cotización – Persianas Vizual Mazatlán ✨\n\n`;

	for (const modelo in grupos) {
		texto += `${modelo}\n`;

		grupos[modelo].items.forEach(item => {
			texto += `• ${item.desc} — $${item.precio}\n`;
		});

		texto += `*Total ${modelo}: $${grupos[modelo].total}*\n\n`;
	}

	texto += `—\nDemian Cortés\n📲 6691 632 351`;

	const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
	window.open(url, "_blank");
});
