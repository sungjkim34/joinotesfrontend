import { serverURL } from '../env';

export const registerUser = (accountInfo) => {
    console.log(accountInfo)
    const { username, email, password, firstName, lastName } = accountInfo;
    var uri = `${serverURL}/registerAccount`;
    return fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            username,
            password,
            email,
            firstName,
            lastName
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

export const checkUsername = (username) => {
    var uri = `${serverURL}/checkUsername/${username}`;
        return fetch(uri).then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
}

export const deleteAccount = (accountId) => {
    var uri = `${serverURL}/deleteAccount`;
    return fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            accountId
        }), 
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then((response) => response.json())
        .then((responseJson) => console.log(responseJson))
        .catch((error) => {
            console.error(error);
        });   
}

export const getEnrollmentCount = (accountId) => {
    var uri = `${serverURL}/getEnrollmentCount/${accountId}`;
        return fetch(uri).then((response) => response.json())
            .then((responseJson) => {
                return responseJson[0]['COUNT(*)'];
            })
            .catch((error) => {
                console.error(error);
            });
}

export const getNoteCount = (accountId) => {
    var uri = `${serverURL}/getNoteCount/${accountId}`;
        return fetch(uri).then((response) => response.json())
            .then((responseJson) => {
                return responseJson[0]['COUNT(*)'];
            })
            .catch((error) => {
                console.error(error);
            });
}

export const getAccountCount = (accountId) => {
    var uri = `${serverURL}/getAccountCount`;
        return fetch(uri).then((response) => response.json())
            .then((responseJson) => {
                return responseJson[0]['COUNT(*)'];
            })
            .catch((error) => {
                console.error(error);
            });
}

export const toggleShowEnroll = (accountId) => {
    var uri = `${serverURL}/toggleShowEnroll/${accountId}`;
        return fetch(uri).then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
}