import { useState } from "react";
import { MyButton } from "../../../_components/reuse/my-button";

const TreeCollapseExpand = ({ node, isCollapsed }) => {
  if (node.children && node.children.length === 0) {
    return (
      // <i className="text-2xl mb-3 text-color-secondary pi pi-arrow-circle">d</i>
      <span className="hidden">no.</span>
    );
  }
  if (isCollapsed) {
    return (
      <i className="text-2xl mb-3 text-color-secondary pi pi-arrow-circle-right"></i>
    );
  }
  return (
    <i className="text-2xl mb-3 text-color-secondary pi pi-arrow-circle-down"></i>
  );
};

export default TreeCollapseExpand;
