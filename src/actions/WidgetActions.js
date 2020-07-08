import WidgetServiceClient from "../services/WidgetServiceClient";
import * as constants from '../constants/WidgetConstants';

export const findAllWidgetsForTopic = (dispatch, topicId) => {
    if ('' !== topicId) {
        WidgetServiceClient.instance
            .findAllWidgetsForTopic(topicId)
            .then(widgets => dispatch({
                type: constants.FIND_ALL_WIDGETS_FOR_TOPIC,
                widgets: widgets
            }))
            .catch((e) => console.log(e))
    }

};

export const saveAllWidgets = (dispatch, topicId, widgets) => {
    let widgetService = WidgetServiceClient.instance;
    if ('' === topicId) {
        return [];
    }

    widgetService.saveAllWidgets(topicId, widgets)
        .then(widgets => dispatch({
            type: constants.SAVE_ALL_WIDGETS,
            widgets: widgets
        }))
        .catch((e) => console.log(e))
};

export const moveWidgetUp = (dispatch, widgets, wid) => {
    let i;
    let newwidgets = widgets.slice();
    for (i = 0; i < newwidgets.length; i++) {
        if(newwidgets[i].id === wid){
            break;
        }
    }
    newwidgets = moveWidgets(newwidgets, i, i-1);
    dispatch({
        type: constants.MOVE_WIDGET_UP,
        widgets: newwidgets
    })
}

export const moveWidgetDown = (dispatch, widgets, wid) => {
    let i;
    let newwidgets = widgets.slice();
    for (i = 0; i < newwidgets.length; i++) {
        if(newwidgets[i].id === wid){
            break;
        }
    }
    newwidgets = moveWidgets(newwidgets, i, i+1);
    dispatch({
        type: constants.MOVE_WIDGET_DOWN,
        widgets: newwidgets
    })
}


export const moveWidgets = (widgets, old_index, new_index) => {
    if (new_index >= widgets.length) {
        let k = new_index - widgets.length + 1;
        while (k--) {
            widgets.push(undefined);
        }
    }
    widgets.splice(new_index, 0, widgets.splice(old_index, 1)[0]);
    let temp = widgets[old_index].position;
    widgets[old_index].position = widgets[new_index].position;
    widgets[new_index].position = temp;
    return widgets;
};

export const disableUpButton = (widgets, wid) => {
    let i;
    let newwidgets = widgets.slice();
    for (i = 0; i < newwidgets.length; i++) {
        if(newwidgets[i].id === wid){
            break;
        }
    }
    return (i === 0);
}

export const disableDownButton = (widgets, wid) => {
    let i;
    let newwidgets = widgets.slice();
    for (i = 0; i < newwidgets.length; i++) {
        if(newwidgets[i].id === wid){
            break;
        }
    }
    return (i === newwidgets.length-1);
}

// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
}

export const onDragEnd = (dispatch, result, widgets) => {
    // dropped outside the list
    if (!result.destination) {
        return;
    }

    const newwidgets = reorder(
        widgets,
        result.source.index,
        result.destination.index
    );

    dispatch({
        type: constants.DRAG_WIDGETS_END,
        widgets: newwidgets
    })
}

export const validateWidgetName = (widgets, name, id) => {
    // let found = widgets.find(widget => {
    //     return (widget.name === name && widget.id !== id)
    // });
    //
    // return (found === undefined);
    return true;
}

