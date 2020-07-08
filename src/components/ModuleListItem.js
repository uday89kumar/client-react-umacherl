import React from 'react';
import {Link} from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';

export default class ModuleListItem extends React.Component {
    render() {
        return (
            <Draggable className="wbdv-module-list-item list-group-item"
                       key={this.props.module.id}
                       draggableId={this.props.module.id}
                       index={this.props.index}
            >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={snapshot.isDragging?
                                    "wbdv-draggable-list-item-dragging":
                                    "wbdv-draggable-list-item"}
                    >
                        <Link
                            to={`/course/${this.props.courseId}/module/${this.props.module.id}`}>
                            {this.props.module.title}
                        </Link>
                        <span className='float-right'>
                        <i className="fa fa-trash"
                           onClick={() => {
                               this.props.delete(this.props.module.id)
                           }}
                        />
                            &nbsp;&nbsp;&nbsp;
                            <i className="fa fa-pencil"
                               onClick={() => {
                                   this.props.update(this.props.module.id, this.props.module)
                               }}
                            />
                    </span>
                    </div>
                )}

            </Draggable>
        );
    }
}