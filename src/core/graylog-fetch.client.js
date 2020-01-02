import fetch from 'node-fetch';
import bluebird from 'bluebird';
import {GRAYLOG_TOKEN} from '../app.constant';

fetch.Promise = bluebird;

export default fetch;

export function getHttpJson(url) {
    return fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: GRAYLOG_TOKEN
        },
        timeout: 0
    })
        .then(res => {
            return res.json();
        })
        .catch(err => {
            throw err;
        });
}
