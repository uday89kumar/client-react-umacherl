import React from 'react';
import WidgetListContainer from './WidgetListContainer'

export default class WidgetEditor
    extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            topicId: ''
        };
    }

    componentDidMount() {
        this.setState({topicId: this.props.match.params.topicId});
    }

    componentWillReceiveProps(newProps) {
        this.setState({topicId: newProps.match.params.topicId});
    }

    render() {
        return (
                <WidgetListContainer topicId={this.state.topicId}/>
        );
    }
}