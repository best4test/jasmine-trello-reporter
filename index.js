exports.WebReporter = function(options) {
	var Trello = require('trello-node');
	var _ = require('underscore');
	var self = this;
	var testPassed = 0;
	var testTotal = 0;
	var failedList;

	self.key = options.key;
	self.secret = options.secret;
	self.projectName = options.projectName;
	self.listId = options.listId;

	var testRun =
		{
			projectName : self.projectName,
			status : "passed",
			tests : []
		};

	self.specDone = function(sp) {		
		var spec = JSON.parse(JSON.stringify(sp));
		spec._endTime = new Date();
		//remove not needed stack trace.
		for (var i = 0; i < spec.failedExpectations.length;i++)
		{
			spec.failedExpectations[i].stack = '';
		}
		testTotal++;
		if (spec.status === 'failed'){
			testRun.status = "failed";
			failedList = failedList + spec.fullName + '\n';
		}
		if (spec.status === 'passed'){
			testPassed++;
		}
		testRun.tests.push(spec);
	};

	self.jasmineDone = function() {
		console.log(testRun.tests[0]);
		testRun.endTime = new Date();
		if (testRun.status !== 'passed')
		{
			var trello = new Trello(self.key, self.secret);
			trello.getList(self.listId)
  			.then(function(data, response) {
			  	var cardExists = _.findWhere(data.cards,{name:'Test Automation ' + self.projectName + ' failed'});
			  	if (cardExists == undefined)
			  	{
				  	var card = {};
				  	card.name = 'Test Automation ' + self.projectName + ' failed';
				  	card.idList = self.listId;
				  	card.desc = testPassed + '/' + testTotal + '\n' + failedList;
				  	trello.post('/cards',card).then(function(res){
				  		console.log(res);
				  	});
			  	}
  			});		
		}		
	};
};