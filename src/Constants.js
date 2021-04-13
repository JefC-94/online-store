import axios from 'axios';

// AUTHORIZATION FOR API.PHP -> WITH .HTACCESS AND .HTPASSWORD FILE -> THIS WORKS, BUT NOT ON LOCALHOST

// DON'T FORGET TO CHANGE PRODUCTION DETAILS!!

const usernamePasswordBuffer = Buffer.from('chatsterapi:babblewasbeter');
const base64data = usernamePasswordBuffer.toString('base64');

const axiosProd = axios.create({
    baseURL: 'https://chatster.be/server/api/api.php/records',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${base64data}`,
    }
});

const axiosDev = axios.create({
    baseURL: 'http://localhost:8080/online-store/server/api/api.php/records'
});

export const axiosObject = process.env.NODE_ENV === 'development' ? axiosDev : axiosProd;

//IMG PATH ON LOCALHOST AND PRODUCTION ENV

export const imgPath = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/online-store/server' : 'https://chatster.be/server';

//https://github.com/Flynsarmy/PHPWebSocket-Chat