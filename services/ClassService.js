import { serverURL } from '../env';

export const registerAccount = (account) => {
    const uri = `${serverURL}/registerAccount`
    return fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            account
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