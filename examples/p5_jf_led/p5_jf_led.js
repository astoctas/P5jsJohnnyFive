var b = new Five('Led', {pin:13});

function setup() {
  createElement('h1', 'Led');
  createButton('On').mousePressed(function(){b.call('on()')});  
  createButton('Off').mousePressed(function(){b.call('off()')});  
  createButton('Pulse').mousePressed(function(){b.call('pulse()')});  
  createButton('Stop').mousePressed(function(){b.call('stop()')});  
}

function draw() {
  
}
