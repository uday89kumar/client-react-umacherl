import React from 'react';
import * as widgetActions from '../actions/WidgetActions'

export const HeadingWidget =
    ({widget, preview, widgets, updateWidget}) => {
        let text;
        let size;
        let name;
        return (
            <div>
                <div hidden={preview}>
                <label htmlFor="text">
                    Heading Text
                </label>
                <input ref={node => text = node}
                       className="form-control"
                       id="text"
                       placeholder="Heading Text"
                       value={widget.text}
                       defaultValue={widget.text}
                       onChange={() => {
                           widget.text = text.value;
                           updateWidget(widget)
                       }}/>
                <label htmlFor="size">
                    Heading Size
                </label>
                <select ref={node => size = node}
                        className="form-control"
                        id="size"
                        defaultValue={widget.size}
                        onChange={() => {
                            widget.size = size.value;
                            updateWidget(widget)
                        }}>
                    <option value="1">
                        Heading 1
                    </option>
                    <option value="2">
                        Heading 2
                    </option>
                    <option value="3">
                        Heading 3
                    </option>
                </select>
                <label htmlFor="widgetname">
                    Widget Name
                </label>
                <input ref={node => name = node}
                       className="form-control"
                       id="widgetname"
                       placeholder="Widget Name"
                       value={widget.name}
                       onChange={() => {
                           if(widgetActions.validateWidgetName(widgets, name.value, widget.id)){
                               widget.name = name.value;
                               updateWidget(widget)
                           }
                       }}/>
                </div>
                <h4>Preview</h4>
                {(widget.size === '1' || widget.size === 1) && <h1>{widget.text}</h1>}
                {(widget.size === '2' || widget.size === 2) && <h2>{widget.text}</h2>}
                {(widget.size === '3' || widget.size === 3) && <h3>{widget.text}</h3>}
            </div>
        )
    }