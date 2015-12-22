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
                this.setState({ open: false })
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
                            Anim pariatur cliche  wes anderson cred nesciunt sapiente ea proident.Anim pariatur cliche  wes anderson cred nesciunt sapiente ea proident.
                            Anim pariatur cliche  wes anderson cred nesciunt sapiente ea proident.Anim pariatur cliche  wes anderson cred nesciunt sapiente ea proident.
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