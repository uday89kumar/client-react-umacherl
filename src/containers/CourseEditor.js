import React from 'react';
import {Route} from 'react-router-dom';
import ModuleLists from './ModuleLists';
import ModuleEditor from './ModuleEditor';
import CourseServiceClient from "../services/CourseServiceClient";

class CourseEditor extends React.Component {

    constructor() {
        super();
        this.selectCourse = this.selectCourse.bind(this);
        this.state = {courseId: '', courseTitle:''};
        this.courseService = CourseServiceClient.instance;
        this.findCourseById = this.findCourseById.bind(this);
        this.setCourseTitle = this.setCourseTitle.bind(this);
    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId);
        this.findCourseById(this.props.match.params.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.selectCourse(newProps.match.params.courseId);
        this.findCourseById(newProps.match.params.courseId);
    }

    findCourseById(courseId){
        this.courseService.findCourseById(courseId).then((course) => {
            this.setCourseTitle(course.title);
        });
    }

    setCourseTitle(courseTitle) {
        this.setState({courseTitle: courseTitle});
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row wbdv-row">
                    <div className="wbdv-top-border wbdv-padding-0 col-4">
                        <ModuleLists courseId={this.props.match.params.courseId}/>
                    </div>
                    <div className=" wbdv-top-border wbdv-padding-0 col-8">
                        <Route path="/course/:courseId/module/:moduleId"
                               component={ModuleEditor}>
                        </Route>
                    </div>
                </div>
            </div>
        );
    }
}

export default CourseEditor;