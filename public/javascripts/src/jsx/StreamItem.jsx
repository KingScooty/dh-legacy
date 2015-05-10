var React = require('react');

var StreamItem = React.createClass({

  // vote: function (newCount) {
  //   this.props.onVote({
  //     key: this.props.itemKey,
  //     title: this.props.title,
  //     description: this.props.desc,
  //     voteCount: newCount
  //   });
  // },
  //
  // voteUp: function () {
  //   var count = parseInt(this.props.voteCount, 10);
  //   var newCount = count + 1;
  //   this.vote(newCount);
  // },
  //
  // voteDown: function () {
  //   var count = parseInt(this.props.voteCount, 10);
  //   var newCount = count - 1;
  //   this.vote(newCount);
  // },

  render: function() {
    // console.log(this.props.tweet.value.text);
    // var positiveNegativeClassName = this.props.voteCount >= 0 ?
    //                                 'label label-success pull-right' :
    //                                 'label label-danger pull-right';

    return (
      // <li key={this.props.itemKey} className="list-group-item">
      //   <span className={positiveNegativeClassName}>{this.props.voteCount}</span>
      //   <h4>{this.props.title}</h4>
      //   <span>{this.props.desc}</span>
      //   <span className="pull-right">
      //     <button id="up" className="btn btn-sm btn-primary" onClick={this.voteUp}>&uarr;</button>
      //     <button id="down" className="btn btn-sm btn-primary" onClick={this.voteDown}>&darr;</button>
      //   </span>
      // </li>

      <div className="tweet">

        <div className="tweet__container">
          <div className="tweet__profile_picture">
            <img src="" />
          </div>
          <div className="tweet__screen_name"><a href="http://twitter.com/">@</a></div>

          <div className="tweet__body">{this.props.tweet.value.text}</div>

          <div className="tweet__meta">
            <a href="https://twitter.com//status/"><time className="tweet__time timeago" datetime="">

            </time></a>
          </div>
        </div>


      </div>

    );
  }

});

module.exports = StreamItem;
