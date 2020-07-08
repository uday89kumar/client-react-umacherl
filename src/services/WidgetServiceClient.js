let _singleton = Symbol();
const TOPIC_API_URL = 'https://umacherl-course-list.herokuapp.com/api/topic';
const WIDGET_API_URL = 'https://umacherl-course-list.herokuapp.com/api/widget';

export default class WidgetServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton]) this[_singleton] = new WidgetServiceClient(_singleton);
        return this[_singleton]
    }

    createWidget(topidIC, widget) {
        var widgetStr = JSON.stringify(widget);
        return fetch(TOPIC_API_URL + '/' + topidIC + '/widget', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: widgetStr
        })
            .then(function (response) {
                return response.json();
            })
            .catch(e => console.log(e));
    }

    saveAllWidgets(topicId, widgets){
        var widgetsStr = JSON.stringify(widgets);
        return fetch(TOPIC_API_URL + '/' + topicId + '/widgets', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: widgetsStr
        })
            .then(function (response) {
                return response.json();
            })
            .catch(e => console.log(e));
    }

    deleteWidget(id) {
        return fetch(WIDGET_API_URL + '/' + id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response;
            })
            .catch(e => console.log(e));
    }

    findAllWidgets() {
        return fetch(WIDGET_API_URL, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            })
            .catch(e => console.log(e));
    }

    findWidgetById(id) {
        return fetch(WIDGET_API_URL + '/' + id, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            })
            .catch(e => console.log(e));
    }

    findAllWidgetsForTopic = async (topicId) => {
        let response = await fetch(TOPIC_API_URL + '/' + topicId + '/widget', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        let jsonres = await response.json();

        return jsonres;
    }

    updateWidget(id, widget) {
        var widgetStr = JSON.stringify(widget);
        return fetch(WIDGET_API_URL + '/' + id, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: widgetStr
        })
            .then(function (response) {
                return response.json();
            })
            .catch(e => console.log(e));
    }
}