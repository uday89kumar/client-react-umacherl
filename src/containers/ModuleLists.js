import React from 'react';
import ModuleListItem from '../components/ModuleListItem';
import ModuleServiceClient from "../services/ModuleServiceClient";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import CourseServiceClient from "../services/CourseServiceClient";

export default class ModuleLists extends React.Component {
    constructor(props) {
        super(props);
        this.moduleService = ModuleServiceClient.instance;
        this.courseService = CourseServiceClient.instance;
        this.state = {
            courseId: '',
            courseTitle:'',
            module: {title: '', id:''},
            modules: []
        };
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleTitle = this.setModuleTitle.bind(this);
        this.createModule = this.createModule.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.createModuleServiceCall = this.createModuleServiceCall.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.setCourseTitle = this.setCourseTitle.bind(this);
        this.findCourseById = this.findCourseById.bind(this);
        this.editModule = this.editModule.bind(this);
        this.updateModule = this.updateModule.bind(this);
    }

    reorder(list, startIndex, endIndex) {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }



    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const courses = this.reorder(
            this.state.modules,
            result.source.index,
            result.destination.index
        );

        this.setState({
            courses,
        });
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setCourseTitle(courseTitle) {
        this.setState({courseTitle: courseTitle});
    }

    setModuleTitle(event) {
        this.setState({module: {title: event.target.value, id:this.state.module.id}});
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.findAllModulesForCourse(this.props.courseId);
        this.findCourseById(this.props.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId);
        this.findCourseById(newProps.courseId);
    }

    findAllModulesForCourse(courseId) {
        this.moduleService.findAllModulesForCourse(courseId).then((modules) => {
            this.setModules(modules)
        });
    }

    findCourseById(courseId){
        this.courseService.findCourseById(courseId).then((course) => {
            this.setCourseTitle(course.title);
        });
    }

    setModules(modules) {
        this.setState({module: {title: '', id:0}});
        this.setState({modules: modules})
    }

    updateModule(){
        this.moduleService.updateModule(this.state.module.id, this.state.module).then(() => {
            this.findAllModulesForCourse(this.state.courseId);
        });
    }

    createModule() {
        if (undefined === this.state.module || '' === this.state.module.title) {
            this.setState({module: {title: 'New Module', id:0}}, function () {
                this.createModuleServiceCall();
            });
        }
        else this.createModuleServiceCall();
    }

    createModuleServiceCall() {
        this.moduleService.createModule(this.state.courseId, this.state.module).then(() => {
            this.findAllModulesForCourse(this.state.courseId);
        });
    }

    deleteModule(moduleId) {
        let input = window.confirm("Are you sure you want to delete this module?");
        if (input === true) {
            this.moduleService.deleteModule(moduleId).then(() => {
                this.findAllModulesForCourse(this.state.courseId)
            });
        }
    }

    editModule(id, module){
        this.setState({module: {title:module.title, id: id}});
    }

    renderModules() {
        return this.state.modules.map((module, index) => {
            return <ModuleListItem key={module.id}
                                   index={index}
                                   courseId={this.state.courseId}
                                   module={module}
                                   delete={this.deleteModule}
                                   update={this.editModule}
            />
        });
    }

    render() {
        return (
            <div className="wbdv-padding-0">
                <h2 className="wbdv-lesson-tabs">&nbsp;&nbsp;&nbsp;&nbsp;Modules for {this.state.courseTitle}</h2>
                <div className="wbdv-padding-5">

                <div className="row">
                    <div className="col-10">
                        <input onChange={this.setModuleTitle}
                               value={this.state.module.title}
                               placeholder="Module Title"
                               className="form-control"/>
                    </div>
                    <div className="col-2">
                        <i className="float-left fa fa-plus" onClick={this.createModule}/>
                        <i className="float-right fa fa-check" onClick={this.updateModule}/>
                    </div>
                </div>

                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                className={snapshot.isDraggingOver?
                                "wbdv-draggable-list-dragging":
                                "wbdv-draggable-list"}
                            >
                                {this.renderModules()}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                </div>
            </div>
        );
    }
}