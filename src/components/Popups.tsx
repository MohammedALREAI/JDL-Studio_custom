import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import  download from  'downloadjs'

export const WarningPopup = ({ open, className = "" }) => (
  <Popup open={open} modal closeOnDocumentClick={true} className={className}>
    {(close) => (
      <div className={`${className} modal`}>
        <div className="header">Warning!</div>
        <div className="content">
          <p>
            You are using an experimental beta version of JDL Studio. Please use
            the stable version at{" "}
            <a href="https://start.jhipster.tech/jdl-studio/">
              https://start.jhipster.tech/jdl-studio/
            </a>{" "}
            for more features and persistent storage
          </p>
        </div>
        <div className="actions">
          <button className="button" onClick={close}>
            It's OK
          </button>
        </div>
      </div>
    )}
  </Popup>
);

export const ResetPopup = ({ open, closeModal, discard, className = "" }) => {
  const ok = () => {
    closeModal();
    discard();
  };
  return (
    <Popup
      open={open}
      modal
      closeOnDocumentClick={false}
      onClose={closeModal}
      className={className}
    >
      <div className={`${className} modal`}>
        <div className="header">Discard</div>
        <div className="content">
          <p>
            Do you want to discard current diagram and load the sample? This
            will overwrite local storage as well
          </p>
        </div>
        <div className="actions">
          <button className="button" onClick={ok}>
            Yes
          </button>
          <button className="button" onClick={closeModal}>
            No
          </button>
        </div>
      </div>
    </Popup>
  );
};

export const SavePopup = ({ open, closeModal, saveJDL, className = "" }) => {
  const [name, setName] = useState("");

  const setFileName = (evt) => {
    setName(evt.target.value);
  };

  const saveJDLFile = async(evt) => {
    closeModal();
      saveJDL(name);

  };

  return (
    <Popup
      open={open}
      modal
      closeOnDocumentClick={false}
      onClose={closeModal}
      className={className}
    >
      <div className={`${className} modal`}>
        <div className="header">Save a new JDL Model</div>
        <div className="content">
          <p>Please give a name to your new JDL Model</p>
          <input
            className="upload"
            placeholder="JDL name"
            type="input"
            id="jdlName"
            value={name}
            onChange={setFileName}
          />
        </div>
        <div className="actions">
          <button className="button" onClick={saveJDLFile}>
            Save
          </button>
          <button className="button" onClick={closeModal}>
            Dismiss
          </button>
        </div>
      </div>
    </Popup>
  );
};

export const UploadPopup = ({ open, closeModal, setCode, className = "" ,evt}) => {
  
  const [file, setFiles] = useState(null);

  const setJDlFile = (evt) => {
    setFiles(evt.target.files[0]);
  };



  const handleWithEvent=(e)=>{

closeModal();
importJDL(file, setCode,evt);

      
    }
  
  return (
    <Popup
      open={open}
      modal
      closeOnDocumentClick={false}
      onClose={closeModal}
      className={className}
    >
      <div className={`${className} modal`}>
        <div className="header">Import JDL</div>
        <div className="content">
          <p>
            Select a <code>.jh</code> or <code>.jdl</code> file
          </p>
          <input
            className="upload"
            accept=".jh,.jdl"
            type="file"
            id="jdlFileInput"
            onChange={setJDlFile}
          />
        </div>
        <div className="actions">
          <button className="button"   onClick={handleWithEvent}>
            Import
          </button>
          <button className="button" onClick={closeModal}>
            Dismiss
          </button>
        </div>
      </div>
    </Popup>
  );
};

function importJDL(f, setCurrentText,evt) {
  
  if (!f) {
    alert("Failed to load file");
  } else if (
    !f.type.match("text.*") &&
    !(f.name.endsWith(".jh") || f.name.endsWith(".jdl"))
  ) {
    alert(f.name + " is not a valid JDL or text file.");
  } else {
    var r = new FileReader();
    r.onload = function (e) {
      if (e && e.target) {
        var contents = e.target.result as string;
        console.log(
          `Got the file name: ${f.name} type: ${f.type} size: ${f.size} bytes`
        );
        setCurrentText(contents);
      
      }
    };
    
    
    
   
    r.onloadend=function(e){
      const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
      var url = canvasElement.toDataURL("image/png");
      
   
  
  
      download(url, "dlDataUrlText.png", "image/png");
  
  
      ga("send", "event", "JDL Image", "download", "JDL Image download");
      ga("jdlTracker.send", "event", "JDL Image", "download", "JDL Image download");
    }
    r.readAsText(f);



  }
  ga("send", "event", "JDL File", "upload", "JDL File upload");
  ga("jdlTracker.send", "event", "JDL File", "upload", "JDL File upload");
}
