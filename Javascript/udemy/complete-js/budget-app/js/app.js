'use strict';

// MODEL
const budgetController = (() => {
	
	const Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
	};
	
	Expense.prototype.calcPercentage = function (totalIncome) {
		if(totalIncome > 0)
			this.percentage = Math.round((this.value/totalIncome)*100);
		else
			this.percentage = -1;
	};
	
	Expense.prototype.getPercentage = function () {
		return this.percentage;
	};
	
	const Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};
	
	const calculateTotal = (type)=>{
		 let sum = 0;
		 data.totals[type] = data.allItems[type].reduce((current, next)=>{
		 	return current + next.value;
		 }, 0);
	};
	
	let data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1
		
	};
	
	return {
		addItem(type, description, value) {
			// type will be either 'inc' or 'exp'
			// get the id of the last element in the array, increment to create the next id
			let ID = (data.allItems[type].length > 0)? data.allItems[type][data.allItems[type].length - 1].id + 1: 0;
			let newItem = (type === 'exp')? new Expense(ID, description, value): new Income(ID, description, value);
			
			// store the item in the data structure
			data.allItems[type].push(newItem);
			
			return newItem;
		},
		
		deleteItem(type, id) {
			// fetch all the ids of the items stored, delete the item with a matching id
			let ids = data.allItems[type].map((item)=>{
				return item.id;
			});
			let i = ids.indexOf(id);
			if(i !== -1)
				data.allItems[type].splice(i, 1);
		},
		
		calculateBudget() {
			// calculate total exp and inc
			calculateTotal('exp');
			calculateTotal('inc');
			
			// calculate the budget
			data.budget = data.totals.inc - data.totals.exp;
			
			// calculate and store the percentage
			if(data.totals.inc > 0)
				data.percentage = Math.round((data.totals.exp/data.totals.inc) * 100);
			else
				data.percentage = -1;
		},
		
		getBudget() {
			return {
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				budget: data.budget,
				percentage: data.percentage
			}
		},
		
		calculatePercentages() {
			 data.allItems.exp.forEach((item)=>{
			 	item.calcPercentage(data.totals.inc);
			 })
		},
		
		getPercentages() {
			return data.allItems.exp.map((item)=>{
				return item.getPercentage();
			})
		},
		
		// remove in production, displays data structure content, otherwise not visible
		testing() {
			return data;
		}
	}
	
})();


// VIEW
const uiController = (() => {
	// TODO add a clear button - clear fields manually - call clearFields()
	
	const DOMStrings = { // these are all class references
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		incomeLabel: '.budget__income--value',
		expensesLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage',
		container: '.container',
		expensesPercentageLabel: '.item__percentage',
		datelabel: '.budget__title--month'
	};
	
	const formatNumber = (number, type)=>{
		/*
		 + or - before number
		 2 decimal points
		 comma separating the thousands
		 */
		number = Math.abs(number); // return the num minus sign
		number = number.toFixed(2); // rounds, and returns a string (adds .00 to ints)
		let numSplit = number.split('.');
		let int = numSplit[0];
		if(int.length > 3)
			int = `${int.substr(0, int.length - 3)},${int.substr(int.length - 3, 3)}`;
		
		let dec = numSplit[1];
		
		type = (type === 'exp')? '-':'+';
		
		return `${type} ${int}.${dec}`;
	};
	
	const nodeListForEach = (list, callback)=>{
		for(let i = 0; i < list.length; i++){
			callback(list[i], i);
		}
	};
	
	// functions defined in the UIController that are called from
	// the AppController must be exported - by default all methods
	// and props of the module are private
	return {
		// PUBLIC METHODS
		getInput() {
			return {
				value: parseFloat(document.querySelector(DOMStrings.inputValue).value),
				type: document.querySelector(DOMStrings.inputType).value, // either 'inc'/'exp'
				description: document.querySelector(DOMStrings.inputDescription).value
			}
		},
		
		addListItem(obj, type) {
			let html, newHtml, element;
			// create HTML string with placeholder text
			if(type === 'inc') {
				element = DOMStrings.incomeContainer;
				html = `<div class="item clearfix" id="inc-%id%">
                            <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;
			} else {
				element = DOMStrings.expensesContainer;
				html = `<div class="item clearfix" id="exp-%id%">
                            <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                                <div class="item__percentage">21%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;
			}
			
			// replace placeholder text with actual data  and insert the string into the DOM
			newHtml = html.replace('%id%', obj.id).replace('%description%', obj.description).replace('%value%', formatNumber(obj.value, type));
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
			
		},
		
		deleteListItem(itemId) {
			// you can't delete the element itself from the DOM, only child elements - grab parent 1st
			document.getElementById(itemId).parentNode.removeChild(document.getElementById(itemId));
		},
		
		clearFields() {
			let fields = document.querySelectorAll(`${DOMStrings.inputDescription}, ${DOMStrings.inputValue}`);
			// convert the nodeList into an array using Array's slice() method
			let fieldsArray = Array.prototype.slice.call(fields);
			fieldsArray.forEach((elm)=>{
				elm.value = '';
			});
			// set the focus on the first field
			fieldsArray[0].focus();
		},
		
		displayBudget(budgetObj) {
			let type = (budgetObj.budget > 0)? 'inc':'exp';
			// update the inc, exp, total and percentage fields
			document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(budgetObj.budget, type);
			document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(budgetObj.totalInc, 'inc');
			document.querySelector(DOMStrings.expensesLabel).textContent = formatNumber(budgetObj.totalExp, 'exp');
			document.querySelector(DOMStrings.percentageLabel).textContent =
				(budgetObj.percentage > 0)? budgetObj.percentage: '---';
		},
		
		displayPercentages(percentages) {
			// create a nodeList of all the percentage labels
			const fields = document.querySelectorAll(DOMStrings.expensesPercentageLabel);
			
			nodeListForEach(fields, (item, i)=>{
				if(percentages[i] > 0)
					item.textContent = percentages[i] + '%';
				else
					item.textContent = '---';
			})
		},
		
		displayMonth() {
			const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
			const now = new Date();
			const year = now.getFullYear();
			const month = months[now.getMonth()];
			document.querySelector(DOMStrings.datelabel).textContent = `${month} ${year}`;
		},
		
		changedType() {
			// toggle the focus color of the input fields and btn based on +/-
			const fields = document.querySelectorAll(
				`${DOMStrings.inputType}, ${DOMStrings.inputDescription}, ${DOMStrings.inputValue}`
			);
			nodeListForEach(fields, (item)=>{
				item.classList.toggle('red-focus');
			});
			document.querySelector(DOMStrings.inputBtn).classList.toggle('red');
		},
		
		getDOMStrings() {
			return DOMStrings; // export the DOM strings object so it's available to other modules
		}
		
	}
	
})();


