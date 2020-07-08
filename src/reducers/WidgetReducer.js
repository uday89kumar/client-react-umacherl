import * as constants from '../constants/WidgetConstants';
import * as WidgetAction from '../actions/WidgetActions';

let initialState = {
    widgets: [],
    preview: false
};

let newState;

export const WidgetReducer = (
    state=initialState,
    action) => {

    switch (action.type) {

        case constants.FIND_ALL_WIDGETS_FOR_TOPIC:
        case constants.SAVE_ALL_WIDGETS:
            newState = Object.assign({}, state)
            newState.widgets = action.widgets;
            newState.isDirty = false;
            newState.widgets.sort((a, b) => parseInt(b.position) - parseFloat(a.position));
            return newState

        case constants.SET_ALL_WIDGETS_FOR_TOPIC:
        case constants.MOVE_WIDGET_UP:
        case constants.MOVE_WIDGET_DOWN:
        case constants.DRAG_WIDGETS_END:
            newState = Object.assign({}, state)
            newState.widgets = action.widgets;
            newState.widgets.sort((a, b) => parseInt(b.position) - parseFloat(a.position));
            return newState

        case constants.DELETE_WIDGET:
            newState = Object.assign({}, state);
            newState.isDirty = true;
            newState.widgets = state.widgets.filter(
                widget => widget.position !== action.widgetId);
            return newState;

        case constants.CREATE_WIDGET:
            newState = Object.assign({}, state);
            newState.isDirty = true;
            newState.widgets= [
                    action.widget,
                    ...state.widgets
                ];
            return newState;

        case constants.UPDATE_WIDGET:
            newState = Object.assign({}, state);
            newState.isDirty = true;
            newState.widgets = state.widgets.map(widget => {
                    if(widget.id === action.widget.id) {
                        return action.widget
                    } else {
                        return widget
                    }
                });
                return newState;

        case constants.UPDATE_WIDGET_TYPE:
            newState = Object.assign({}, state);
            newState.widgets = state.widgets.map(widget => {
                    if(widget.id === action.widgetId) {
                        widget.classname = action.widgetType
                        return widget
                    } else {
                        return widget
                    }
                });
            return newState;

        case constants.UPDATE_PREVIEW:
            newState = Object.assign({}, state);
            newState.preview = action.value;
            return newState;

        default:
            return state
    }
}