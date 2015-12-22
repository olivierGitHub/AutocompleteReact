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
            var value = e.target.value;
            console.log(e.target.value);

            this.setState({pattern: value});

            if (value.length > 2){
                AutocompleteActions.getMatchingList(value);
                this.setState({ open: true })
            }else if (value.length <= 2){
                console.log('pattern too short');
                this.setState({ open: false });
                this.setState({ matchingList: [] });
            }

            console.log(this.state.matchingList);
            console.log(this.state.displayCredentials);
        },
        _onClickUser: function () {
            this.setState({ displayCredentials: true });
            this.setState({ credentialsOfUser: true });
            this.setState({ open: false });
            this.setState({ matchingList: [] });
            console.log(this.state.matchingList);
            console.log(this.state.displayCredentials);
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

                        <Panel collapsible expanded={this.state.open}>
                            {typeof this.state.matchingList !== "undefined" ?
                            <ul>
                                {this.state.matchingList.map(function (user) {
                                    return (
                                        <li>{user["name"]}</li>
                                    );
                                })}
                            </ul>
                                : null }
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