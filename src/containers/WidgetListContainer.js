import React from 'react';
import {connect} from 'react-redux'
import WidgetItem from '../components/WidgetItem';
import * as constants from '../constants/WidgetConstants';
import * as widgetActions from '../actions/WidgetActions';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import { Prompt } from "react-router-dom";

class WidgetList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topicId: ''
        };
        this.saveAllWidgets = this.saveAllWidgets.bind(this);
        this.createNewWidget = this.createNewWidget.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    saveAllWidgets() {
        this.props.saveWidgets(this.state.topicId, this.props.widgets);
    }

    componentWillReceiveProps(newProps) {
        this.setState({topicId: newProps.topicId});
        if (this.props.topicId !== newProps.topicId) {
            this.props.findAllWidgetsForTopic(newProps.topicId);
        }
    }

    componentDidMount() {
        this.setState({topicId: this.props.topicId});
    }

    onDragEnd(result) {
        this.props.dragEnd(result, this.props.widgets);
    }

    createNewWidget() {
        this.props.createWidget({
            name: '',
            text: '',
            position: this.props.widgets.length,
            id: this.props.widgets.length + 1,
            //id: Math.floor((Math.random() * 100) + 1),
            classname: 'Heading',
            size: '1',
            src: '',
            href: '',
            listItems: ''
        })
    }

    render() {
        let previewChecked;
        return (

            <div className="wbdv-padding-5">
                {/*<Prompt*/}
                    {/*when={this.props.isDirty}*/}
                    {/*message={location =>*/}
                        {/*`There is some unsaved data on the form. Do you want to navigate away?`*/}
                    {/*}*/}
                {/*/>*/}
                <div className="wbdv-widget-list-top">
                    <div>
                        <label>
                        <label className="wbdv-switch float-left">
                            <input type="checkbox"
                                   ref={node => previewChecked = node}
                                   checked={this.props.preview}
                                   onClick={() => {
                                       this.props.updatedPreview(previewChecked.checked);
                                   }}/>
                            <span className="wbdv-slider round"/>
                        </label>
                            Preview
                        </label>
                        <button className="wbdv-margin-5 btn-info btn"
                                onClick={() => this.createNewWidget()}>
                            <i className="fa fa-plus-circle"/>
                        </button>
                        <button className="wbdv-margin-5 btn btn-success"
                                disabled={this.props.preview}
                                onClick={() => this.saveAllWidgets()}>
                            <i className="fa fa-save"/>
                        </button>
                    </div>
                </div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">

                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                className={snapshot.isDraggingOver ?
                                    "wbdv-draggable-list-dragging" :
                                    "wbdv-draggable-list"}
                            >
                                {this.props.widgets.map((widget, index) => (
                                    <WidgetItem widget={widget}
                                                preview={this.props.preview}
                                                key={widget.id}
                                                index={index}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}

                        {/*<ul className="wbdv-margin-5 wbdv-bg list-group">*/}
                        {/*{this.props.widgets.map(widget => (*/}
                        {/*<WidgetItem widget={widget}*/}
                        {/*preview={this.props.preview}*/}
                        {/*key={widget.id}*/}
                        {/*/>*/}
                        {/*))}*/}
                        {/*</ul>*/}
                    </Droppable>
                </DragDropContext>
            </div>
        )
    }
}

const stateToPropertyMapper = state => (
    {
        widgets: state.widgets,
        preview: state.preview,
        isDirty: state.isDirty
    }
);

const dispatcherToPropertyMapper = dispatch => (
    {
        saveWidgets: (topicId, widgets) =>
            widgetActions.saveAllWidgets(dispatch, topicId, widgets),

        createWidget: (w) => dispatch({
            type: constants.CREATE_WIDGET,
            widget: w
        }),

        findAllWidgetsForTopic: (topicId) =>
            widgetActions.findAllWidgetsForTopic(dispatch, topicId),

        updatedPreview: (value) => dispatch({
            type: constants.UPDATE_PREVIEW,
            value: value
        }),

        dragEnd: (result, widgets) =>
            widgetActions.onDragEnd(dispatch, result, widgets)
    }
);

const WidgetListContainer =
    connect(
        stateToPropertyMapper,
        dispatcherToPropertyMapper)(WidgetList)

export default WidgetListContainer