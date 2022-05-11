"use strict";

document.addEventListener("DOMContentLoaded", function () {
	window.addEventListener("scroll", function () {
		if (window.scrollY > 70) {
			document.getElementById("navbar_top").classList.add("fixed-top");
			let navbar_height = document.querySelector(".navbar");
			document.body.style.paddingTop = navbar_height;
		} else {
			document.getElementById("navbar_top").classList.remove("fixed-top");
			document.body.style.paddingTop = 0;
		}
	});
});
const boxpesquisa = document.querySelector(".search");
const pesquisa = document.querySelector(".input");
const listanoticias = document.querySelector(".gallery");
const defaultdata = new Intl.DateTimeFormat("pt-BR");
boxpesquisa.addEventListener("submit", busca);

function getdatamenos() {
	let datapesquisamenos = document.querySelector("#pesquisapordatamenos").value;
	// console.log(datapesquisamenos);
	return datapesquisamenos;
}
console.log(getdatamenos());

function getdatamais() {
	let datapesquisamais = document.querySelector("#pesquisapordatamais").value;
	// console.log(datapesquisamais);
	return datapesquisamais;
}
console.log(getdatamais());

function getlimit() {
	let limite = document.getElementById("select").value;
	return limite;
}
getlimit();
console.log(getlimit());

function busca(e) {
	listanoticias.innerHTML = "";
	e.preventDefault();
	let topico = pesquisa.value;

	spinner.removeAttribute("hidden");

	(async function () {
		try {
			let url = `https://api.spaceflightnewsapi.net/v3/articles?title_contains=${topico}&_limit=${getlimit()}`;
			if (getdatamais()) {
				url =
					url +
					`&publishedAt_lt=${getdatamenos()}T23:59:59.999Z&publishedAt_gt=${getdatamais()}T00:00:00.000Z/count`;
				// `&publishedAt_gt=${getdatamais()}T00:00:00.000Z&publishedAt_lt=${getdatamenos()}T23:59:59.999Z`;
			}
			const req = await fetch(url);
			const jsondata = await req.json();
			console.log(jsondata);
			for (const noticias of jsondata) {
				console.log(noticias);
			}
			jsondata.forEach((article) => {
				let card = document.createElement("div");
				let a = document.createElement("a");
				let img = document.createElement("img");
				let label = document.createElement("label");
				img.src = article.imageUrl;
				let bgimage = img.src;
				let data = new Date(article.publishedAt);
				let datacorreta = defaultdata.format(data);
				card.setAttribute("class", "gallery-card");
				card.setAttribute("style", "background-image: url(" + bgimage + ")");
				a.setAttribute("href", article.url);
				a.setAttribute("target", "_blank");
				a.setAttribute("class", "gallery-card-btn");
				a.textContent = article.title;
				label.textContent = " publicado em: " + "" + datacorreta;

				listanoticias.appendChild(card);
				card.appendChild(a);
				card.appendChild(label);
				spinner.setAttribute("hidden", "");
			});
		} catch (e) {
			console.log("error");
		}
	})();
	if (!spinner.classList.contains("hidden")) {
		setTimeout(() => {
			spinner.setAttribute("hidden", "");
		}, "5000");

		setTimeout();
	}
}