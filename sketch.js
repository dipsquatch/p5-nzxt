let cpuTemp = 0;

// Poll for CAM injection
const waitForNzxt = setInterval(() => {
  if (window.nzxt && window.nzxt.v1) {
    console.log("NZXT API detected");
    window.nzxt.v1.onMonitoringDataUpdate = (data) => {
      cpuTemp = data.cpus?.[0]?.temperature ?? 0;
    };
    clearInterval(waitForNzxt);
  }
}, 100);

function setup() {
  const width = window.nzxt?.v1?.width ?? 800;
  const height = window.nzxt?.v1?.height ?? 600;
  const fps = window.nzxt?.v1?.targetFps ?? 60;

  createCanvas(width, height);
  frameRate(fps);
}

function draw() {
  background(0);
  fill(255);
  textSize(32);

  text(`CPU Temp: ${cpuTemp}`, 20, 50);
  text(`NZXT: ${!!window.nzxt}`, 20, 90);
}
