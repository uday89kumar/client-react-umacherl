import React from 'react';
import CourseRow from "../components/CourseRow";
import CourseServiceClient from "../services/CourseServiceClient";

class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseServiceClient.instance;
        this.state = {
            courses: [],
            course:{
                title:'',
                id:''}
        };
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.createCourseServiceCall = this.createCourseServiceCall.bind(this);
        this.editCourse = this.editCourse.bind(this);
        this.updateCourse = this.updateCourse.bind(this);
        this.gridView = this.gridView.bind(this);
    }

    courseRows() {
        return this.state.courses.map((course) => {
            return <CourseRow course={course} key={course.id} delete={this.deleteCourse} update={this.editCourse}/>;
        });
    }

    titleChanged(event) {
        let id = this.state.course.id;
        this.setState({course: {title: event.target.value, id}});
    }

    createCourse() {
        if(undefined === this.state.course || '' === this.state.course.title){
            this.setState({course: {title: 'New Course'}}, function () {
                this.createCourseServiceCall();
            });
        }
        else this.createCourseServiceCall();
    }

    createCourseServiceCall(){
        this.courseService.createCourse(this.state.course).then(() => {
            this.findAllCourses();
        });
    }

    updateCourse(){
        this.courseService.updateCourse(this.state.course.id, this.state.course).then(() => {
            this.findAllCourses();
        });
    }

    editCourse(course){
        this.setState({course: {title:course.title, id: course.id}});
    }

    deleteCourse(courseId) {
        let input = window.confirm("Are you sure you want to delete this course?");
        if (input === true) {
            this.courseService.deleteCourse(courseId).then(() => {
                this.findAllCourses();
            });
        }
    }

    componentDidMount() {
        this.findAllCourses();
    }

    findAllCourses() {
        this.courseService.findAllCourses().then((courses) => {
            this.setState({courses: courses});
            this.setState({course: {title:''}});
        });
    }

    gridView(){
        return this.props.history.push('/coursegrid');
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="form-group row wbdv-new-course-div">

                    {/*<i className="col-sm-1 col-form-label fa fa-bars"/>*/}
                    <i className="col-sm-1 col-form-label"/>

                    <div className="col-sm-8">
                        <input className="form-control"
                               id="titleFld"
                               placeholder="Course Title"
                               value={this.state.course.title}
                               onChange={this.titleChanged}/>
                    </div>
                    <div className="col-sm-3">
                        <i className="col-sm-1 col-form-label fa fa-plus wbdv-icon-white" onClick={this.createCourse}/>
                        <i className="col-sm-1 col-form-label fa fa-check wbdv-icon-white" onClick={this.updateCourse}/>
                        <i className="col-sm-1 col-form-label fa fa-th wbdv-icon-white" onClick={this.gridView}/>
                    </div>
                </div>
                <h2> Course List </h2>
                <table className="table" >
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Owned By</th>
                        <th>Created</th>
                        <th>Last Modified</th>
                        <th>actions</th>
                        {/*<th><i className="fa fa-sort"/></th>*/}
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.courseRows()}
                    </tbody>
                </table>
            </div>)
    }
}

export default CourseList;