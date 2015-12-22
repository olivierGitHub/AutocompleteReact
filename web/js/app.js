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
            e.preventDefault();
            this.setState({pattern: e.target.value});
            if (this.state.pattern.length > 2){
                AutocompleteActions.getMatchingList(this.state.pattern);
                this.setState({ open: true })
            }else{
                console.log('pattern too short');
            }
            console.log(this.matchingList);
            console.log(this.displayCredentials);
        },
        _onClickUser: function () {
            this.setState({ displayCredentials: true });
            this.setState({ credentialsOfUser: true });
            this.setState({ open: true });
            this.setState({ matchingList: [] });
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
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                        Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
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

/*
<ul>
 {this.state.matchingList.map(function (user) {
 return (
 <li onClick={this._onClickUser}>{user["name"]}</li>
 );
 })}
 </ul>*/