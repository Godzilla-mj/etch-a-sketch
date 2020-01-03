let number = document.getElementById("number").value;
const container = document.getElementById("container");

//generate board by creating multiple div in grid format
const genDiv = function(n){
	container.setAttribute(
    	"style",
    	`grid-template: repeat(${n}, 1fr ) / repeat(${n}, 1fr)`
  );
	for (i = 0; i < Math.pow(n, 2); i++){
		let addDiv = document.createElement('div');
		addDiv.classList.add('box');
		addDiv.setAttribute("id", `box${i}`);
		addDiv.setAttribute("onmouseover", "control()");
		container.appendChild(addDiv);
	}
};

genDiv(number);

//on mouse over control
function control(){
	var cursor = event.target.id;
	if (toggleValue) {
		this.addEventListener("mouseover", setRandomColor(cursor));
	}else {this.addEventListener("mouseover", opacity(cursor));
}
}

function opacity(id){
	let opColor = document.getElementById(id).style.opacity;
	opColor = Number(opColor) + 0.1;

	document.getElementById(id).setAttribute("style", `opacity: ${opColor}`);
	colorChange(id);
}

function colorChange(id){
	document.getElementById(id).style.backgroundColor = 
	document.getElementById("colorness").value;
}

//toggleSwitch
let toggleValue = false;

function toggleSwitch(){
	if (toggleValue == true) {toggleValue = false
	} else {toggleValue = true};
}

function toggleDisplay(){
	let display = document.getElementById("toggle ON");
	if (toggleValue == true){
		display.innerHTML = "Random OFF";
	} else{
		display.innerHTML = "Random ON";
	}
}

//random color selector
document.getElementById("random").addEventListener("click", toggleSwitch);

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function setRandomColor(id) {
	let opColor = getComputedStyle(document.getElementById(id)).getPropertyValue(
		"opacity")
	opColor = Number(opColor) + 0.1;
	document.getElementById(id).style.setProperty("opacity", opColor);
	document.getElementById(id).style.backgroundColor = getRandomColor();
}


//reset board
const reset = function(){
	let divs = container.querySelectorAll("div");
	divs.forEach(divs => {
		container.removeChild(divs);
	});
	genDiv(number);
}
document.getElementById("reset").addEventListener("click", reset);

//create new size board
document.getElementById("board").addEventListener('click', function() {
	number = document.getElementById("number").value;
	if (number > 64 || number < 1) {
		alert("Please enter a number between 1 and 64.");
	}else {
		reset();
	}
})


