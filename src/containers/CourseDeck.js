import React, {Component} from 'react';
import CourseCard from '../components/CourseCard';
import CourseServiceClient from "../services/CourseServiceClient";

export default class CourseDeck extends Component {
    constructor(props) {
        super(props);
        this.courseService = CourseServiceClient.instance;
        this.state = {
            courses: [],
            course: {
                title: '',
                id: ''
            }
        };
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.createCourseServiceCall = this.createCourseServiceCall.bind(this);
        this.editCourse = this.editCourse.bind(this);
        this.updateCourse = this.updateCourse.bind(this);
        this.listView = this.listView.bind(this);
    }

    courseRows() {
        return this.state.courses.map((course) => {
            return <CourseCard course={course} key={course.id} delete={this.deleteCourse} update={this.editCourse}/>;
        });
    }

    titleChanged(event) {
        let id = this.state.course.id;
        this.setState({course: {title: event.target.value, id}});
    }

    createCourse() {
        if (undefined === this.state.course || '' === this.state.course.title) {
            this.setState({course: {title: 'New Course'}}, function () {
                this.createCourseServiceCall();
            });
        }
        else this.createCourseServiceCall();
    }

    createCourseServiceCall() {
        this.courseService.createCourse(this.state.course).then(() => {
            this.findAllCourses();
        });
    }

    updateCourse() {
        this.courseService.updateCourse(this.state.course.id, this.state.course).then(() => {
            this.findAllCourses();
        });
    }

    editCourse(course) {
        this.setState({course: {title: course.title, id: course.id}});
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
            this.setState({course: {title: ''}});
        });
    }

    listView() {
        return this.props.history.push('/courses');
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="form-group row wbdv-new-course-div">
                    <i className="col-sm-1 col-form-label fa fa-bars"/>
                    <div className="col-sm-8">
                        <input className="form-control"
                               id="titleFld"
                               placeholder="New Course"
                               value={this.state.course.title}
                               onChange={this.titleChanged}/>
                    </div>
                    <div className="col-sm-3">
                        <i className="col-sm-1 col-form-label fa fa-plus wbdv-icon-white" onClick={this.createCourse}/>
                        <i className="col-sm-1 col-form-label fa fa-check wbdv-icon-white" onClick={this.updateCourse}/>
                        <i className="col-sm-1 col-form-label fa fa-list wbdv-icon-white" onClick={this.listView}/>
                    </div>
                </div>
                <h2> Courses </h2>
                <div className="card-deck wbdv-card-deck">
                    {this.courseRows()}
                </div>
            </div>
        )
    }
}