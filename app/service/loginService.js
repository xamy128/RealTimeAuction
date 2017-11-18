import {socketio} from '../javascript/socket.io.js';
//import io = require('socket.io-client');


submitFacebook1: (event) => {
    alert('Service calling');
    let socket = socketio.connect();
    socket.on('news', (data) => {
        alert(data.hello);
    });
};

export default {
    methods: {
        submitFacebook: (event) => {
            submitFacebook1(event);
            
        }
    }
};