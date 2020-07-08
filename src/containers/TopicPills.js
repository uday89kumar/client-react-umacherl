import React from 'react';
import TopicServiceClient from '../services/TopicServiceClient';
import TopicPillItem from '../components/TopicPillItem';

export default class TopicPills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lessonId: '',
            moduleId: '',
            courseId: '',
            topic: {title: ''},
            topics: []
        };

        this.topicService = TopicServiceClient.instance;
        this.setTopics = this.setTopics.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);
        this.createTopic = this.createTopic.bind(this);
        this.setTopicTitle = this.setTopicTitle.bind(this);
        this.createTopicServiceCall = this.createTopicServiceCall.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setLessonId(lessonId) {
        this.setState({lessonId: lessonId});
    }

    setTopicTitle(event) {
        this.setState({topic: {title: event.target.value}})
    }

    componentDidMount() {
        this.setModuleId(this.props.moduleId);
        this.setCourseId(this.props.courseId);
        this.setLessonId(this.props.lessonId);
        this.findAllTopicsForLesson(this.props.courseId, this.props.moduleId, this.props.lessonId);
    }

    componentWillReceiveProps(newProps) {
        this.setModuleId(newProps.moduleId);
        this.setCourseId(newProps.courseId);
        this.setLessonId(newProps.lessonId);
        this.findAllTopicsForLesson(newProps.courseId, newProps.moduleId, newProps.lessonId);
    }

    findAllTopicsForLesson(courseId, moduleId, lessonId) {
        this.topicService.findAllTopicsForLesson(courseId, moduleId, lessonId).then((topics) => {
            this.setTopics(topics);
        });
    }

    setTopics(topics) {
        this.setState({topic: {title: ''}});
        this.setState({topics: topics})
    }

    createTopic() {
        if (undefined === this.state.topic || '' === this.state.topic.title) {
            this.setState({topic: {title: 'New Topic'}}, function () {
                this.createTopicServiceCall();
            });
        }
        else this.createTopicServiceCall();
    }

    createTopicServiceCall() {
        this.topicService.createTopic(this.state.courseId,
            this.state.moduleId, this.state.lessonId, this.state.topic).then(() => {
            this.findAllTopicsForLesson(this.state.courseId, this.state.moduleId, this.state.lessonId);
        });
    }

    deleteTopic(topicId) {
        let input = window.confirm("Are you sure you want to delete this topic?");
        if (input === true) {
            this.topicService.deleteTopic(topicId).then(() => {
                this.findAllTopicsForLesson(this.state.courseId, this.state.moduleId, this.state.lessonId)
            });
        }
    }

    updateTopic(topicId, topic) {
        this.topicService.updateTopic(topicId, topic).then(() => {
            this.findAllTopicsForLesson(this.state.courseId, this.state.moduleId)
        });
    }

    renderTopics() {
        return this.state.topics.map((topic) => {
            return <TopicPillItem key={topic.id}
                                  topic={topic}
                                  courseId={this.state.courseId}
                                  moduleId={this.state.moduleId}
                                  lessonId={this.state.lessonId}
                                  delete={this.deleteTopic}
                                  update={this.updateTopic}/>
        });
    }

    render() {
        return (
            <div>
                <ul className="wbdv-topic-pills nav nav-pills nav-justified">
                    {this.renderTopics()}
                    <li>
                        <div className="form-row">
                    <span className="col-11">
                    <input onChange={this.setTopicTitle}
                           value={this.state.topic.title}
                           placeholder="Topic Title"
                           className="form-control"/>
                    </span>
                            <span className="col-1">
                    <i className="fa fa-plus" onClick={this.createTopic}/>
                        </span>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}