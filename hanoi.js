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
let startSize = 0;
let winScore = 1000;
let globalWin = false;
const baseWidthFactor = 23;
const discWidthFactor = 20;
let discWidth = 21;
let discWidthDivisor = 1;
let pickedPegIdx = 0;
let lastPegIdx = 0;
const basePlate = document.querySelector('.bases');
const pegs = document.querySelectorAll('.pegbox');
const discs = document.querySelectorAll('.discs');
const moveCount = document.querySelector('#moveCount');
const resetButton = document.querySelector('#reset');
let moves = 0;

initBases();
let discCreate = null;
initDiscs();
let thisDisc = discCreate.id;
initRender();

function init() {
	//INITIALIZE BOARD AND PEGS
	const animDelayMs = [200, 0, 700];
	for (let i = 0; i < 3; i++) {
		let pegs = document.createElement('div');
		pegs.classList.add('pegbox');
		pegs.classList.add('slideUp');
		pegs.id = abcUTF(i);
		pegs.style.animationDelay = animDelayMs[i] + 'ms';
		board.appendChild(pegs);
	}
}
function initBases() {
	//APPEND BASES
	alert('Welcome to Watermelons: Tower of Hanoi.');
	alert(
		'Objective: Move the tower from the leftmost peg to the right. Rules: you may only pick and place a single disc at a time. No larger-sized disc can be placed upon a smaller one.'
	);
	while (startSize != 3 && startSize != 5 && startSize != 7) {
		startSize = prompt(
			'How many discs shall you play with? 3 is Beginner, 5 is Intermediate, 7 is Expert. 64 is Legendary (and will break my code... probably). According to the Legend of Brahma, priests have been moving these discs forever.  Choose wisely. 3, 5, or 7:'
		);
		if (startSize == 64) {
			alert(
				'Silly mortal. 1 move per second of a 64 disc tower while never misplacing a single one would algorithmically take 580 billion years.'
			);
			startSize = null;
		}
	}
	for (i = 0; i < 3; i++) {
		let basePlates = document.createElement('div');
		basePlates.classList.add('bases');
		pegs[i].appendChild(basePlates);
	}
}
function initDiscs() {
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
	winScore = sumArray(stack0);
}
function sumArray(array) {
	let sum = array.reduce(function (a, b) {
		return a + b;
	}, 0);
	return sum;
}
function initRender() {
	for (i = 0; i < 3; i++) {
		renderColorCalc(i);
	}
}
function render(discId) {
	let myDisc = document.getElementById(`${discId}`);
	if (holding > 0) {
		myDisc.classList.add('held');
	} else if (holding == 0) {
		pegs[lastPegIdx].removeChild(myDisc);
		pegs[pickedPegIdx].appendChild(myDisc);
		myDisc.classList.remove('held');
		myDisc.classList.add('dropped');
	}
	for (i = 0; i < 3; i++) {
		renderColorCalc(i);
	}
	moveCount.innerText = moves;
	waitTime(checkWin, 1000);
}
//In order to allow animations and scripts to
//finish before showing dialog in a win case
function waitTime(f, timeMs) {
	setTimeout(f, timeMs);
}
function checkWin() {
	if (sumArray(allStacks[2]) == winScore) {
		globalWin = true;
		alert(`You won!!!`);
		globalWin = false;
		location.reload();
	}
}
function renderColorCalc(idx) {
	if (allStacks[idx].length == 0) {
		pegs[idx].style.backgroundColor = '#536e61';
	} else if (allStacks[idx].length < startSize) {
		pegs[idx].style.backgroundColor = '#328c60';
	} else {
		pegs[idx].style.backgroundColor = '#169e5a';
	}
}
resetButton.addEventListener('click', () => {
	alert('You sink deeper into the purgatory with the priests of Brahma.');
	location.reload();
});
pegs.forEach((el, num) => {
	el.addEventListener('click', () => {
		if (isPicking) {
			pickedPegIdx = num;
			pickPeg(num);
			render(thisDisc);
		} else {
			lastPegIdx = pickedPegIdx;
			pickedPegIdx = num;
			placePeg(num);
			render(thisDisc);
		}
	});
});
//ACTION FOR PULLING A DISC
function pickPeg(num) {
	let myStack = allStacks[num];
	let myStackLength = myStack.length;
	if (myStackLength > 0) {
		pickedPegIdx = num;
		holding = allStacks[num].pop();
		thisDisc = holding;
		isPicking = false;
	} else {
		alert(`There's nothing to pick!`);
	}
}
//ACTION TO DO WHEN PLACING DISC
function placePeg(num) {
	let myStack = allStacks[num];
	if (myStack.length == 0) {
		allStacks[num].push(holding);
		holding = 0;
		moves++;
		isPicking = true;
	} else if (allStacks[num].every(canPlace)) {
		allStacks[num].push(holding);
		holding = 0;
		moves++;
		isPicking = true;
	} else {
		alert(
			`You can't move here. Cannot place any larger disk over a smaller one.`
		);
		pickedPegIdx = lastPegIdx;
	}
}
//CHECKS MAIN GAME RULE FOR PLACING DISCS
function canPlace(thisArraysBiggest) {
	return holding > thisArraysBiggest;
}
function resetGame() {
	globalWin = false;
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
	rand = Math.floor(Math.random() * (max - min) + min).toString(16);
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
