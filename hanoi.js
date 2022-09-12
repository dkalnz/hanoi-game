let isPicking = true;
let holdCount = 0;
let holding = 0;

const body = document.querySelector('main');
const board = document.querySelector('board');

init();

let left = document.querySelector('#a');
let mid = document.querySelector('#b');
let right = document.querySelector('#c');

let stack0 = [];
let stack1 = [];
let stack2 = [];
let allStacks = [stack0, stack1, stack2];
const pegs = document.querySelectorAll('.pegbox');
const discs = document.querySelectorAll('.discs');
let startSize = 0;
const baseWidthFactor = 23;
const discWidthFactor = 20;
let discWidth = 21;
let discWidthDivisor = 1;
let pickedPegIdx = 0;
let lastPegIdx = 0;
const basePlate = document.querySelector('.bases');
let footy1 = document.querySelector('#foot1');
let footy2 = document.querySelector('#foot2');
let footy3 = document.querySelector('#foot3');

initBases();
let discCreate = null;
initDiscs();
let thisDisc = discCreate.id;
initRender();

function init() {
	//INITIALIZE BOARD AND PEGS
	for (let i = 0; i < 3; i++) {
		let pegs = document.createElement('div');
		pegs.classList.add('pegbox');
		pegs.id = abcUTF(i);
		board.appendChild(pegs);
	}
}
function initBases() {
	//APPEND BASES
	for (i = 0; i < 3; i++) {
		let basePlates = document.createElement('div');
		basePlates.classList.add('bases');
		pegs[i].appendChild(basePlates);
	}
}
function initDiscs() {
	startSize = prompt('How many can you play with?');
	for (i = 1; i <= startSize; i++) {
		stack0.push(i);
		discCreate = document.createElement('div');
		discCreate.classList.add('discs');
		discCreate.id = i;
		pegs[0].appendChild(discCreate);
		discWidthDivisor = discWidthFactor / startSize;
		discWidth = discWidthFactor - discWidthDivisor * (i - 1);
		discCreate.style.width = discWidth + 'vw';
		discCreate.style.backgroundColor = getRandomColor();
	}
	statusReport();
}
function statusReport() {
	let lefty = allStacks[0]; //.slice().reverse();
	let middley = allStacks[1]; //.slice().reverse();
	let righty = allStacks[2]; //.slice().reverse();
	footy1.innerText = lefty.join(' ');
	footy2.innerText = middley.join(' ');
	footy3.innerText = righty.join(' ');
}
function initRender() {
	for (i = 0; i < 3; i++) {
		renderColor(i);
	}
	statusReport();
}
function render(discId) {
	let myDisc = document.getElementById(`${discId}`);
	if (holding > 0) {
		myDisc.classList.add('held');
	} else if (holding == 0) {
		myDisc.classList.remove('held');
	} else {
	}
	for (i = 0; i < 3; i++) {
		renderColor(i);
	}
	statusReport();
}
function renderColor(idx) {
	if (allStacks[idx].length == 0) {
		pegs[idx].style.backgroundColor = '#536e61';
	} else if (allStacks[idx].length < startSize) {
		pegs[idx].style.backgroundColor = '#328c60';
	} else {
		pegs[idx].style.backgroundColor = '#169e5a';
	}
}
pegs.forEach((el, num) => {
	el.addEventListener('click', () => {
		if (isPicking) {
			pickPeg(num);
			render(thisDisc);
		} else {
			placePeg(num);
			render(thisDisc);
		}
	});
});
function pickPeg(num) {
	let myStack = allStacks[num];
	let myStackLength = myStack.length;
	if (myStackLength > 0) {
		holding = allStacks[num].pop();
		thisDisc = holding;
		isPicking = false;
		console.log(`You are holding ${thisDisc}`);
	} else {
		console.log(`Can't pick this`);
	}
}
function placePeg(num) {
	let myStack = allStacks[num];
	if (myStack.length == 0) {
		allStacks[num].push(holding);
		holding = 0;
		isPicking = true;
	} else if (allStacks[num].every(canPlace)) {
		console.log(
			`allstacks[num] is ${
				allStacks[num]
			}, you were just holding ${holding} and canPlace returned ${allStacks[
				num
			].some(canPlace)}`
		);
		allStacks[num].push(holding);
		holding = 0;
		isPicking = true;
	} else {
		console.log(`can't move here, you're still holding ${holding}`);
	}
}
function canPlace(thisArraysBiggest) {
	return holding > thisArraysBiggest;
}
//STYLE
//	FUNCTIONS
//		HERE
function hexToDec(hexString) {
	return parseInt(hexString, 16);
}
//COLOR GENERATOR
function getRandomColor() {
	let min = hexToDec('d14976');
	let max = hexToDec('fa0556');
	let rand = null;
	//console.log(`min is ${min} and max is ${max}`);
	rand = Math.floor(Math.random() * (max - min) + min).toString(16);
	// console.log(rand);
	return '#' + rand;
	//13393533 min
	//16385366 max
}
//Functions whose sole purpose is to allow appending of a, b, c etc ID's to DOM created elements
function abcUTF(lowerCaseLetter) {
	return String.fromCharCode(lowerCaseLetter + 97);
}
function ABCUTF(upperCaseLetter) {
	return String.fromCharCode(upperCaseLetter + 65);
}
