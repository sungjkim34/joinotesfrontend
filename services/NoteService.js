import { serverURL } from '../env';

export const getAllNotes = () => {
    var uri = `${serverURL}/getAllNotes`;
    return fetch(uri).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const getClassNotes = (classId) => {
    var uri = `${serverURL}/getClassNotes/${classId}`;
    return fetch(uri).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const getNoteDetail = (noteId) => {
    var uri = `${serverURL}/getNoteDetail/${noteId}`;
    return fetch(uri).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

export const addNote = (note) => {
    const { title, accountId, classId, detail } = note;
    const uri = `${serverURL}/addNote`
    return fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            title, accountId, classId, detail
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

export const deleteNote = (noteId) => {
    const uri = `${serverURL}/deleteNote`
    return fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            noteId
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