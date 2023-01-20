import { useState, useRef, CSSProperties, useEffect } from "react";
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";
import { Editor } from "./Editor";

const editorStyle: CSSProperties = {
  width: "100%",
  border: "2px solid teal",
};

const iframeStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  border: "2px solid grey",
  outline: 0,
};

const cardStyle: CSSProperties = {
  margin: "20px",
};

function getCodeFromUrl() {
  return new URLSearchParams(window.location.search).get("code");
}

function updateUrlForEncoded(encoded: string) {
  window.history.replaceState({ urlUpdated: true }, "", `?code=${encoded}`);
}

function App() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const editorRef = useRef<any>();

  const showPreviewForEncoded = (encoded: string) => {
    iframeRef.current!.src = `preview.html?code=${encoded}`;
  };

  useEffect(() => {
    const codeEncoded = getCodeFromUrl();
    if (codeEncoded) {
      showPreviewForEncoded(codeEncoded);
      const decoded = decompressFromEncodedURIComponent(codeEncoded);
      editorRef.current.setValue(decoded);
    }
  }, []);

  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <span className="tag">app.py</span>
          <Editor
            style={editorStyle}
            ref={editorRef}
            height="calc( 100vh - 250px)"
            minHeight="200px"
          />

          <button
            className="button primary"
            onClick={() => {
              const value = editorRef.current?.getValues();
              const compressed = compressToEncodedURIComponent(value);
              showPreviewForEncoded(compressed);
              updateUrlForEncoded(compressed);
            }}
          >
            Run <img src="https://icongr.am/feather/play.svg?size=12&color=ffffff" />
          </button>
        </div>
        <div className="col">
          <span className="tag">Preview</span>
          <iframe ref={iframeRef} style={iframeStyle}></iframe>
        </div>
      </div>
    </div>
  );
}

export default App;
