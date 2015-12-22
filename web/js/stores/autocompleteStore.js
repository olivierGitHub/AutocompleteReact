var Reflux = require('reflux');
var AutocompleteActions = require('../actions/autocompleteActions.js');


var matchingList=[];


var AutocompleteStore = Reflux.createStore({
    listenables: AutocompleteActions,
    init: function() {
        this.users=[
            {name:'terry',credentials:'user'},
            {name:'andy',credentials:'admin'},
            {name:'keneda',credentials:'user'},
            {name:'andrew',credentials:'admin'},
            {name:'terrence',credentials:'user'},
            {name:'matt',credentials:'admin'},
            {name:'matthieu',credentials:'user'},
            {name:'matthew',credentials:'admin'}
        ];
        //this.matchingList=[''];
    },
    onGetMatchingList: function (pattern) {
            this.users.map(function (user){
                if (pattern == user["name"].substr(0,pattern.length)) {
                    matchingList.push(user);
                    console.log(user);
                }});
            this.trigger(matchingList);
            matchingList=[];
        }
});

module.exports = AutocompleteStore;


