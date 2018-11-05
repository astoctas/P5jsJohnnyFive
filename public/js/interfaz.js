'use strict'
var socket = io.connect('http://localhost:4268');

const LOW = 0;
const HIGH = 1;

var OUTPUT = class {
    /**
   * Output
   *
   * @param index {Integer} output number
   * 
   */
    constructor(index) {
      this.index = index;
    }
    /**
   * Turns ouput on
   *
   */
    on() {
      socket.emit('OUTPUT', { index: this.index, method: 'on' });
    }
    /**
   * Turns ouput off
   *
   */
    off() {
      socket.emit('OUTPUT', { index: this.index, method: 'off' });
    }
    /**
   * Applies brake
   *
   */
    brake() {
      socket.emit('OUTPUT', { index: this.index, method: 'brake' });
    }
    /**
   * Inverts direction
   *
   */
    inverse() {
      socket.emit('OUTPUT', { index: this.index, method: 'inverse' }); 
    }
    /**
   * Sets direction
   *
   * @param dir {Integer} direction: 0, 1
   * 
   */
    direction(dir) {
      socket.emit('OUTPUT', { index: this.index, method: 'direction', param: dir });
    }
    /**
   * Sets pwm power
   *
   * @param pow {Integer} power: 0 to 255
   * 
   */
    power(pow) {
      socket.emit('OUTPUT', { index: this.index, method: 'power', param: pow });
    }
  };


 var STEPPER = class {
    /**
   * Stepper
   *
   * @param index {Integer} motor number
   * 
   */
    constructor(index) {
      this.index = index;
      this.callback = function () { };
      var me = this;
      socket.on('STEPPER_MESSAGE', function (data) {
        if(data.index == me.index)
          me.callback(data);
      });
    }
    /**
   * Moves the motor the amount of steps
   *
   * @param value {Integer}steps
   * @param callback {Function} callback function
   */
    steps(value, callback) {
      socket.emit('STEPPER', { index: this.index, method: 'steps', param: value });
      if (typeof callback == "function")
        this.callback = callback;
  }
  /**
 * Stops the motor 
 *
 */
  stop() {
    socket.emit('STEPPER', { index: this.index, method: 'stop' });
  }
  /**
 * Changes motor speed
 *
 * @param value {Integer} speed in steps per second
 * 
 */
  speed(value) {
    socket.emit('STEPPER', { index: this.index, method: 'speed', param: value });
  }
}

var   SERVO = class {
    /**
   * Servo
   *
   * @param index {Integer} motor number
   * 
   */
    constructor(index) {
      this.index = index;
    }
    /**
   * Sets position
   *
   * @param value {Integer}servo position: 0 to 180
   * 
   */
    position(value) {
      socket.emit('SERVO', { index: this.index, method: 'position', param: value });
    }
  }

 var  ANALOG = class {
    /**
   * Analog
   *
   * @param index {Integer} analog number
   * 
   */
    constructor(index) {
      this.index = index;
      this.callback = function () { };
      var me = this;
      socket.on('ANALOG_MESSAGE', function (data) {
        if(data.index == me.index)
          me.callback(data);
      });      
    }
    /**
   * Turns reporting on
   *
   * @param callback {Function} callback function
   */    
    on(callback) {
      socket.emit('ANALOG', { index: this.index, method: 'on' });
      if (typeof callback == "function")
      this.callback = callback;
    }
    /**
   * Turns reporting off
   *
   * @param callback {Function} callback function
   */       
    off() { 
      socket.emit('ANALOG', { index: this.index, method: 'off' });
    }
  }

var  DIGITAL = class {
    /**
   * Digital
   *
   * @param index {Integer} digital number
   * 
   */
    constructor(index) {
      this.index = index;
      this.callback = function () { };
      var me = this;
      socket.on('DIGITAL_MESSAGE', function (data) {
        if(data.index == me.index)
          me.callback(data);
      });      
    }
    /**
   * Turns reporting on
   *
   * @param callback {Function} callback function
   */    
    on(callback) {
      socket.emit('DIGITAL', { index: this.index, method: 'on' });
      if (typeof callback == "function")
      this.callback = callback;
    }
    /**
   * Turns reporting off
   *
   */       
    off() { 
      socket.emit('DIGITAL', { index: this.index, method: 'off' });
    }
    /**
   * Enable or disable pullup
   *
   * @param enable {Boolean} Enables or disables.
   */       
    pullup(enable) { 
      socket.emit('DIGITAL', { index: this.index, method: 'pullup', param: enable });
    }
  }

  var I2C = class {
    /**
   * I2C
   *
   * @param address {Integer} device address
   * 
   */
    constructor(address) {
      this.address = address;
      this.callback = function () { };
      var me = this;
      socket.on('I2C_MESSAGE', function (data) {
        if (data.address == me.address)
          me.callback(data);
      });
    }
    /**
   * Turns reporting on
   *
   * @param register {Integer} register to read
   * @param bytes {Integer} amount of bytes to read
   * @param callback {Function} callback function
   */    
    on(register, bytes, callback) {
      socket.emit('I2C', { address: this.address, register: register, method: 'on', param: bytes });
      if (typeof callback == "function")
      this.callback = callback;
    }
    /**
   * Turns reporting off
   *
   */           
    off(register) { 
      socket.emit('I2C', { address: this.address, register: register, method: 'off' });
    }
      /**
     * Reads register once
     *
     * @param register {Integer} register to read
     * @param bytes {Integer} amount of bytes to read
     * @param callback {Function} callback function
     */    
    read(register, bytes, callback) { 
      socket.emit('I2C', { address: this.address, register: register, method: 'read', param: bytes });
      if (typeof callback == "function")
      this.callback = callback;
    }  
    /**
   * Writes data into register
   *
   * @param register {Integer} register to read
   * @param data {Array of bytes} data to write
   */    
    write(register, data) { 
      socket.emit('I2C', { address: this.address, register: register, method: 'write', param: data });
    }    
  }

/**
 * Device object to connect to device class
 * @this Device
 *
 * @this .device {String} Name of class.
 * @this .options {Object} Options to pass as parameters of class
 *
 * example:
 *      light = new Device('Light', { controller: "BH1750"}); 
 *      led = new Device('Led', { pin: 13});
 */  
class Device {
    constructor(device, options) { 
    this.device = device;
    this.options = options;
    this.id = false;
    let me = this;
    socket.emit('DEVICE', {  device: device, options: options}, function (result) {
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
      socket.emit('DEVICE_EVENT', { id: this.id, event: event, attributes: attributes}, function (result) {
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
    socket.emit('DEVICE_CALL', { id: this.id, method: method }, function (result) { 
      console.log(result);
    })
  }

  }
