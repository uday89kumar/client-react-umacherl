import React from 'react';
import LessonTabs from "./LessonTabs";

class ModuleEditor extends React.Component {

    constructor() {
        super();
        this.state = {
            courseId: '',
            moduleId: ''
        };
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    componentDidMount() {
        this.setCourseId(this.props.match.params.courseId);
        this.setModuleId(this.props.match.params.moduleId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.match.params.courseId);
        this.setModuleId(newProps.match.params.moduleId);
    }

    render() {
        return (
                <nav className="wbdv-padding-0 navbar-expand-lg justify-content-between">
                    <LessonTabs courseId={this.props.match.params.courseId}
                                moduleId={this.props.match.params.moduleId}/>
                </nav>
        );
    }
}

export default ModuleEditor;