// Import stylesheets
import './style.css';
import { Ros } from 'roslib'
import Amphion from 'amphion'

const ur_description = "https://raw.githubusercontent.com/fmauch/universal_robot/kinetic-devel/ur_description"
const franka_description = "https://raw.githubusercontent.com/frankaemika/franka_ros/kinetic-devel/franka_description"

const ur_packages = {robot_description: ur_description}

const franka_packages = {franka_description: franka_description}

function loadRobot(viewer){
  const robotModel = new Amphion.RobotModel(ros, 'robot_description',{packages:franka_packages})
  robotModel.load()
  viewer.addVisualization(robotModel)
}

function loadTf(ros, viewer){
  const path = new Amphion.Path(ros, '/tf');
  path.subscribe();
  path.updateOptions({
    color: 0xff0000,
  });
  viewer.addVisualization(path);
}

const url = 'ws://localhost:9090'

const ros = new Ros();

//const scene = new Amphion.Scene();
//const viewer = new Amphion.Viewer3d();
const viewer = new Amphion.TfViewer(ros);

//const viewer = new Amphion.TfViewer(ros);
viewer.setContainer(document.getElementById('scene3d'));
ros.connect(url)
loadTf(ros, viewer)
//loadRobot(viewer)