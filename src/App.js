import logo from "./logo.svg";
import "./App.css";
import { useDropzone } from "react-dropzone";
import {useState} from 'react';

function App() {

  const [labels, setLabels] = useState([]);
  
  const onDrop = async (Files) => {
    var data = new FormData();
    data.append("file", Files[0]);
    console.log(Files);

    const p = await fetch("/hello", {
      method: "POST",
      body: data,
    });
    console.log(p);
    const json = await p.json();
    setLabels(json)
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ backgroundColor: "white", width: "320px" }}>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>Drop an image to view probabities</div>
        <div style={{ flex: 1 }}></div>
      </div>
      <div style={{ backgroundColor: "#ffefd1", flex: 1 }}>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          DROP HERE FOR MAGIC!
        </div>
        <div>{labels.map((t) => <h2> this is a {t.className} <br/> probability = {t.probability} </h2>)}</div>
      </div>
    </div>
  );
}

export default App;
