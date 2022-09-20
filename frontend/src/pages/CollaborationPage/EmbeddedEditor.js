import "ace-builds/src-noconflict/ace";
// import mode-<language> , this imports the style and colors for the selected language.
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
// there are many themes to import, I liked monokai.
import "ace-builds/src-noconflict/theme-monokai";
// this is an optional import just improved the interaction.
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify";
import AceEditor from "react-ace";
import { useState } from "react";
import { Bar, EditorContainer, BarItem } from "./EmbeddedElements";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

export default function EmbeddedEditor() {
  const [code, setCode] = useState(`console.log("Hello World!");`);
  const [anchorEl, setAnchorEl] = useState(null);
  const [curMode, setCurMode] = useState("javascript")
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (lang) => {
    setAnchorEl(null);
    setCurMode(lang);
  };

  return (
    <EditorContainer>
      <Bar>
        <BarItem onClick={handleClick}> {curMode} </BarItem>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose("javascript")}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={() => handleClose("javascript")}>javascript</MenuItem>
          <MenuItem onClick={() => handleClose("java")}>java</MenuItem>
          <MenuItem onClick={() => handleClose("python")}>python</MenuItem>
        </Menu>
      </Bar>
      <AceEditor
        style={{
          height: "90%",
          width: "100%",
          margin: "0px",
        }}
        placeholder="Start Coding"
        mode={curMode}
        theme="monokai"
        name="basic-code-editor"
        onChange={(currentCode) => setCode(currentCode)}
        fontSize={12}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={code}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </EditorContainer>
  );
}
