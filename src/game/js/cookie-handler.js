/*
    Module import(s)
*/
import * as data from './data';

function parseCurrentCookies() {

    let cookies = document.cookie;
    let cookiesArray = cookies.split(';');

    for (let i = 0; i < cookiesArray.length; i++) {

        let cookie = cookiesArray[i];
        cookie = cookie.trim();

        let cookieArray = cookie.split('=');

        data.cookies[cookieArray[0]] = cookieArray[1];
    };
};

function addCookie(name, value) {

    // need to add: secure;
    document.cookie = `${name}=${value}; expires=Tue, 19 Jan 2038 03:14:07 UTC; samesite=strict;`;
};

/*
    Module export(s)
*/
export {
    parseCurrentCookies,
    addCookie
}