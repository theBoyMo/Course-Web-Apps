function Question(question, answers, correct) {
	this.question = question;
	this.answers = answers;
	this.correct = correct;
}

Question.prototype.toHTML = function () {
	
	let htmlString = '<h2 id="question" class="headline-secondary--grouped">';
	htmlString += this.question;
	htmlString += '</h2>';
	htmlString += '<p id="choice0">';
	htmlString += this.answers[0];
	htmlString += '</p>';
	htmlString += '<button id="guess0" class="btn--default">Select Answer</button>';
	htmlString += '<p id="choice1">';
	htmlString += this.answers[1];
	htmlString += '</p>';
	htmlString += '<button id="guess1" class="btn--default">Select Answer</button>';
	
	return htmlString;
};