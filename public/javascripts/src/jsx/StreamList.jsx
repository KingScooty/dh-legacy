var React = require('react'),
    StreamItem = require('./StreamItem');

var StreamList = React.createClass({

  render: function() {

    var streamItems = this.props.items.map(function(item) {
      return <StreamItem itemKey={item.key}
                       title={item.title}
                       desc={item.description}
                       voteCount={item.voteCount}
                       onVote={this.props.onVote} />
    }.bind(this));

    return (
      <div className="">
        {streamItems}
      </div>
    );
  }

});

module.exports = StreamList;
