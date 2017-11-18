
let loginController = new Vue({
    el: '#loginController',
    methods: {
        submitFacebook: (event) => {
             
             let socket = io.connect('http://localhost');
             alert('Client pe AAya');
             socket.on('news', function (data) {
                console.log(data);
                socket.emit('test', { my: 'data' });
              });

              socket.emit('test', {my: 'Client se bheja hai'});              
            //  alert('Service calling');
            //  let socket = socketio.connect();
            //  socket.on('news', (data) => {
            //      alert(data.hello);
            //  });
        },
        submitGoogle: () => {
            console.log('Submit Google');
        }
    }
});
//loginController.submitFacebook();

