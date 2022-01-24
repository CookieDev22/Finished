document.getElementById("instruction").innerHTML = "You will have five seconds to remember all the images, and then you will need to click on where you remember it being!"

let cards = [
	{
		name: "hulk",
		img: "images/hulk.png"
	},
	{
		name: "deadpool",
		img: "images/deadpool.png"
	},
	{
		name: "thor",
		img: "images/thor.png"
	},
	{
		name: "captain",
		img: "images/captain.png"
	},
];

let randomCards = cards.slice();
randomCards.sort(() => 0.5 - Math.random());

let timer = document.getElementById("timer");
let cover = "images/curtain.png"
let result = 0;
let place = document.getElementsByClassName("box");
let placeId;
let placeClickedName;
let placeClickedId;
let questionCardName;
let queNum = 0;
let que = document.getElementById("question");

function startTimer(min, sec) {
	let x = setInterval(function() {
		if(sec > 0) {
			sec--;
		} else if(sec === 0) {
			min--;
			sec = 59
		}
		let m = min;
		let s = sec;
		if(min < 10) { m = "0" + m};
		if(sec < 10) { s = "0" + s}
		timer.innerHTML = m + ":" + s;
		if(result >= cards.length) {
			document.getElementById("result").innerHTML = "";
			timer.innerHTML = "You win!";
			clearInterval(x);
			document.getElementById("inprogress").setAttribute("id", "win");
		}

		if(min <= 0 && sec <= 0) {
			timer.innterHTML = "Time over!";
			clearInterval(x);
		}
	}, 1000)
}

function initialShow() {
	for(let i = 0; i < place.length; i++) {
		placeId = place[i].getAttribute("id");
		place[i].setAttribute("src", randomCards[placeId].img);
	}
	setTimeout(createGame, 3000);
}

function createGame() {
	startTimer(0, 10);
	document.getElementById("instruction").innerHTML = "";
	showQuestionCard(0);
	for(let i = 0; i < place.length; i++) {
		place[i].addEventListener("click", flipthecard);
		place[i].setAttribute("src", cover);
	}
}

function showQuestionCard(n) {
	if(n<cards.length) {
		que.setAttribute("src", cards[n].img);
		questionCardName = cards[n].name;
		queNum++;
	}
}

function flipthecard(e) {
	placeId = e.target.getAttribute("id");
	e.target.setAttribute("src", randomCards[placeId].img)
	placeClickedId = placeId;
	placeClickedName = randomCards[placeId].name;
	if(questionCardName === placeClickedName) {
		result++;
		document.getElementById("result").innerHTML = result;
		e.target.removeEventListener("click", flipthecard);
		placeClickedId = -1;
		placeClickedName = "";
		showQuestionCard(queNum);
	} else {
		setTimeout(function() {e.target.setAttribute("src", cover)}, 500);
	}
}

function reload() {
	location.reload();
}