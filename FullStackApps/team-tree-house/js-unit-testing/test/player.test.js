/*
	Reporting in Mocha
	- mocha --reporter min => show only the failing tests
	- mocha --reporter markdown => print the full report but in markdown format
	
	Create pending tests
	- DO NOT add the 2nd arg (function) to it()
	- you can add an x, e.g xdescribe() or xit()
	- Using xdescribe marks all tests in that block as pending
	
	Running tests when ever you save changes
	- you can run --watch command to automatically run your tests when ever you save a change to the test file, e.g
		$ mocha --watch [path.to/test/file] [path/to/logic/file]
		$ mocha --watch ./test/game.test.js ./game-logic/game.js
		
	You can automatically run tests on multiple files, add a line to the 'scripts' block in package json file
	 e.g run all the tests found in the test dir, 2nd arg are all the files we want to watch for changes
		"scripts": {
			"test:watch": "mocha --watch ./test ./"
		}
    The first argument describes the tests you want to run: all the tests in the ./test directory.
    The second argument describes the files you want to watch for changes: all the files in the current directory ./
    
    Testing asynchronous code
     - Mocha allows us to say that a test spec or test suite is "asynchronous"
     - Passing an argument to the internal function of a describe() or it() block will tell Mocha to wait on running our expectations until we specifically say so
     - Passing the done argument to our test spec tells Mocha that it’s supposed to wait for our instructions before checking our expectations.
     - Mocha will wait for done() to fire before checking the expectations
    
    References
    [1] https://mochajs.org/ (testing framework)
    [2] http://sinonjs.org/ (test spies, mocks and stubs)
    [3] http://chaijs.com/ (assertion library)
	[4] https://github.com/mjackson/expect (assertion library)
	[5] https://mochajs.org/#asynchronous-code (working with asyncronous code in mocha)
	
 */

'use strict';
const {expect} = require('chai');
const {validateLocation, validateLocations, placeShip} = require('./../game-logic/player');

describe('PLAYER METHODS', function () {
	describe('validateLocation', function () {
		let player;
		beforeEach(function () {
			player = {
				ships: [
					{
						locations: [[9, 9]]
					}
				]
			};
		});
		
		it('should confirm valid for unoccupied locations in range', function () {
			let location = [0, 0];
			let actual = validateLocation(player, location);
			
			expect(actual).to.be.ok;
		});
		
		it('should confirm Invalid for occupied locations in range', function () {
			let location = [9, 9];
			let actual = validateLocation(player, location);
			
			expect(actual).to.be.false;
		});
		
		it('should confirm Invalid for Unoccupied locations OUT of range', function () {
			let locationHigh = [10, 10];
			let locationLow = [-1, -1];
			
			expect(validateLocation(player, locationHigh)).to.be.false;
			expect(validateLocation(player, locationLow)).to.be.false;
		});
	});
	
	describe('validateLocations', function () {
		let player;
		beforeEach(function () {
			player = {
				ships: [
					{
						locations: [[0, 0]]
					}
				]
			};
		});
		
		it('should correctly report a list of unoccupied locations is valid', function () {
			let locations = [[1, 1], [1, 2], [1, 3], [1, 4]];
			expect(validateLocations(player, locations)).to.be.ok;
		});
		
		it('should correctly report a a problem if any location in the list is invalid', function () {
			let locations = [[1, 1], [1, 2], [1, 3], [10, 10]];
			expect(validateLocations(player, locations)).to.be.false;
			
			locations = [[1, 1], [1, 2], [1, 3], [0, 0]];
			expect(validateLocations(player, locations)).to.be.false;
		});
	});
	
	describe('placeShip', function () {
		let player;
		beforeEach(function () {
			player = {
				ships: [
					{
						size: 1,
						locations: []
					},
					{
						size: 2,
						locations: [[1, 0], [1, 1]]
					}
				]
			};
		});
		
		it('should update a ship with a valid starting location', function () {
			let ship = player.ships[0];
			let coordinates = [0, 1];
			
			placeShip(player, ship, coordinates, 'horizontal');
			let actual = ship.locations;
			
			expect(actual).to.be.ok;
			expect(actual).to.have.length(1);
			expect(actual[0]).to.deep.equal([0, 1]);
		});
		
		it('should throw an error if no direction is specified', ()=>{
			let ship = player.ships[0];
			let coordinates = [0,1];
			let handler = ()=>{
				placeShip(player, ship, coordinates);
			};
			expect(handler).to.throw(Error); // checks that an error is thrown
			expect(handler).to.throw('Direction required'); // check the error message shown
		});
		
		
	});
	
});