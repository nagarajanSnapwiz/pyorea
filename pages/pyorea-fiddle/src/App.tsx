import { useState, useRef, CSSProperties } from 'react'
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import { Editor } from './Editor';

const editorStyle: CSSProperties = {
  width: 700,
  maxWidth: "calc(100vw - 300px)",
  border: "2px solid teal"
}


function App() {

  const editorRef = useRef<any>();

  return (
    <div className="App">
     <h1>App</h1>

     <Editor style={editorStyle} ref={editorRef}  height="calc( 100vh - 250px)" minHeight="200px" />

     <button onClick={ ()=> {
      const v = editorRef.current?.getValues();
      console.log('original value',v);
      console.log("compressed v -======>");
      console.log(compressToEncodedURIComponent(v))
     } }>Code Log</button>
    </div>
  )
}

export default App
