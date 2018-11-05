var app = require('http').createServer(handler)
var io = require('socket.io').listen(app, { origins: '*:*' });
var fs = require('fs');
var five = require('johnny-five');
const { VM } = require('vm2');

/* WEB SERVER */
app.listen(4268);

function handler(req, res) {
    fs.readFile(__dirname + '/public' +  req.url,
        function (err, data) {
            if (err) {
                res.writeHead(404);
                return res.end('Not found');
            }
            res.writeHead(200);
            res.end(data);
        });
    }
    
    /* JOHNNY-FIVE GATEWAY */
    board = new five.Board();
    
board.on("ready", function () {

});
    
    io.sockets.on('connection', function (socket) {
            let instances = new Array();
    
            socket.on('PINMODE_MESSAGE', function (data) {
                board.pinMode(data.pin, data.value);
            });
    
            socket.on('DIGITAL_MESSAGE', function (data) {
                board.pinMode(data.pin, five.Pin.OUTPUT);
                board.digitalWrite(data.pin, data.value);
            });
    
            socket.on('ANALOG_MESSAGE', function (data) {
                board.pinMode(data.pin, five.Pin.PWM);
                board.analogWrite(data.pin, data.value);
            });
    
            socket.on('REPORT_ANALOG', function (data) {
                board.pinMode(data.pin, five.Pin.ANALOG);
                board.analogRead(data.pin, function (voltage) {
                    socket.emit('ANALOG_MESSAGE', { pin: data.pin, value: voltage });
                });
            });
    
            socket.on('REPORT_DIGITAL', function (data) {
                board.pinMode(data.pin, five.Pin.INPUT);
                board.digitalRead(data.pin, function (voltage) {
                    socket.emit('DIGITAL_MESSAGE', { pin: data.pin, value: voltage });
                });
            });
    
            socket.on('I2C_CONFIG', function (data) {
                if (typeof data.delay == "undefined") data.delay = 50;
                board.i2cConfig({ address: data.address, delay: data.delay } );
            });
    
            socket.on('I2C_READ', function (data) {
                board.i2cRead(data.address, data.register, data.bytes, function (result) {
                    socket.emit('I2C_READ', { address: data.address, register: data.register, value: result });
                });
            });
    
            socket.on('I2C_READ_ONCE', function (data) {
                board.i2cReadOnce(data.address, data.register, data.bytes, function (result) {
                    socket.emit('I2C_READ', { address: data.address, register: data.register, value: result });
                });
            });
    
            socket.on('I2C_WRITE', function (data) {
                board.i2cWrite(data.address, data.register, data.arrayOfBytes );
            });
    
            socket.on('SERVO_WRITE', function (data) {
                board.pinMode(data.pin, five.Pin.SERVO);
                board.servoWrite(data.pin, data.value );
            });

            socket.on('LED', function (data) {
                var led = new five.Led(data.pin);
            });
         
         
         socket.on('NEW_FIVE', function (data, fn) { 
                let vm = new VM({ sandbox: { instances: instances, data: data, five: five } });
                try {
                    let result = vm.run('new five.' + data.device + '(' + JSON.stringify(data.options) + ')');
                    instances[instances.length] = result
                }
                catch (error) { 
                    console.error(error);
                    fn(false);
                }
                fn(instances.length - 1);
         })
         
         socket.on('FIVE_EVENT', function (data, fn) {
             if (typeof instances[data.id] == "object") {
                 instances[data.id].on(data.event, function () {
                     results = {};
                     try {
                         data.attributes.forEach((reg) => {
                             results[reg] = this[reg];
                         })
                         socket.emit(data.event + data.id, { data: results });
                     } catch (error) {
                         console.log(error);
                         fn(false);
                     }
                 });
                 fn(true);
             } else {
                 fn(false);
             }
         })
    
            socket.on('CALL_METHOD', function (data, fn) { 
                let vm = new VM({ sandbox: { instances: instances, data: data } });
                try {
                    let result = vm.run('instances[' + data.id + '].' + data.method);
                }
                catch(error) {
                    console.error(error);
                    fn(false);
                }           
                fn(true);
         })
    
});
