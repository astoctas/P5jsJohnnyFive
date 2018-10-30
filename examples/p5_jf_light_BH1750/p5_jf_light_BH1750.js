var light = new Five('Light',{controller: 'BH1750'});

function setup() {
 
  var ta = select('textarea');
  light.on("change", ["lux"], function(data) { 
    console.log(data) 
    ta.elt.value += Math.floor(millis()) + 'ms - ' + data.data.lux + 'lx\n';
  });
}

function draw() {
  
}
