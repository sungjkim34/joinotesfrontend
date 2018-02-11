import { serverURL } from '../env';

export const getAllClasses = () => {
    var uri = `${serverURL}/getAllClasses`;
    return fetch(uri).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const getAllClassesDetailed = () => {
    var uri = `${serverURL}/getAllClassesDetailed`;
    return fetch(uri).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const getAccountEnrollment = (accountId) => {
    var uri = `${serverURL}/getAccountEnrollment/${accountId}`;
    return fetch(uri).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const getAccountEnrollmentDetailed = (accountId) => {
    var uri = `${serverURL}/getAccountEnrollmentDetailed/${accountId}`;
    return fetch(uri).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const enrollClass = (accountId, classId) => {
    const uri = `${serverURL}/enrollClass`
    return fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            accountId, classId
        }), 
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const dropClass = (enrollmentId) => {
    const uri = `${serverURL}/dropClass`
    return fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            enrollmentId
        }), 
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}