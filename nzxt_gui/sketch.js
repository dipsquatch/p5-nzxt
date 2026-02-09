let cpuTemp = 0;

// Fallback for when you're NOT inside NZXT CAM
const nzxt = window.nzxt ?? {
  v1: {
    width: 800,
    height: 600,
    targetFps: 60,
    onMonitoringDataUpdate: () => {}
  }
};

// Only attach the real callback if CAM is present
if (window.nzxt) {
  window.nzxt.v1.onMonitoringDataUpdate = (data) => {
    cpuTemp = data.cpus[0].temperature;
  };
}

function setup() {
  createCanvas(nzxt.v1.width, nzxt.v1.height);
  frameRate(nzxt.v1.targetFps);
  console.log("NZXT object:", window.nzxt);
}

function draw() {
  background(0);
  fill(255);
  textSize(32);
  text(`CPU Temp: ${cpuTemp}`, 20, 50);
  text(`NZXT: ${window.nzxt}`,20,80);
}