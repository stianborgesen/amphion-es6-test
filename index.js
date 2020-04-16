// Using Amphion v.0.1.14
// We also tried newer version of Amphion, supporting Typescript and more, but encountered other issues
import './style.css';
import { Ros } from 'roslib'
import Amphion from 'amphion'

const ur_description = "https://raw.githubusercontent.com/fmauch/universal_robot/kinetic-devel/ur_description"
const franka_description = "https://raw.githubusercontent.com/frankaemika/franka_ros/kinetic-devel/franka_description"

const ur_packages = {robot_description: ur_description}

const franka_packages = {franka_description: franka_description}
class Loader{
  constructor(url){
    this.url = url
    this.ros = new Ros()
    this.viewer = new Amphion.Viewer3d()
    this.viewer.setContainer(document.getElementById('scene3d'));
    this.ros.connect(this.url)
  }

  loadRobot(packages){
    const robotModel = new Amphion.RobotModel(this.ros, 'robot_description',{packages:packages})
    robotModel.load()
    this.viewer.addVisualization(robotModel)
  }

  loadTf(path){
    const path = new Amphion.Path(this.ros, path);
    path.subscribe();
    path.updateOptions({
      color: 0xff0000,
    });
    this.viewer.addVisualization(path);
  }
}
const url = 'ws://localhost:9090'
const loader = new Loader(url)
//loader.loadTf("/path_rosbag")
loader.loadRobot(franka_packages)