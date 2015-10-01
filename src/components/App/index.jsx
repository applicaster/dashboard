import React from 'react';
import map from 'lodash/collection/map';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Box from '../Box';
import Header from '../Header';

injectTapEventPlugin();

const styles = {
  app: {
    backgroundColor: '#ccc',
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    overflowY: 'auto',
  },
  content: {
    maxWidth: 1100,
    margin: '10px auto 0 auto',
  },
  container: {
    marginTop: 20,
  },
};

export default React.createClass({
  propTypes: {
    getBoxsListAction: React.PropTypes.func,
    boxList: React.PropTypes.array,
  },

  componentDidMount() {
    this.props.getBoxsListAction();
  },

  render() {
    return (
      <div style={styles.app}>
        <Header/>
        <div
          className="row"
          style={styles.content}>
          {map(this.props.boxList, (box, index) => {
            const imageURL = (box.get('image')) ? box.get('image')._url : '';
            return (
              <Box
                key={index}
                title={box.get('title')}
                desc={box.get('description')}
                href={box.get('linkUrl')}
                imgSrc={imageURL}/>
            );
          })}
        </div>
      </div>
    );
  },
});
