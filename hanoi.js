let isPicking = true;
let holdCount = 0;
let holding = 0;

const body = document.querySelector('main');
const board = document.querySelector('board');

init();

let left = document.querySelector('#a');
let mid = document.querySelector('#b');
let right = document.querySelector('#c');
//let qty = [7, 0, 0];

let stack0 = [];
let stack1 = [];
let stack2 = [];
let allStacks = [stack0, stack1, stack2];
const pegs = document.querySelectorAll('.pegbox');
let startSize = 0;
let pickedPegIdx = 0;
const statusy = document.querySelector('.status'); //debugging object
const basePlate = document.querySelector('.bases');

initBases();
let discCreate = null;
initDiscs();
render();

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
		discCreate.style.backgroundColor = getRandomColor();
	}
	console.log(`Discs initiated, left stack has ${stack0}`);
}
function render() {
	for (i = 0; i < 3; i++) {
		renderColor(i);
	}
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
		console.log(`clicked peg ${pegs[num].id}`);
		if (isPicking) {
			pickPeg(num);
			//console.log(`You are holding: ${holding}`);
			render();
		} else {
			placePeg(num);
			render();
		}
	});
});
function pickPeg(num) {
	let myStack = allStacks[num];
	let myStackLength = myStack.length;
	if (myStackLength > 0) {
		holding = allStacks[num].pop();
		isPicking = false;
		console.log(
			`You are holding ${holding} and this stack now has${allStacks[num]}`
		);
	} else {
		console.log(`Can't pick this`);
	}
}
function placePeg(num) {
	let myStack = allStacks[num];
	if (allStacks[num].length == 0) {
		allStacks[num].push(holding);
		holding = 0;
		isPicking = true;
	} else if (canPlace(num)) {
		allStacks[num].push(holding);
		holding = 0;
		isPicking = true;
		console.log(`middle thing happened`);
		// console.log(`result of myFunction is ${myFunction}`);
	} else {
		console.log(`can't move here, you're still holding ${holding}`);
	}

	console.log(
		`left has ${allStacks[0]}, middle has ${allStacks[1]}, right has ${allStacks[2]}`
	);
}
function canPlace(num) {
	console.log(
		`canPlace ran with ${num} we are returning value of ${
			holding > allStacks[num]
		}`
	);
	return holding > allStacks[num];
}
// function myFunction(num) {
// 	allStacks[num].some(canPlace);
// }

function hexToDec(hexString) {
	return parseInt(hexString, 16);
}
//RED GENERATOR
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

// function iCanHaz(num) {
// 	if (this.Stack.contents.length > 0) {
// 		return true;
// 	} else {
// 		return false;
// 		alert(`You no can haz!`);
// 	}
// }

//Functions whose sole purpose is to allow appending of a, b, c etc ID's to DOM created elements
function abcUTF(lowerCaseLetter) {
	return String.fromCharCode(lowerCaseLetter + 97);
}
function ABCUTF(upperCaseLetter) {
	return String.fromCharCode(upperCaseLetter + 65);
}
