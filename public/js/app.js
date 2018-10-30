'use strict'
var socket = io.connect('http://localhost:4268');

const LOW = 0;
const HIGH = 1;
const PIN_INPUT = 0;
const PIN_OUTPUT = 1;
const PIN_ANALOG = 2;
const PIN_PWM = 3;
const PIN_SERVO = 4;

/**
 * Board object to connect to Johnny five board class
 * @this Board
 *
 *
 * example:
 *      b = new Board(); 
 */  
class Board {
  
  constructor() { 
    var me = this;
    this.analogData = new Array();
    this.digitalData = new Array();
    this.i2cData = new Array();
    this.digitalCallback = new Array();
    this.analogCallback = new Array();
    this.i2cCallback = new Array();

    socket.on('ANALOG_MESSAGE', function (data) {
      me.analogData[data.pin] = data.value;
        me.analogCallback[data.pin](data);
    })
    socket.on('DIGITAL_MESSAGE', function (data) {
      me.digitalData[data.pin] = data.value;
        me.digtalCallback[data.pin](data);
     })
    socket.on('I2C_READ', function (data) {
      if (typeof me.i2cData[data.address] == "undefined") {
        me.i2cData[data.address] = new Array();  
      }
      me.i2cData[data.address][data.register] = data.value;
      me.i2cCallback[data.address][data.register](data);
    })
  }

  /**
 * Sets mode to pin
 *
 * @param pin {Integer} pin number
 * @param value {Integer} pin Mode
 * 
 */  
  pinMode (pin, value) {
    socket.emit('PINMODE_MESSAGE', { pin: pin, value: value });
  }

  /**
 * Writes to digital pin
 *
 * @param pin {Integer} pin number
 * @param value {Integer} pin value: LOW or HIGH
 * 
 */  
  digitalWrite (pin, value) {
    socket.emit('DIGITAL_MESSAGE', { pin: pin, value: value });
  }

  /**
 * Writes to pwm  pin
 *
 * @param pin {Integer} pin number
 * @param value {Integer} pwm value: 0 to 255
 * 
 */    
  analogWrite (pin, value) {
    socket.emit('ANALOG_MESSAGE', { pin: pin, value: value });
  }

  /**
 * Position servo by angle
 *
 * @param pin {Integer} servo pin number
 * @param value {Integer} angle value: 0 to 180
 * 
 */    
  servoWrite (pin, value) {
    socket.emit('SERVO_WRITE', { pin: pin, value: value });
  }
  
  /**
   * Starts analog reporting on pin
   *
   * @param pin {Integer} pin number
   * @param callback {myCallback} function to execute on data received
   * 
   */    
  analogRead (pin, callback) {
    socket.emit('REPORT_ANALOG', { pin: pin });
    this.analogCallback[pin] = function () { };
    if(typeof callback == "function")
    this.analogCallback[pin] = callback;
  }
  
  /**
 * Starts digital reporting on pin
 *
 * @param pin {Integer} pin number
 * @param callback {myCallback} function to execute on data received
 * 
 */    
  digitalRead(pin, callback) {
    socket.emit('REPORT_DIGITAL', { pin: pin });
    this.digitalCallback[pin] = function () { };
    if(typeof callback == "function")
    this.digitalCallback[pin] = callback;
  }

  /**
 * Initialize and configure I2C device
 *
 * @param address {Integer} device address
 * @param delay {Integer} delay in microseconds bewteen write and read. Default 50 microseconds
 * 
 */  
i2cConfig (address, delay) {
  socket.emit('I2C_CONFIG', { address: address, delay: delay });
}

/**
 * Starts i2c reporting on device
 *
 * @param address {Integer} device address
 * @param register {Integer} register to read
 * @param bytes {Integer} amount of bytes to retreive
 * @param callback {myCallback} function to execute on data received
 * 
 */     
  i2cRead (address, register, bytes, callback) {
    socket.emit('I2C_READ', { address: address, register: register, bytes: bytes });
    if (typeof this.i2cCallback[address] == "undefined") {
      this.i2cCallback[address] = new Array();
    }
    this.i2cCallback[address][register] = function () { };
    if(typeof callback == "function") 
      this.i2cCallback[address][register] = callback;
  }

/**
 * Reads i2c register on device once
 *
 * @param address {Integer} device address
 * @param register {Integer} register to read
 * @param bytes {Integer} amount of bytes to retreive
 * @param callback {myCallback} function to execute on data received
 * 
 */     
  i2cReadOnce (address, register, bytes, callback) {
    socket.emit('I2C_READ_ONCE', { address: address, register: register, bytes: bytes });
    if (typeof this.i2cCallback[address] == "undefined") {
      this.i2cCallback[address] = new Array();
    }
    this.i2cCallback[address][register] = function () { };
    if(typeof callback == "function") 
      this.i2cCallback[address][register] = callback;
  }

  /**
 * Writes data on device 
 *
 * @param address {Integer} device address
 * @param register {Integer} register to read
 * @param arrayOfBytes {Array} Bytes to write on register
 * 
 */     
  i2cWrite (address, register, arrayOfBytes) {
    socket.emit('I2C_WRITE', { address: address, register: register, arrayOfBytes: arrayOfBytes });
  }
  
}

/**
 * Five object to connect to device class
 * @this Five
 *
 * @this .device {String} Name of class.
 * @this .options {Object} Options to pass as parameters of class
 *
 * example:
 *      light = new Five('Light', { controller: "BH1750"}); 
 *      led = new Five('Led', { pin: 13});
 */  
class Five {
    constructor(device, options) { 
    this.device = device;
    this.options = options;
    this.id = false;
    let me = this;
    socket.emit('NEW_FIVE', {  device: device, options: options}, function (result) {
      me.id = result;
    });
  }

/**
 * Create event listener
 *
 * @param event {String} Event to listen
 * @param attributes {Object} Attributes to receive from device
 * @param callback {myCallback} Callback to execute on data received
 * 
 * example:
 *  gps.on("change", ["latitude","longitude"] , function(d) { console.log(d) });
 */  
  on(event, attributes, callback) {
      socket.emit('FIVE_EVENT', { id: this.id, event: event, attributes: attributes}, function (result) {
        console.log(result);
    });
    let me = this;
      if(typeof callback == "function")
        socket.on(event + this.id, function (data) {
            callback(data);
        })
  }

/**
 * Call method on device
 *
 * @param method {String} method to run with parenthesis and parameters
 * 
 * example:
 *    led.call('on(10)');
 */  
  call(method) {
    socket.emit('CALL_METHOD', { id: this.id, method: method }, function (result) { 
      console.log(result);
    })
  }

  }



