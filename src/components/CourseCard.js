import React from 'react';
import {Link} from 'react-router-dom';
import CourseRow from './CourseRow';

export default class CourseCard extends React.Component {
    render() {
        return (
            <div className="card wbdv-card">
                <div className="card-body">
                    <Link to=
                              {`/course/${this.props.course.id}`}>
                        <img className="card-img-top"
                             src="https://picsum.photos/600/200"/>

                        <h5 className="card-title">
                            {this.props.course.title}
                        </h5>

                    </Link>
                    <span className="card-text">
                            <i className="fa fa-users"/>
                        &nbsp;
                        Modified
                        &nbsp;
                        {CourseRow.getModifiedTime(this.props.course.modified)}
                        </span>

                    <span className="float-right">
                            <i onClick={() => {
                                this.props.update(this.props.course)
                            }} className="fa fa-pencil">

                            </i>
                        &nbsp;
                        <i onClick={() => {
                            this.props.delete(this.props.course.id)
                        }} className="fa fa-trash">
                            </i>
                        </span>
                </div>

            </div>)
    }
}