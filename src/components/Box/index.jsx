import React from 'react/addons';
import {
  Card,
  CardTitle,
  CardMedia,
  FloatingActionButton,
  FontIcon,
 } from 'material-ui';
import { DragSource } from 'react-dnd';

const boxSource = {
  beginDrag(props) {
    return {id: props.info.objectId};
  },
  canDrag(props) {
    return props.inEditMode;
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
    inEditMode: React.PropTypes.bool,
  },

  mixins: [React.addons.PureRenderMixin],

  render() {
    const {inEditMode} = this.props;
    const {
      linkUrl,
      title,
      description,
      image,
    } = this.props.info;
    const imageURL = (image) ? image.url : '';
    const connectDragSource = this.props.connectDragSource;
    const styles = {
      card: {
        position: 'relative',
        border: (inEditMode) ? 'dashed 2px #000' : 'none',
      },
      a: {
        textDecoration: 'none',
      },
      cardTitle: {
        height: 100,
      },
      editBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
      },
      editSpan: {
        cursor: 'move',
      },
    };
    const editBtn = (inEditMode) ?
      <FloatingActionButton
        backgroundColor="#ccc"
        mini={true}
        style={styles.editBtn}>
        <FontIcon className="material-icons">mode_edit</FontIcon>
      </FloatingActionButton> :
      null;


    const cardContence = (inEditMode) ?
     <span style={styles.editSpan}>
       <CardMedia>
         <img
           src={imageURL}/>
       </CardMedia>
       <CardTitle
         style={styles.cardTitle}
         title={title}
         subtitle={description}/>
     </span> :
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
     </a>;


    return connectDragSource(
      <div>
        <Card style={styles.card}>
          {editBtn}
          {cardContence}
        </Card>
      </div>
    );
  },
});

export default DragSource('BOX', boxSource, collect)(Box);
