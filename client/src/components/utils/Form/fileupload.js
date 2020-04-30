import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import axios from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';

class Fileupload extends Component {
  constructor() {
    super();
    this.state = {
      uploadedFiles: [],
      uploading: false
    };
  }

  onDrop = files => {
    this.setState({ uploading: true });
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" }
    };
    formData.append("file", files[0]);

    axios.post('/api/users/uploadimage', formData, config).then(response => {
      console.log(response.data);

      this.setState(
        {
          uploading: false,
          uploadedFiles: [...this.state.uploadedFiles, response.data]
        },
        () => {
          this.props.imagesHandler(this.state.uploadedFiles);
        }
      );
    });
  };






  onRemove = id => {
    axios.get(`/api/users/removeimage?public_id=${id}`).then(response => {
      let images = this.state.uploadedFiles.filter(item => {
        return item.public_id !== id;
      });

      this.setState(
        {
          uploadedFiles: images
        },
        () => {
          this.props.imagesHandler(images);
        }
      );
    });
  };

  showUploadedImages = () => (
    this.state.uploadedFiles.map(item => (
      <div
        className="dropzone_box"
        key={item.public_id}
        onClick={() => this.onRemove(item.public_id)}
      >
        <div
          className="wrap"
          style={{ background: `url(${item.url}) no-repeat` }}
        ></div>
      </div>
    ))
  )

  static getDerivedStateFromProps(props,state){
      if(props.reset){
        return state = {
            uploadedFiles:[]
        }
      }
      return null;
  }

  render() {
    return (
      <Dropzone onDrop={e => this.onDrop(e)}>
        {({ getRootProps, getInputProps }) => (
          <section className="container">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            {/* <aside>
                  <h4>Files</h4>
                  <ul>{files}</ul>
                </aside> */}

            {this.showUploadedImages()}
            {this.state.uploading ? (
              <div
                className="dropzone_box"
                style={{
                  textAlign: "center",
                  paddingTop: "60px"
                }}
              >
                <CircularProgress style={{ color: "#00bcd4" }} thickness={7} />
              </div>
            ) : null}
          </section>
        )}
      </Dropzone>
    );
  }
}



export default Fileupload;