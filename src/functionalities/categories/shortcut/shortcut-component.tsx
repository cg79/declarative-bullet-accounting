import React, { useEffect } from "react";
import { SHORTCUT_ACTIONS } from "../constants";
import { useBetween } from "use-between";
import useCategoryState from "../hooks/useCategoryState";
import observer from "../../../_store/observer";

const ShortcutComponent = ({ onShortCutAction, children }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log(event.key);
      switch (event.key) {
        case "n":
          event.preventDefault();
          onShortCutAction(SHORTCUT_ACTIONS.ADD_NODE);
          break;
        case "a":
          event.preventDefault();
          handleAddTransaction();
          break;
        case "i":
          event.preventDefault();
          handleIcon();
          break;
        case "e":
          event.preventDefault();
          handleEdit();
          break;
        case "d":
          event.preventDefault();
          handleDelete();
          break;
        case "Backspace":
          event.preventDefault();
          handleDelete();
          break;
        case "ArrowUp":
          event.preventDefault();
          handleArrowUp();
          break;
        case "ArrowDown":
          event.preventDefault();
          handleArrowDown();
          break;
        case "ArrowLeft":
          event.preventDefault();
          handleArrowLeft();
          break;
        case "ArrowRight":
          event.preventDefault();
          handleArrowRight();
          break;
        default:
          break;
      }
    };

    observer.subscribe("ENABLE_SHORTCUT", () => {
      // debugger;
      document.addEventListener("keydown", handleKeyDown);
    });
    observer.subscribe("DISABLE_SHORTCUT", () => {
      // debugger;
      document.removeEventListener("keydown", handleKeyDown);
    });

    // Add event listener for keydown events
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleAddTransaction = () => {
    // alert("Icon shortcut triggered!");
    onShortCutAction(SHORTCUT_ACTIONS.ADD_TRANSACTION);
    // Add your icon functionality here
  };

  const handleIcon = () => {
    // alert("Icon shortcut triggered!");
    onShortCutAction(SHORTCUT_ACTIONS.ICON);
    // Add your icon functionality here
  };
  const handleEdit = () => {
    // alert("Edit shortcut triggered!");
    onShortCutAction(SHORTCUT_ACTIONS.EDIT);
    // Add your edit functionality here
  };

  const handleDelete = () => {
    // alert("Delete shortcut triggered!");
    onShortCutAction(SHORTCUT_ACTIONS.DELETE);
    // Add your delete functionality here
  };

  const handleArrowDown = () => {
    // alert("Delete shortcut triggered!");
    onShortCutAction(SHORTCUT_ACTIONS.ARROW_DOWN);
    // Add your delete functionality here
  };
  const handleArrowUp = () => {
    // alert("Delete shortcut triggered!");
    onShortCutAction(SHORTCUT_ACTIONS.ARROW_UP);
    // Add your delete functionality here
  };
  const handleArrowLeft = () => {
    // alert("Delete shortcut triggered!");
    onShortCutAction(SHORTCUT_ACTIONS.ARROW_LEFT);
    // Add your delete functionality here
  };

  const handleArrowRight = () => {
    // alert("Delete shortcut triggered!");
    onShortCutAction(SHORTCUT_ACTIONS.ARROW_RIGHT);
    // Add your delete functionality here
  };

  return <>{children}</>;
};

export default ShortcutComponent;
