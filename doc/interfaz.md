# Interfaz

Output

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| index | Integer | False | output number |

Turns ouput on

Turns ouput off

Applies brake

Inverts direction

Sets direction

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| dir | Integer | False | direction: 0, 1 |

Sets pwm power

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| pow | Integer | False | power: 0 to 255 |

Stepper

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| index | Integer | False | motor number |

Moves the motor the amount of steps

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| value | Integer | False | steps |
| callback | Function | False | callback function |

Stops the motor

Changes motor speed

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| value | Integer | False | speed in steps per second |

Servo

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| index | Integer | False | motor number |

Sets position

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| value | Integer | False | servo position: 0 to 180 |

Analog

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| index | Integer | False | analog number |

Turns reporting on

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| callback | Function | False | callback function |

Turns reporting off

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| callback | Function | False | callback function |

Digital

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| index | Integer | False | digital number |

Turns reporting on

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| callback | Function | False | callback function |

Turns reporting off

Enable or disable pullup

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| enable | Boolean | False | Enables or disables. |

I2C

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| address | Integer | False | device address |

Turns reporting on

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| register | Integer | False | register to read |
| bytes | Integer | False | amount of bytes to read |
| callback | Function | False | callback function |

Turns reporting off

Reads register once

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| register | Integer | False | register to read |
| bytes | Integer | False | amount of bytes to read |
| callback | Function | False | callback function |

Writes data into register

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| register | Integer | False | register to read |
| data | Array of bytes | False | data to write |

Device object to connect to device class

#### This

Device

| Name | Type | Desciption |
| ---- | ---- | ---------- |
| device | String | Name of class. |
| options | Object | Options to pass as parameters of class 
 example: light = new Device('Light', { controller: "BH1750"}); led = new Device('Led', { pin: 13}); |

Create event listener

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| event | String | False | Event to listen |
| attributes | Object | False | Attributes to receive from device |
| callback | myCallback | False | Callback to execute on data received 
 example: gps.on("change", ["latitude","longitude"] , function(d) { console.log(d) }); |

Call method on device

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| method | String | False | method to run with parenthesis and parameters 
 example: led.call('on(10)'); |