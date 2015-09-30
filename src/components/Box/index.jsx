import React from 'react/addons';
import {
  Card,
  CardTitle,
  CardMedia,
 } from 'material-ui';

export default React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    desc: React.PropTypes.string,
    href: React.PropTypes.string,
    imgSrc: React.PropTypes.string,
  },

  mixins: [React.addons.PureRenderMixin],

  render() {
    const styles = {
      container: {
        marginTop: 20,
      },
      a: {
        textDecoration: 'none',
      },
      cardTitle: {
        height: 100,
      },
    };

    return (
      <div
        style={styles.container}
        className="col-xs-12 col-sm-4 col-md-3 col-lg-3">
        <Card>
          <a
            style={styles.a}
            href={this.props.href}
            target="_blank">
            <CardMedia>
              <img src={this.props.imgSrc}/>
            </CardMedia>
            <CardTitle
              style={styles.cardTitle}
              title={this.props.title}
              subtitle={this.props.desc}/>
          </a>
        </Card>
      </div>
    );
  },
});

