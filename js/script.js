const display = document.querySelector('#display');
const form = document.querySelector('#form');
const erro = document.querySelector('#error');

const printCount = (days, hours, minutes, seconds) => {
	hours = hours < 10 ? '0' + hours : hours;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	seconds = seconds < 10 ? '0' + seconds : seconds;
	display.innerHTML = `${days} : ${hours} : ${minutes} : ${seconds}`;
};

(() => {
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;
	let days, hours, minutes, seconds;
	let finalTimer = 'Jul 18, 2021 23:59:00';
	let countDown = new Date(finalTimer).getTime();
	setInterval(() => {
		let now = new Date().getTime();
		const distance = countDown - now;
		days = Math.floor(distance / day);
		hours = Math.floor((distance % day) / hour);
		minutes = Math.floor((distance % hour) / minute);
		seconds = Math.floor((distance % minute) / second);
		printCount(days, hours, minutes, seconds);
	}, 1000);
})();

function validation(name, email) {
	if (name == '') return 'Por favor, preencha o nome antes de enviar!';
	if (email == '') return 'Por favor, preencha o e-mail antes de enviar!';
	return '';
}

function load() {
	let content = document.querySelector('#content');
	let carregando = `<p>Processando...</p>`;
	let pronto = `<p>Cadastrado com sucesso!</p>`;
	content.innerHTML = carregando;
	setTimeout(() => {
		content.innerHTML = pronto;
	}, 1000);
}

function saveData(name, email) {
	let data = { name, email };
	let convertToString = JSON.stringify(data);
	localStorage.setItem('leads', convertToString);
	load();
}

form.addEventListener('submit', (e) => {
	e.preventDefault();
	let name = form.querySelector('#nome').value;
	let email = document.querySelector('#email').value;
	erro.innerHTML = `${validation(name, email)}`;
	if (erro.innerHTML == '') saveData(name, email);
});