// APP CONTROLLER -- connects the other two modules
const appController = ((budgetCtrl, uiCtrl) => {
	// PRIVATE METHODS
	const updateBudget = ()=>{
		// 1. calculate the budget
		budgetCtrl.calculateBudget();
		
		// 2. return the budget
		let budget = budgetCtrl.getBudget();
		
		// 3. update the ui
		//console.log(budget);
		uiCtrl.displayBudget(budget);
	};
	
	const updatePercentages = ()=>{
		// 1. Calculate percentages
		budgetCtrl.calculatePercentages();
		
		// 2. Read percentages
		let percentages = budgetCtrl.getPercentages();
		
		// 3. Update the UI
		uiCtrl.displayPercentages(percentages);
	};
	
	// called by either hitting the 'Enter' key or the 'add item' btn
	const ctrlAddItem = () => {
		
		// 1. fetch user input from field
		let input = uiCtrl.getInput();
		// console.log(input);
		
		if(input.description !== '' && !isNaN(input.value) && input.value > 0) {
			// 2. create exp/inc item, add it to the budget controller data store and return the item
			let newItem = budgetCtrl.addItem(input.type, input.description, input.value);
			
			// 3. add item to the ui and clear the description & value input fields
			uiCtrl.addListItem(newItem, input.type);
			uiCtrl.clearFields();
			
			// 4. calculate & update budget
			updateBudget();
			
			// 5. calculate and update percentages
			updatePercentages();
			
		} else {
			// TODO add message for user to enter correct input
			uiCtrl.clearFields();
		}
		
	};
	
	const ctrlDeleteItem = (e) => {
		// traverse up the DOM until <div .item> reached and grab it's id (only id's on the page)
		let itemId = e.target.parentNode.parentNode.parentNode.parentNode.id;
		if(itemId) {
			
			let idArr = itemId.split('-');
			let type = idArr[0];
			let id = parseInt(idArr[1]);
			
			// 1. remove item from the data structure
			budgetCtrl.deleteItem(type, id);
			
			// 2. remove item from the DOM
			uiCtrl.deleteListItem(itemId);
			
			// 3. update the budget & UI
			updateBudget();
			
			// 4. calculate and update percentages
			updatePercentages();
		}
		
	};
	
	const eventListenerSetup = () => {
		const DOM = uiCtrl.getDOMStrings();
		
		// define the event listener on the add button
		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
		
		// add an event listener to the global doc element to capture pressing the enter key
		// keypress - every key except fn, Ctrl
		document.addEventListener('keypress', (e)=>{
			if(e.keyCode === 13 || e.which === 13) {
				ctrlAddItem();
			}
		});
		
		// capture click events on the income & expense items on the <div .container>
		document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
		
		document.querySelector(DOM.inputType).addEventListener('change', uiCtrl.changedType);
	};
	
	return {
		// PUBLIC METHODS
		init() {
			console.log('Application has started');
			uiCtrl.displayMonth();
			uiCtrl.displayBudget({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1
			});
			eventListenerSetup();
		}
	}
	
})(budgetController, uiController);

// launch the app
appController.init();