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
import { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import {
  Bar,
  EditorContainer,
  BarItem,
  RunCodeButton,
} from "./EmbeddedElements";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
// import { question } from "../Description/Data";
import { useDispatch, useSelector } from "react-redux";
import {
  requestCompilation,
  getCompilationResult,
} from "../../../services/compile_service";
import {
  setCodeExecutionResult,
  setIsCodeRunning,
  setTab,
} from "../../../redux/actions/collab";
import { setMode } from "../../../redux/actions/collab";
import { useSyncedStore } from "@syncedstore/react";
import { store } from "../store";

export default function EmbeddedEditor({ editorRef }) {
  const { roomId } = useSelector((state) => state.matchingReducer);
  const { curMode } = useSelector((state) => state.collabReducer);

  const [curTheme, setCurTheme] = useState("tomorrow_night");
  const [anchorElLang, setAnchorElLang] = useState(null);
  const [anchorElTheme, setAnchorElTheme] = useState(null);

  const openLang = Boolean(anchorElLang);
  const openTheme = Boolean(anchorElTheme);
  const dispatch = useDispatch();
  const { isCodeRunning } = useSelector((state) => state.collabReducer);

  const handleLangSelect = (event) => {
    setAnchorElLang(event.currentTarget);
  };
  const handleCloseLang = (lang) => {
    setAnchorElLang(null);
    dispatch(setMode(lang));
  };

  const handleThemeSelect = (event) => {
    setAnchorElTheme(event.currentTarget);
  };

  const handleCloseTheme = (theme) => {
    setAnchorElTheme(null);
    setCurTheme(theme);
  };

  const submitCompileRequest = async (curMode, curCode) => {
    if (!isCodeRunning) {
      dispatch(setTab("Result"));
      dispatch(setIsCodeRunning(true));
      requestCompilation(curMode.toUpperCase(), curCode)
        .then((res) => {
          getCompilationResult(res.data.resultUrl)
            .then((res) => {
              dispatch(setCodeExecutionResult(res.data));
              dispatch(setIsCodeRunning(false));
            })
            .catch((err) => {
              dispatch(setCodeExecutionResult(err.response.data.message));
              dispatch(setIsCodeRunning(false));
            });
        })
        .catch((err) => {
          dispatch(setCodeExecutionResult(err.response.data.message));
          dispatch(setIsCodeRunning(false));
        });
    }
  };

  const state = useSyncedStore(store);

  useEffect(() => {
    state.collab["code-" + roomId] = `console.log("Hello World!");`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EditorContainer ref={editorRef}>
      <Bar>
        <Tooltip title="Click or press Ctrl + Enter to run your code.">
          <RunCodeButton onClick={() => submitCompileRequest(curMode,  state.collab["code-" + roomId])}>
            Run Code
          </RunCodeButton>
        </Tooltip>
        <Tooltip title="Select a programming language.">
          <BarItem onClick={handleLangSelect}> {curMode} </BarItem>
        </Tooltip>
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
        <Tooltip title="Select a theme.">
          <BarItem onClick={handleThemeSelect}>
            {" "}
            {processTheme(curTheme)}{" "}
          </BarItem>
        </Tooltip>
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
        onChange={(currentCode) => {
          state.collab["code-" + roomId] = currentCode;
        }}
        fontSize={15}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={state.collab["code-" + roomId]}
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
