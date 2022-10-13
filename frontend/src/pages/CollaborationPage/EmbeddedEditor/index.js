import "ace-builds/src-noconflict/ace";
// import mode-<language> , this imports the style and colors for the selected language.
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
// themes
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-terminal";
// this is an optional import just improved the interaction.
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify";
import AceEditor from "react-ace";
import { useState } from "react";
import { Bar, EditorContainer, BarItem } from "./EmbeddedElements";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
// import { question } from "../Description/Data";
import { useSelector } from "react-redux";

export default function EmbeddedEditor({ editorRef }) {
  const { question } = useSelector((state) => state.collabReducer);
  const [code, setCode] = useState(`console.log("Hello World!");`);
  const [curTheme, setCurTheme] = useState("tomorrow_night");
  const [anchorElLang, setAnchorElLang] = useState(null);
  const [anchorElTheme, setAnchorElTheme] = useState(null);
  const [curMode, setCurMode] = useState("javascript");
  const openLang = Boolean(anchorElLang);
  const openTheme = Boolean(anchorElTheme);
  const handleLangSelect = (event) => {
    setAnchorElLang(event.currentTarget);
  };
  const handleCloseLang = (lang) => {
    setAnchorElLang(null);
    setCurMode(lang);
    if (question[lang]) {
      setCode(question[lang]);
    }
  };

  const handleThemeSelect = (event) => {
    setAnchorElTheme(event.currentTarget);
  };
  const handleCloseTheme = (theme) => {
    setAnchorElTheme(null);
    setCurTheme(theme);
  };

  return (
    <EditorContainer ref={editorRef}>
      <Bar>
        <BarItem onClick={handleLangSelect}> {curMode} </BarItem>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorElLang}
          open={openLang}
          onClose={() => handleCloseLang(curMode)}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={() => handleCloseLang("javascript")}>
            javascript
          </MenuItem>
          <MenuItem onClick={() => handleCloseLang("java")}>java</MenuItem>
          <MenuItem onClick={() => handleCloseLang("python")}>python</MenuItem>
        </Menu>
        <BarItem onClick={handleThemeSelect}>
          {" "}
          {processTheme(curTheme)}{" "}
        </BarItem>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorElTheme}
          open={openTheme}
          onClose={() => handleCloseTheme(curTheme)}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={() => handleCloseTheme("twilight")}>
            twilight
          </MenuItem>
          <MenuItem onClick={() => handleCloseTheme("monokai")}>
            monokai
          </MenuItem>
          <MenuItem onClick={() => handleCloseTheme("tomorrow_night")}>
            tomorrow
          </MenuItem>
          <MenuItem onClick={() => handleCloseTheme("solarized_dark")}>
            solarized
          </MenuItem>
          <MenuItem onClick={() => handleCloseTheme("terminal")}>
            terminal
          </MenuItem>
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
        theme={curTheme}
        name="basic-code-editor"
        onChange={(currentCode) => setCode(currentCode)}
        fontSize={15}
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

function processTheme(theme) {
  if (theme === "solarized_dark") {
    return "solarized";
  } else if (theme === "tomorrow_night") {
    return "tomorrow";
  }
  return theme;
}
