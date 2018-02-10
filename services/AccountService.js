import { serverURL } from '../env';

export const registerUser = (accountInfo) => {
    console.log(accountInfo)
    const { username, email, password, firstName, lastName } = accountInfo;
    var uri = `${serverURL}/registerAccount`;
    console.log('re')
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