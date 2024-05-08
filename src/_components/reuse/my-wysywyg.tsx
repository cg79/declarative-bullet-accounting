import { useState } from "react";
import Editor from "react-simple-wysiwyg";
export const WysYWYG = ({ html, setHtml }) => {
  const onChange = (e) => {
    setHtml(e.target.value);
  };

  return <Editor value={html} onChange={onChange} />;
};
