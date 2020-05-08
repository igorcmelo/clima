var key   = "d0c9f774076b8c7cd5e2f24a8508ae90";
var lang  = "pt";
var units = "metric";

var url  = `https://api.openweathermap.org/data/2.5/weather?appid=${key}`;
	 url += `&lang=${lang}&units=${units}`;



window.onload = () => {
	_status.innerHTML = "Iniciando...";
	if ("geolocation" in navigator) {

		// Pegar coordenadas do usuário
		_status.innerHTML += "<br>Coletando coordenadas... <br>É necessário ativar a localização";

		navigator.geolocation.getCurrentPosition((pos) => {
			let lati;
			let longi;
			lati  = pos.coords.latitude;
			longi = pos.coords.longitude;

			url += `&lat=${lati}&lon=${longi}`;

			// Pega as informações do clima do local da pessoa
			_status.innerHTML += "<br>Coletando informações do clima...";
			$.getJSON(url, (dados) => {
				$("#_status").hide();
				$("#conteudo").show();
				local.innerHTML = `${dados.name}`;
				
				// temperaturas
				tempAtual.innerHTML = `${dados.main.temp.toFixed(0)}ºC`;
				tempSensacao.innerHTML = `sensação: ${dados.main.feels_like.toFixed(0)}ºC`;
				let _min = dados.main.temp_min;
				let _max = dados.main.temp_max;
				tempMin.innerHTML = 
					`${_min.toFixed(0)}ºC`;
				tempMax.innerHTML = 
					`${_max.toFixed(0)}ºC`;
				
				// sol
				let nascer = 
					new Date(dados.sys.sunrise * 1000)
					.toTimeString().split(" ")[0].split(":");
				let por = 
					new Date(dados.sys.sunset * 1000)
					.toTimeString().split(" ")[0].split(":");
				solNascer.innerHTML = `${nascer[0]}h${nascer[1]}`;
				solPor.innerHTML = `${por[0]}h${por[0]}`;
				
				// descrição
				descri.innerHTML = `${dados.weather[0].description}`;
				descriImg.setAttribute("src", `http://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`);
				
				// outros
				let utc = dados.timezone / 3600;
				ventoVel.innerHTML = `vento: ${dados.wind.speed} m/s`;
				humidade.innerHTML = `umidade: ${dados.main.humidity}%`;
				pressao.innerHTML = `pressão: ${dados.main.pressure} hPa`;
			});
		});
	} 

	else alert("Serviço de geolocalização indisponível em seu navegador.");
};
















// window.onload = () => {
// 	url  = "https://api.openweathermap.org/data/2.5/weather?appid=d0c9f774076b8c7cd5e2f24a8508ae90&lang=pt&units=metric&lat=-22.6098588&lon=-43.7129345";

// 	$.getJSON(url, (dados) => {
// 		// console.log("cidade: " + dados.name);	
// 		// console.log("país: " + dados.sys.country);	
		
// 		// console.log("nascer do sol: " + new Date(dados.sys.sunrise * 1000).toTimeString().split(" ")[0]);	
// 		// console.log("pôr do sol: " 
// 		// 	+ new Date(dados.sys.sunset * 1000).toTimeString().split(" ")[0]);	
// 		console.log("timezone: " 
// 			+ dados.timezone / 3600);

// 		// console.log("velocidade do vento: " + dados.wind.speed);	
// 		// console.log("angulo do vento: " + dados.wind.deg);	
		
// 		// console.log("temp atual: " + dados.main.temp);	
// 		// console.log("minima: " + dados.main.temp_min);	
// 		// console.log("maxima: " + dados.main.temp_max);	
// 		// console.log("sensação: " + dados.main.feels_like);	
// 		// console.log("humildade: " + dados.main.humidity);	
// 		// console.log("preçao: " + dados.main.pressure);

// 		// console.log("descri: " + dados.weather[0].description);	
// 		console.log("ICONEEE: " + dados.weather[0].icon);	
// 		// console.log("nu vem %: " + dados.clouds.all);	

// 		// var d1 = new Date(1588237923 * 1000);
// 		// var d2 = new Date(1588278465 * 1000);
// 		// var d2 = new Date(1588266367 * 1000);
// 		// console.log(dados.temperature);
// 		// console.log(d1);
// 		// console.log(d2);
// 	});
// }