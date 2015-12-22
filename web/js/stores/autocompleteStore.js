var Reflux = require('reflux');
var AutocompleteActions = require('../actions/autocompleteActions.js');


var users = [
    {name:'terry',credentials:'user'},
    {name:'andy',credentials:'admin'},
    {name:'keneda',credentials:'user'},
    {name:'andrew',credentials:'admin'},
    {name:'terrence',credentials:'user'},
    {name:'matt',credentials:'admin'},
    {name:'matthieu',credentials:'user'},
    {name:'matthew',credentials:'admin'}
];

var AutocompleteStore = Reflux.createStore({
    getInitialState: function() {
        return [];
    },

    listenables: AutocompleteActions,
    onGetMatchingList: function (pattern) {
        if(pattern.length > 2) {
            var localList = []
            users.map(function (user){
                if (pattern == user["name"].substr(0,pattern.length)) localList.push(user);
            });
            this.trigger(localList);
        } else {
            this.trigger([]);
        }
    }
});

module.exports = AutocompleteStore;


