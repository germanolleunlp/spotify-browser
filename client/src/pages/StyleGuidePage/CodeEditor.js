import React from "react";
import PropTypes from "prop-types";
import Editor from "react-simple-code-editor";

import { highlight, languages } from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/themes/prism.css";

const CodeEditor = ({ code }) => (
  <Editor
    value={code}
    highlight={(code) => highlight(code, languages.jsx)}
    style={{
      fontFamily: '"Fira code", "Fira Mono", monospace',
      fontSize: 12,
    }}
  />
);

CodeEditor.propTypes = {
  code: PropTypes.string,
};

export default CodeEditor;
