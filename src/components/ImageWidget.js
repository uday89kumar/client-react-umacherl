import React from 'react'

export const ImageWidget =
    ({widget, preview, widgets, updateWidget}) => {
        let text;
        let url;
        return (
            <div>
                <div hidden={preview}>
                <label htmlFor="url">
                    Image URL
                </label>
                <input ref={node => url = node}
                       className="form-control"
                       id="url"
                       placeholder="Image URL"
                       defaultValue= {widget.src}
                       onChange={() => {
                           widget.src = url.value;
                           updateWidget(widget)
                       }}/>
                <label htmlFor="widgetname">
                    Widget Name
                </label>
                <input ref={node => text = node}
                       className="form-control"
                       id="widgetname"
                       placeholder="Widget Name"
                       value={widget.name}
                       onChange={() => {
                           widget.name = text.value;
                           updateWidget(widget)
                       }}/>
                </div>
                <h4>Preview</h4>
                <img src={widget.src}/>
            </div>
        )
    };