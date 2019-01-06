import React, { Component } from 'react';
import Webcam from "react-webcam";


const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};


class Camera extends Component {
  checkFace = () => {
    if(!this.props.isFace){
      this.capture();
    }
  }

  sendImg = () => {
   // checkFace
  }

  setRef = webcam => {
    this.webcam = webcam;
    console.log(webcam);
    setTimeout(()=>this.capture(),2000)
  };
  
  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    console.log(imageSrc);
    this.props.onImg( imageSrc );
  };

  render() {
    return (
      <div>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
          videoConstraints={videoConstraints}
        />
        <button onClick={this.capture}>
          {
            (this.props.waiting) ?
            'LOADING GIF' : (!this.props.waiting) ?
            'START' : (this.props.waiting === 'success') ?  'CONTINUE'
            : null 
          }
        </button>        
      </div>
    );
  }
}

export default Camera;
