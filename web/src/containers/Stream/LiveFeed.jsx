var React = require('react');
import { connect } from 'react-redux';
import { toggleStatus } from '../../actions';

var LiveFeed = React.createClass({
  propTypes: {
    toggleStatus: React.PropTypes.func.isRequired
  },

  componentDidMount: function () {
    this.props.toggleStatus(true);
  },

  componentWillUnmount: function () {
    this.props.toggleStatus(false);
  },

  render: function () {
    return (
      <h1>[LIVE!] FEED!</h1>
    );
  }
});

var mapDispatchToProps = (dispatch) => {
  return {
    toggleStatus: (liveStatus) => {
      dispatch(toggleStatus(liveStatus));
    }
  };
};

module.exports = connect(
  null,
  mapDispatchToProps
)(LiveFeed);
