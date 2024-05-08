import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useRef } from "react";
export const MonacoEditor = ({
  language = "javascript",
  value = "",
  onChange,
}) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

  return (
    <div>
      <Editor
        height="90vh"
        width="100%"
        defaultLanguage="javascript"
        defaultValue={value}
        value={value}
        language={language}
        // theme="vs-dark"
        // options={{ minimap: { enabled: false } }}
        onChange={(value) => onChange(value || "")}
        options={{
          minimap: { enabled: false },
        }}
        onMount={(editor, monaco) => {
          editorRef.current = editor;

          // monaco.languages.typescript.typescriptDefaults.addExtraLib(content, filename)

          monaco.languages.typescript.javascriptDefaults.addExtraLib(
            " declare var blub: any;"
          );

          monaco.languages.typescript.javascriptDefaults.addExtraLib(
            ` 
            declare class BulletFile {
                guid: string;
                
            }
            // export default BulletFile;
            `
          );
        }}
      />
      ;
    </div>
  );
};
