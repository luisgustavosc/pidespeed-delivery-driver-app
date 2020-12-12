import { HttpHeaders } from '@angular/common/http';
const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    authorization: `${localStorage.getItem('ACCESS_TOKEN')}`
});
const options = { headers };
const AUTH_SERVER = 'http://localhost:5000/api';
// const AUTH_SERVER = 'https://server.pidespeed.com/api';
const IMAGE_SERVER = 'https://storage.googleapis.com/pidespeed-storage';

export { options, AUTH_SERVER, IMAGE_SERVER };
