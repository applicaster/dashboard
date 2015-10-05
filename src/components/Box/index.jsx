import React from 'react/addons';
import {
  Card,
  CardTitle,
  CardMedia,
 } from 'material-ui';
import { DragSource } from 'react-dnd';

const boxSource = {
  beginDrag(props) {
    return {id: props.info.objectId};
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}


const Box = React.createClass({

  propTypes: {
    info: React.PropTypes.object,
    connectDragSource: React.PropTypes.func,
  },

  mixins: [React.addons.PureRenderMixin],

  render() {
    const {
      linkUrl,
      title,
      description,
      image,
    } = this.props.info;
    const imageURL = (image) ? image.url : '';
    const connectDragSource = this.props.connectDragSource;
    const styles = {
      a: {
        textDecoration: 'none',
      },
      cardTitle: {
        height: 100,
      },
    };

    return connectDragSource(
      <div>
        <Card>
          <a
            style={styles.a}
            href={linkUrl}
            target="_blank">
            <CardMedia>
              <img
                src={imageURL}/>
            </CardMedia>
            <CardTitle
              style={styles.cardTitle}
              title={title}
              subtitle={description}/>
          </a>
        </Card>
      </div>
    );
  },
});

export default DragSource('BOX', boxSource, collect)(Box);
