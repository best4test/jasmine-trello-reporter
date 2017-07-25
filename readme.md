# jasmine-slack-reporter

Send failed jasmine2 / protractor results to Trello and create a task

## Protractor usage:

Add to conf.js file
```
 onPrepare: function() {
    var trelloRep = require('jasmine-trello-reporter'); 
    jasmine.getEnv().addReporter(new trelloRep.WebReporter({
          projectName:'API - Jasmine',
          key:'ASDFtrelloKey',
          secret: 'ASDFsecretTrelloKey',
          listId : 'ASDFtrelloListId'
        }));      
}

```

## jasmine usage 

Create jasmine.js 
```
const Jasmine = require('jasmine');
const trelloRep = require('jasmine-trello-reporter');

const jasmine = new Jasmine();

jasmine.addReporter(new trelloRep.WebReporter({
        projectName:'API - Jasmine',
        key:'ASDFtrelloKey',
        secret: 'ASDFsecretTrelloKey',
        listId : 'ASDFtrelloListId'
      }));

jasmine.loadConfigFile('./spec/support/jasmine.json'); // load jasmine.json configuration
jasmine.execute();
```
Run with node
```
node jasmine.js
```