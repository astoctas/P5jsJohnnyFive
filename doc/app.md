# App

Board object to connect to Johnny five board class

#### Board Class

Board example: b = new Board();

Sets mode to pin

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| pin | Integer | False | pin number |
| value | Integer | False | pin Mode |

Writes to digital pin

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| pin | Integer | False | pin number |
| value | Integer | False | pin value: LOW or HIGH |

Writes to pwm  pin

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| pin | Integer | False | pin number |
| value | Integer | False | pwm value: 0 to 255 |

Position servo by angle

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| pin | Integer | False | servo pin number |
| value | Integer | False | angle value: 0 to 180 |

Starts analog reporting on pin

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| pin | Integer | False | pin number |
| callback | Function | False | function to execute on data received |

Starts digital reporting on pin

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| pin | Integer | False | pin number |
| callback | Function | False | function to execute on data received |

Initialize and configure I2C device

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| address | Integer | False | device address |
| delay | Integer | False | delay in microseconds bewteen write and read. Default 50 microseconds |

Starts i2c reporting on device

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| address | Integer | False | device address |
| register | Integer | False | register to read |
| bytes | Integer | False | amount of bytes to retreive |
| callback | Function | False | function to execute on data received |

Reads i2c register on device once

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| address | Integer | False | device address |
| register | Integer | False | register to read |
| bytes | Integer | False | amount of bytes to retreive |
| callback | Function | False | function to execute on data received |

Writes data on device

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| address | Integer | False | device address |
| register | Integer | False | register to read |
| arrayOfBytes | Array | False | Bytes to write on register |

Five object to connect to device class

#### Five Class

Five

| Name | Type | Desciption |
| ---- | ---- | ---------- |
| device | String | Name of class. |
| options | Object | Options to pass as parameters of class 
 example: light = new Five('Light', { controller: "BH1750"}); led = new Five('Led', { pin: 13}); |

Create event listener

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| event | String | False | Event to listen |
| attributes | Object | False | Attributes to receive from device |
| callback | Function | False | Callback to execute on data received 
 example: gps.on("change", ["latitude","longitude"] , function(d) { console.log(d) }); |

Call method on device

#### Params

| Name | Type | Optional | Desciption |
| ---- | ---- | -------- | ---------- |
| method | String | False | method to run with parenthesis and parameters 
 example: led.call('on(10)'); |
