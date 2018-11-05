# Interfaz

Class Output

```js
undefined(index);
```

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| index | Integer | False | output number |

On(): Turns ouput on

Off(): Turns ouput off

Brake(): Applies brake

Inverse(): Inverts direction

Direction(): Sets direction

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| dir | Integer | False | direction: 0, 1 |

Power(): Sets pwm power

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| pow | Integer | False | power: 0 to 255 |

class Stepper

```js
undefined(index);
```

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| index | Integer | False | motor number |

Steps(): Moves the motor the amount of steps

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| value | Integer | False | steps |
| callback | Function | False | callback function |

Stop(): Stops the motor

Speed(): Changes motor speed

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| value | Integer | False | speed in steps per second |

class Servo

```js
undefined(index);
```

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| index | Integer | False | motor number |

Position(): Sets position

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| value | Integer | False | servo position: 0 to 180 |

class Analog

```js
undefined(index);
```

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| index | Integer | False | analog number |

On(): Turns reporting on

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| callback | Function | False | callback function |

Off(): Turns reporting off

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| callback | Function | False | callback function |

class Digital

```js
undefined(index);
```

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| index | Integer | False | digital number |

On(): Turns reporting on

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| callback | Function | False | callback function |

Off(): Turns reporting off

Pullup(): Enable or disable pullup

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| enable | Boolean | False | Enables or disables. |

class I2C

```js
undefined(address);
```

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| address | Integer | False | device address |

On(): Turns reporting on

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| register | Integer | False | register to read |
| bytes | Integer | False | amount of bytes to read |
| callback | Function | False | callback function |

Off(): Turns reporting off 
 off(register) { socket.emit('I2C', { address: this.address, register: register, method: 'off' }); }

Read(): Reads register once

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| register | Integer | False | register to read |
| bytes | Integer | False | amount of bytes to read |
| callback | Function | False | callback function |

Write(): Writes data into register

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| register | Integer | False | register to read |
| data | Array of bytes | False | data to write |

Device object to connect to device class class Device

#### This

| Name | Type | Desciption |
| ---- | ---- | ---------- |
| device | String | Name of class. |
| options | Object | Options to pass as parameters of class 
 example: light = new Device('Light', { controller: "BH1750"}); led = new Device('Led', { pin: 13}); |

On(): Create event listener

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| event | String | False | Event to listen |
| attributes | Object | False | Attributes to receive from device |
| callback | myCallback | False | Callback to execute on data received 
 example: gps.on("change", ["latitude","longitude"] , function(d) { console.log(d) }); |

Call(): Call method on device

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| method | String | False | method to run with parenthesis and parameters 
 example: led.call('on(10)'); |