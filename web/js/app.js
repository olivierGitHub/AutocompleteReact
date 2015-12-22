var React = require('react');
var ReactDom = require('react-dom');
var Reflux = require('reflux');
var AutocompleteActions = require('./actions/autocompleteActions.js');
var AutocompleteStore = require('./stores/autocompleteStore.js');
var CheckBoxCredentials = require('./components/checkboxCredentials.js');
var Panel = require('react-bootstrap').Panel;

var App = React.createClass({

        mixins: [Reflux.connect(AutocompleteStore, "matchingList")],
        getInitialState: function () {
            return {
                matchingList: AutocompleteStore.matchingList,
                displayCredentials: true,
                credentialsOfUser: true,
                open:false,
                pattern:''
            }
        },
        _onChangePattern: function (e)  {

            this.setState({pattern: e.target.value});
            if (this.state.pattern.length > 1){
                AutocompleteActions.getMatchingList(this.state.pattern);
                this.setState({ open: !this.state.open })
            }else{
                console.log('pattern too short');
            }
            console.log(this.matchingList);
            console.log(this.displayCredentials);
        },
        _onClickUser: function () {
            this.displayCredentials = true;
            this.matchingList=[];
            this.credentialsOfUser= true;
            console.log(this.matchingList);
            console.log(this.displayCredentials);
        },

        render: function () {
            return (
                <form>
                    <input type="text"
                           placeholder="user"
                           value={this.state.pattern}
                           onChange={this._onChangePattern}
                    />
                    <Panel collapsible expanded={this.state.open}>
                        <ul>
                            {this.state.matchingList.map(function (user) {
                                return (
                                    <li onClick={this._onClickUser}>{user["name"]}</li>
                                );
                            })}
                        </ul>
                    </Panel>
                    <div>
                        { this.state.displayCredentials ? <CheckBoxCredentials admin={this.credentialsOfUser} /> : null }
                    </div>
                </form>
        )
    }
});

module.exports = App;

ReactDom.render(<App />, document.getElementById('app'));


/*<form>
 <input type="text"
 placeholder="user"
 value={this.state.pattern}
 onChange={this._onChangePattern}
 data-toggle="collapse"
 data-target="#matching"
 />
 <div id="matching" className="collapse">
 hello
 </div>
 <div>
 { this.state.displayCredentials ? <CheckBoxCredentials admin={this.credentialsOfUser} /> : null }
 </div>
 </form>*/
/*
<ul>
 {this.state.matchingList.map(function (user) {
 return (
 <li onClick={this._onClickUser}>{user["name"]}</li>
 );
 })}
 </ul>*/