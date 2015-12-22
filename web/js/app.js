var React = require('react');
var ReactDom = require('react-dom');
var Reflux = require('reflux');
var AutocompleteActions = require('./actions/autocompleteActions.js');
var AutocompleteStore = require('./stores/autocompleteStore.js');
var CheckBoxCredentials = require('./components/checkboxCredentials.js');
var Panel = require('react-bootstrap').Panel;

function debounce(func, wait, immediate) {
    var timeout;
    return (function(){
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    })
};

var App = React.createClass({

        mixins: [Reflux.connect(AutocompleteStore, "matchingList")],

        getInitialState: function () {
            return {
                displayCredentials: false,
                credentialsOfUser: false
            }
        },
        _onChangePattern: function (e)  {
            var value = e.target.value;
            debounce(function() {
                AutocompleteActions.getMatchingList(value);
            }, 250);
        },
        _onClickUser: function () {
            this.setState({ displayCredentials: true });
            this.setState({ credentialsOfUser: true });
        },
        render: function () {

            return (
                <div className="form-group container" >
                    <form>
                        <div className="form-group container" >
                            <label >Nom:</label>
                            <input type="text"
                                   className="form-control"
                                   placeholder="user"
                                   value={this.state.pattern}
                                   onChange={this._onChangePattern} />
                        </div>

                        <Panel collapsible expanded={this.state.matchingList.length > 0}>
                            <ul>
                                {this.state.matchingList.map((user, index) => {
                                   return <li key={index} onClick={this._onClickUser} >{user["name"]}</li>
                                })}
                            </ul>
                        </Panel>

                        <div>
                            { this.state.displayCredentials ? <CheckBoxCredentials admin={this.state.credentialsOfUser} /> : null }
                        </div>
                    </form>

                </div>
        )
    }
});


module.exports = App;

ReactDom.render(<App />, document.getElementById('app'));

/*
<ul>
 {this.state.matchingList.map(function (user) {
 return (
 <li onClick={this._onClickUser}>{user["name"]}</li>
 );
 })}
 </ul>*/

/*<div>
 { this.state.open ?
 <ul>
 {this.state.matchingList.map(function (user) {
 return (
 <li onClick={this._onClickUser}>{user["name"]}</li>
 );
 })}*/