let _singleton = Symbol();
const COURSE_API_URL = 'https://umacherl-course-list.herokuapp.com/api/course';
const TOPIC_API_URL = 'https://umacherl-course-list.herokuapp.com/api/topic';

class TopicServiceClient
{
    constructor(singletonToken)
    {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance()
    {
        if (!this[_singleton]) this[_singleton] = new TopicServiceClient(_singleton);
        return this[_singleton]
    }

    createTopic(cid, mid, lid, topic) {
        var topicStr = JSON.stringify(topic);
        return fetch(COURSE_API_URL + '/' + cid + '/module/' + mid + '/lesson/' + lid + '/topic', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: topicStr
        })
            .then(function(response) {
                return response.json();
            });
    }

    deleteTopic(id) {
        return fetch(TOPIC_API_URL + '/' + id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function(response){
                return response;
            });
    }

    findAllTopics() {
        return fetch(TOPIC_API_URL, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function(response) {
                return response.json();
            });
    }

    findTopicById(id) {
        return fetch(TOPIC_API_URL + '/' + id, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function(response) {
                return response.json();
            });
    }

    findAllTopicsForLesson(cid, mid, lid) {
        return fetch(COURSE_API_URL + '/' + cid + '/module/' + mid + '/lesson/' + lid + '/topic', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function(response) {
                return response.json();
            });
    }

    updateTopic(id, topic) {
        var topicStr = JSON.stringify(topic);
        return fetch(TOPIC_API_URL + '/' + id, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: topicStr
        })
            .then(function(response) {
                return response.json();
            });
    }
}

export default TopicServiceClient;