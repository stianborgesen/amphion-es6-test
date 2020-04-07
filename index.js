// Import stylesheets
import './style.css';
import { Ros } from 'roslib'
import Amphion from 'amphion'

function loadRobot(viewer){
  const robotModel = new Amphion.RobotModel(
    ros, 'robot_description',
    {
      packages:{
        robot_description:"https://raw.githubusercontent.com/fmauch/universal_robot/kinetic-devel/ur_description"
      }
    }
  )
  robotModel.load()
  viewer.addVisualization(robotModel)
}

function loadTf(viewer){
  const path = new Amphion.Path(ros, '/path_rosbag');
  path.subscribe();
  path.updateOptions({
    color: 0xff0000,
  });
  viewer.addVisualization(path);
}

const url = 'ws://localhost:9090'

const ros = new Ros();

//const scene = new Amphion.Scene();
const viewer = new Amphion.Viewer3d();
const viewer = new Amphion.TfViewer(ros);

//const viewer = new Amphion.TfViewer(ros);
viewer.setContainer(document.getElementById('scene3d'));
ros.connect(url)

function load(){

}

loadRobot(viewer)