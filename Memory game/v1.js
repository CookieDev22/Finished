let cards = [
	{
		name: "hulk",
		img: "images/hulk.png"
	},
	{
		name: "hulk",
		img: "images/hulk.png"
	},
	{
		name: "deadpool",
		img: "images/deadpool.png"
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
		name: "thor",
		img: "images/thor.png"
	},
	{
		name: "captain",
		img: "images/captain.png"
	},
	{
		name: "captain",
		img: "images/captain.png"
	},

];

cards.sort(() => 0.5 - Math.random());

let cover = "images/curtain.png";
let result = 0;
let place;
let placeId;
let placeClickedName = [];
let placeClickedId = [];

function createGame() {
	place  = document.getElementsByClassName("box");
	for(let i = 0; i < place.length; i++) {
		place[i].addEventListener("click", flipthecard);
		place[i].setAttribute("src", cover);
	}
}

function checkMatch() {
	let optionOneId = placeClickedId[0];
	let optionTwoId = placeClickedId[1];
	if(placeClickedName[0] === placeClickedName[1]) {
		result++;
		document.getElementById("result").innerHTML = result;
		place[optionOneId].removeEventListener("click", flipthecard);
		place[optionTwoId].removeEventListener("click", flipthecard);
	} else {
		place[optionOneId].setAttribute("src", cover);
		place[optionTwoId].setAttribute("src", cover);
		placeClickedId = [];
		placeClickedName = [];
	}
	placeClickedId = [];
	placeClickedName = [];
}

function initialShow() {
	place  = document.getElementsByClassName("box");
	for(let i = 0; i < place.length; i++) {
		place[i].setAttribute("src", cards[i].img);
	}
	setTimeout(createGame, 1500);
}

function flipthecard(e) {
	placeId = e.target.getAttribute("id");
	placeClickedName.push(cards[placeId].name);
	placeClickedId.push(placeId);
	e.target.setAttribute("src", cards[placeId].img);

	if(placeClickedName.length === 2) {
		setTimeout(checkMatch, 200);
	}
}

function reload() {
	location.reload();
}

initialShow();

