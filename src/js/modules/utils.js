module.exports = {

	getRandomInt: function(min, max){

		// Get a random number in a range
		return Math.floor(Math.random() * (max - (min + 1))) + min;

	},

	rangeToRange: function(oldVal, oldMax, oldMin, newMax, newMin){

		// Takes one range and converts it to another! Easy as pie! We love pie.
		return (((oldVal - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;

	},

};
