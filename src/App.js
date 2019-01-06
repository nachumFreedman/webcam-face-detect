import React, { Component } from 'react';
import Camera from './Camera';

//const domain = 'https://facedetec.herokuapp.com';
const domain = 'http://localhost:3000';

class App extends Component {
  state = {
    posts: [],
    isFaceAttempts: 0,
    faces: [],
    isFace: true,
    waiting: false,
  }

  
  checkFace = () => (this.state.faces.length ? null :
                     setTimeout(()=>{this.sendFace() &&
                                     this.setState({isFaceAttemps: this.state.isFaceAttempts + 1})},1000)
  )

  sendFace = () => this.setState({isFace: false})

  setImg = img => {
    this.setState({waiting: true});
    console.log(img)
    const imgFile = this.dataURLtoFile(img, 'image.jpg');  
    console.log(imgFile)
    const formData  = new FormData();    
    formData.append('file', imgFile);
    fetch(domain+'/upload', {
      method: 'POST',
      body: formData
    }).then((response) => response.json()
    ).then((faces)=>this.setState({faces, waiting: 'success'}) && console.log(faces));     
  }
  

  dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }

  
  
  render() {
    return (
      <div className="App">
        <Camera onImg={this.setImg} isFace={this.state.isFace} waiting={this.state.waiting}/>
      </div>
    );
  }
}

export default App;
