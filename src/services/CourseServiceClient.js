let _singleton = Symbol();
const COURSE_API_URL = 'https://umacherl-course-list.herokuapp.com/api/course';

class CourseServiceClient
{
    constructor(singletonToken)
    {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance()
    {
        if (!this[_singleton]) this[_singleton] = new CourseServiceClient(_singleton);
        return this[_singleton]
    }

    createCourse(course) {
        var date = new Date();

        var courseJson = {
            title: course.title,
            created: date.getTime(),
            modified: date.getTime(),
            owner: 'me'
        };
        var courseStr = JSON.stringify(courseJson);
        return fetch(COURSE_API_URL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: courseStr
        })
            .then(function (response) {
                return response.json();
            });
    }

    deleteCourse(courseId) {
        return fetch(COURSE_API_URL + '/' + courseId,
            {
                method: 'DELETE'
            })
            .then(function (response) {
                return response;
            })
    }

    findAllCourses() {
        return fetch(COURSE_API_URL, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        })
    }

    findCourseById(courseId) {
        return fetch(COURSE_API_URL + '/' + courseId, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            });
    }

    updateCourse(courseId, course) {
        var date = new Date();
        var courseJson = {
            title: course.title,
            modified: date.getTime()
        }
        var courseStr = JSON.stringify(courseJson);
        return fetch(COURSE_API_URL + '/' + courseId, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: courseStr
        })
            .then(function (response) {
                return response.json();
            });
    }
}

export default CourseServiceClient;