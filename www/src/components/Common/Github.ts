import axios from 'axios';
const config = require('../../../config.json');

const client_id = config.client_id;
const client_secret = config.client_secret;

const OAUTH_URL = 'https://github.com/login/oauth';
const API_URL = 'https://api.github.com';

export const AUTH_URL = `${OAUTH_URL}/authorize?scope=repo&client_id=${client_id}`;

const ACCESS_URL = `${OAUTH_URL}/access_token?client_id=${client_id}&client_secret=${client_secret}`;

export const getAccessToken = async (code: string) =>
    (await axios.post('https://gh-oauth.imsun.net', { // CORS proxy
        code: code,
        client_id: client_id,
        client_secret: client_secret
    })).data['access_token'];

export const getRepoContent = (accessToken: string, owner: string, repo: string) => ({
    getContent: async (path: string) =>
        (await axios.get(`${API_URL}/repos/${owner}/${repo}/contents/${path}?access_token=${accessToken}`, { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' } })).data,
    createFile: async (path: string, message: string, contentBase64: string) =>
        (await axios.put(`${API_URL}/repos/${owner}/${repo}/contents/${path}?access_token=${accessToken}`, {
            message: message,
            content: contentBase64
        })).data,
    updateFile: async (path: string, message: string, contentBase64: string, sha: string) =>
        (await axios.put(`${API_URL}/repos/${owner}/${repo}/contents/${path}?access_token=${accessToken}`, {
            message: message,
            content: contentBase64,
            sha: sha
        })).data,
    deleteFile: async (path: string, message: string, sha: string) =>
        (await axios.put(`${API_URL}/repos/${owner}/${repo}/contents/${path}?access_token=${accessToken}`, {
            message: message,
            sha: sha
        })).data,
    search: async (query: string) =>
        (await axios.get(`${API_URL}/search/code?access_token=${accessToken}&q=${query}+in:file+language:markdown+repo:${owner}/${repo}+path:articles`, { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' } })).data,
})
