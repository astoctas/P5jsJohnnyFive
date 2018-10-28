# P5jsJohnnyFive
Arduino Johnny Five gateway to P5.js or javascript development.

## Installation

- Copy all files on a directory and run: "npm install" to install modules and dependencies
- Install Processing and P5js Mode.

## Usage
- run: "npm start" to start johnny-five server on port 4268.

### as P5js mode
- Run Processing in p5 mode and start new sketch.
- In file index.html add these two lines above p5 libraries
```html
  <script language="javascript" type="text/javascript" src="http://localhost:4268/socket.io/socket.io.js"></script>
  <script language="javascript" type="text/javascript"  src="http://localhost:4268/js/app.js"></script>
```
- Run sketch.

### as standalone mode
- If you has html and javascript skills you can edit your own files in any code editor.  
- Save files into /public dir and run them from browser on: http://localhost:4268/you-file.html

### App.js
- This file has two classes to communicate with Jonny-five
#### Board
- This is the board instance of Johnny-Five

#### Five
- This class can be used to use any of the Johnny-five classes of devices,ej: Led, Light, Temperature.

#### Exammple:
```c++
var light = new Five('Light',{controller: 'BH1750'});
var led = new Five('Led',{pin: 13});

function setup() {
  light.on("change", ["lux"], function(d){console.log(d)});
  led.call('pulse()');
}

function draw() {
}
```

Documentation of these classes is in [/doc/app.md](https://github.com/astoctas/P5jsJohnnyFive/blob/master/doc/app.md)




