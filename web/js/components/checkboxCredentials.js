var React = require('react');


var CheckBoxCredentials = React.createClass({
    render: function() {
        return (
            <div>
                <label>Admin</label>
                <input id="checkadmin" type="checkbox" defaultChecked={this.props.admin} onChange={this.onChange} />
            </div>
        );
    }
});


module.exports = CheckBoxCredentials;