import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function RichEditor({ setContent, content }) {
  return <ReactQuill value={content} onChange={setContent} />;
}

export default RichEditor;
