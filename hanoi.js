let isPicking = true;
let holdingCount = 0;

const body = document.querySelector('main');
const board = document.querySelector('board');

init();

let left = document.querySelector('#a');
let mid = document.querySelector('#b');
let right = document.querySelector('#c');
let qty = [7, 0, 0];
const pegs = document.querySelectorAll('.pegbox');
let pickedPegIdx = 0;

render();

function init() {
	for (let i = 0; i < 3; i++) {
		let pegs = document.createElement('div');
		pegs.classList.add('pegbox');
		pegs.id = abcUTF(i);
		board.appendChild(pegs);
	}
}
function render() {
	left.innerText = qty[0];
	mid.innerText = qty[1];
	right.innerText = qty[2];
	for (i = 0; i < 3; i++) {
		renderColor(i);
	}
}
function renderColor(idx) {
	console.log(`assessing peg index ${idx}`);
	if (qty[idx] == 0) {
		pegs[idx].style.backgroundColor = '#536e61';
	} else if (qty[idx] < 7) {
		pegs[idx].style.backgroundColor = '#328c60';
	} else {
		pegs[idx].style.backgroundColor = '#169e5a';
	}
}
pegs.forEach((el, num) => {
	el.addEventListener('click', () => {
		console.log(`clicked peg ${pegs[num].id}`);
		if (isPicking) {
			pickPeg(num);
			console.log(`You are holding: ${holdingCount}`);
			render();
		} else if (!isPicking) {
			placePeg(num);
			render();
		} else {
			alert(`You're holding one`);
		}
	});
});
function pickPeg(num) {
	if (iCanHaz(num) && isPicking) {
		pegs[num].classList.add('roundy');
		pickedPegIdx = num;
		holdingCount++;
		qty[num]--;
		isPicking = false;
		console.log(`picked! from peg ${pegs[num].id}`);
	} else {
		alert(`There are none!`);
	}
}
function placePeg(num) {
	if (holdingCount > 0) {
		pegs[pickedPegIdx].classList.remove('roundy');
		qty[num] += holdingCount;
		holdingCount--;
		isPicking = true;
	}
}
function iCanHaz(num) {
	if (pegs[num].innerText > 0) {
		return true;
	} else {
		return false;
		alert(`You no can haz!`);
	}
}

//Function whose sole purpose is to allow appending of a, b, c etc ID's to DOM created elements
function abcUTF(lowerCaseLetter) {
	return String.fromCharCode(lowerCaseLetter + 97);
}
function ABCUTF(upperCaseLetter) {
	return String.fromCharCode(upperCaseLetter + 65);
}
