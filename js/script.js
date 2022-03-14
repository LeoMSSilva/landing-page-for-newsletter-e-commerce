const display = document.querySelector('#display');
const form = document.querySelector('#form');
const erro = document.querySelector('#error');

const formatePrintCounter = (days, hours, minutes, seconds) => {
	hours = hours < 10 ? '0' + hours : hours;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	seconds = seconds < 10 ? '0' + seconds : seconds;
	display.innerHTML = `${days}:${hours}:${minutes}:${seconds}`;
};

const bootstrap = () => {
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;
	const finalTimer = 'Jul 11, 2024 23:59:00';
	const countDown = new Date(finalTimer).getTime();
	setInterval(() => {
		const now = new Date().getTime();
		const distance = countDown - now;
		const currentDays = Math.floor(distance / day);
		const currentHours = Math.floor((distance % day) / hour);
		const currentMinutes = Math.floor((distance % hour) / minute);
		const currentSeconds = Math.floor((distance % minute) / second);
		formatePrintCounter(
			currentDays,
			currentHours,
			currentMinutes,
			currentSeconds,
		);
	}, 1000);
};
bootstrap();

const validation = (name, email) => {
	if (name == '') return 'Por favor, preencha o nome antes de enviar!';
	return email == '' ? 'Por favor, preencha o e-mail antes de enviar!' : '';
};

const loadingRegistred = () => {
	const contentElement = document.querySelector('#content');
	const loading = `<p>Processando...</p>`;
	const registeredUser = `<p>Cadastrado com sucesso!</p>`;
	contentElement.innerHTML = loading;
	setTimeout(() => (contentElement.innerHTML = registeredUser), 1000);
};

const saveData = (name, email) => {
	const data = { name, email };
	const dataConvertedToString = JSON.stringify(data);
	localStorage.setItem('leads', dataConvertedToString);
	loadingRegistred();
};

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const name = form.querySelector('#nome').value;
	const email = form.querySelector('#email').value;
	erro.innerHTML = `${validation(name, email)}`;
	if (erro.innerHTML == '') saveData(name, email);
});
