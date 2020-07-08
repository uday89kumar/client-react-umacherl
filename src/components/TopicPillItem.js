import React from 'react';
import {Link} from 'react-router-dom';

export default class TopicPillItem extends React.Component {

    render() {
        return (
            <li className="nav-item wbdv-pill-item">
                <Link className="wbdv-link"
                      to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${this.props.topic.id}/widget`}>
                    {this.props.topic.title}
                </Link>
                &nbsp;
                <i onClick={() => {
                    this.props.delete(this.props.topic.id)
                }} className="fa fa-times wbdv-icon-small wbdv-icon-white">

                </i>
            </li>
        );
    }
}