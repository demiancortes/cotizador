/* ================================
   CONSTANTES Y HELPERS GLOBALES
================================ */

const DEFAULT_PRECIOS = {
	basico: 599,
	intermedio: 850,
	premium: 950,
	semiBlackout: 1250,
	blackout: 1450,
	enrollableBase: 700,
	enrollableExtra: 440
};

const DEFAULT_NOMBRES = {
	basico: "Básico",
	intermedio: "Intermedio",
	premium: "Mejor calidad",
	semiBlackout: "Semiblackout",
	blackout: "Blackout",
	enrollable: "Enrollable"
};

const DEFAULT_COLORES = {
	basico: "#1CC26B",
	intermedio: "#0D6EFD",
	premium: "#6F42C1",
	semiBlackout: "#FFC107",
	blackout: "#DC3545",
	enrollable: "#198754"
};

const LS_KEYS = {
	PRECIOS: "cotizador_precios_v1"
};

const precios = { ...DEFAULT_PRECIOS };
const nombres = { ...DEFAULT_NOMBRES };
const colores = { ...DEFAULT_COLORES };

function fechaCorta() {
	const meses = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
	const f = new Date();
	return `${f.getDate()}-${meses[f.getMonth()]}-${String(f.getFullYear()).slice(2)}`;
}

function calcularPrecio(modelo, ancho, alto) {
	const m2 = ancho * alto;

	if (modelo !== "enrollable") {
		return Math.ceil(m2 * precios[modelo]);
	}

	return Math.ceil((m2 * precios.enrollableBase) + (precios.enrollableExtra * ancho));
}

/* ---------- LocalStorage ---------- */

function initLocalStorage() {
	if (!localStorage.getItem(LS_KEYS.PRECIOS)) {
		localStorage.setItem(LS_KEYS.PRECIOS, JSON.stringify(DEFAULT_PRECIOS));
	}
}

function cargarPrecios() {
	const guardado = JSON.parse(localStorage.getItem(LS_KEYS.PRECIOS)) || {};
	Object.keys(DEFAULT_PRECIOS).forEach(k => {
		precios[k] = Number(guardado[k] ?? DEFAULT_PRECIOS[k]);
	});
}

initLocalStorage();
cargarPrecios();
