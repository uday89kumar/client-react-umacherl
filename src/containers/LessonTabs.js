import React from 'react';
import LessonServiceClient from '../services/LessonServiceClient';
import LessonTabItem from '../components/LessonTabItem';
import LessonEditor from "./LessonEditor";
import {Route} from 'react-router-dom';
export default class LessonTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lessonId: '',
            moduleId: '',
            courseId: '',
            lesson: {title: ''},
            lessons: []
        };

        this.lessonService = LessonServiceClient.instance;
        this.setLessons = this.setLessons.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.setLessonTitle = this.setLessonTitle.bind(this);
        this.createLessonServiceCall = this.createLessonServiceCall.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setLessonTitle(event) {
        this.setState({lesson: {title: event.target.value}})
    }

    componentDidMount() {
        this.setModuleId(this.props.moduleId);
        this.setCourseId(this.props.courseId);
        this.findAllLessonsForModule(this.props.courseId, this.props.moduleId);
    }

    componentWillReceiveProps(newProps) {
        this.setModuleId(newProps.moduleId);
        this.setCourseId(newProps.courseId);
        this.findAllLessonsForModule(newProps.courseId, newProps.moduleId);
    }

    findAllLessonsForModule(courseId, moduleId) {
        this.lessonService.findAllLessonsForModule(courseId, moduleId).then((lessons) => {
            this.setLessons(lessons)
        });
    }

    setLessons(lessons) {
        this.setState({lesson: {title: ''}});
        this.setState({lessons: lessons})
    }

    createLesson() {
        if(undefined === this.state.lesson || '' === this.state.lesson.title){
            this.setState({lesson: {title: 'New Lesson'}}, function () {
                this.createLessonServiceCall();
            });
        }
        else this.createLessonServiceCall();
    }

    createLessonServiceCall(){
        this.lessonService.createLesson(this.state.courseId, this.state.moduleId, this.state.lesson).then(() => {
            this.findAllLessonsForModule(this.state.courseId, this.state.moduleId);
        });
    }

    deleteLesson(lessonId) {
        let input = window.confirm("Are you sure you want to delete this lesson?");
        if (input === true) {
            this.lessonService.deleteLesson(lessonId).then(() => {
                this.findAllLessonsForModule(this.state.courseId, this.state.moduleId)
            });
        }
    }

    updateLesson(lessonId, lesson) {
        this.lessonService.updateLesson(lessonId, lesson).then(() => {
            this.findAllLessonsForModule(this.state.courseId, this.state.moduleId)
        });
    }

    renderLessons() {
        return this.state.lessons.map((lesson) => {
            return <LessonTabItem key={lesson.id}
                                  lesson={lesson}
                                  courseId={this.state.courseId}
                                  moduleId={this.state.moduleId}
                                  delete={this.deleteLesson}
                                  update={this.updateLesson}/>
        });
    }

    render() {
        return (
            <div>
                    <ul className="wbdv-lesson-tabs nav nav-tabs">
                        {this.renderLessons()}
                        <li className="wbdv-new-lesson nav-item">
                            <div className="form-row">
                                <span className="col-11">
                                    <input onChange={this.setLessonTitle}
                                           value={this.state.lesson.title}
                                           placeholder="Lesson Title"
                                           className="form-control"/>

                                </span>
                                <span className="col-1">
                                    <i className="fa fa-plus wbdv-icon-white" onClick={this.createLesson}/>
                                </span>
                            </div>
                        </li>
                    </ul>
                <div className="tab-content">
                    <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId"
                           component={LessonEditor}>
                    </Route>
                </div>
            </div>
        );
    }
}