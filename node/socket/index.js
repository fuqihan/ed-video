var returnSocket = function (io) {
    io.on('connection', function (socket) {
        console.log('socket');
        socket.on('news', function (id, data) {
            // socket.emit('newa', { hello: 'world' });
            io.to(id).emit('newa', 'my lovely babies');
            // console.log(io.sockets.sockets)
        });
        // io.local.emit('loginOff', 'my lovely babies');
        // socket.broadcast.emit('newa', { hello: 'world' });
        // socket.socket().emit('newa', { hello: 'world' });
        //     socket.on('notifyNum', function (data) {
        //         console.log('socket');
        //     });
        socket.on('disconnect', function () {
            console.log('disconnect')
        })
    });
}

module.exports = returnSocket;