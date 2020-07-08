import React from 'react';
import TopicServiceClient from "../services/TopicServiceClient";
import {Route} from 'react-router-dom';
import WidgetEditor from "./WidgetEditor";

export default class TopicEditor extends React.Component {

    constructor() {
        super();
        this.topicService = TopicServiceClient.instance;
        this.setTopicId = this.setTopicId.bind(this);
        this.state = {
            topicId: ''
        };
    }

    setTopicId(topicId) {
        this.setState({topicId: topicId});
    }

    componentDidMount() {
        this.setTopicId(this.props.match.params.topicId);
    }

    componentWillReceiveProps(newProps) {
        this.setTopicId(newProps.match.params.topicId);
    }

    render() {
        return (
                <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId/topic/:topicId/widget"
                       component={WidgetEditor}>
                </Route>
        );
    }
}