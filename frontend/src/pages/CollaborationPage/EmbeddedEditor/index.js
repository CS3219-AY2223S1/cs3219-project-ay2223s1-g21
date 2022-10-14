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
import React, { useState } from "react";
import { Bar, EditorContainer, BarItem } from "./EmbeddedElements";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Question } from "./Data";
import sharedb from "sharedb/lib/client";
import io from "socket.io-client";

export default function EmbeddedEditor({ editorRef }) {
  const [doc, setDoc] = useState(null);
  const [ioSocket, setIoSocket] = useState(null);
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
    setCode(Question[lang]);
  };

  const handleThemeSelect = (event) => {
    setAnchorElTheme(event.currentTarget);
  };
  const handleCloseTheme = (theme) => {
    setAnchorElTheme(null);
    setCurTheme(theme);
  };

  const updateTextEditor = (text, event) => {
    // console.log(text, event);
    // doc.submitOp([{ p: ["counter"], na: 1 }]);
    if (ioSocket) {
      ioSocket.emit("sendTextUpdate", { text: text, roomId: "12345" });
    }
  };

  React.useEffect(() => {
    // const ws = new WebSocket("ws://localhost:3005");
    // ws.addEventListener("open", () => {
    //   console.log("Connected With Server");
    // });
    // const connection = new sharedb.Connection(ws);
    // const doc = connection.get("documents", "12345");
    // // If doc.type is undefined, the document has not been created, so let's create it
    // if (!doc.type) {
    //   doc.create({ counter: 0 }, (error) => {
    //     if (error) console.error(error);
    //   });
    // }
    // setDoc(doc);
    // doc.subscribe(() => {
    //   console.log("TEST", doc.data.counter);
    // });
    // doc.on("op", () => {
    //   console.log("Test", doc);
    //   setCode(doc.data);
    // });
    // doc.on("op", (op) => {
    //   console.log("count", doc.data.counter);
    // });
  }, []);

  // Socket io method
  React.useEffect(() => {
    const socket = io(`http://localhost:3005`);
    socket.on("connectionSuccess", () => {
      setIoSocket(socket);
    });

    return () => {
      console.log("Disconnect Socket");
      ioSocket.close();
    };
  }, []);

  React.useEffect(() => {
    if (ioSocket) {
      ioSocket.emit("joinRoom", "12345");

      ioSocket.on("joinSuccess", () => {
        console.log("Joined Room");
      });

      ioSocket.on("textUpdate", (text) => {
        console.log("Recieved Text Update");
        setCode(text);
      });
    }
  }, [ioSocket]);

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
          onClose={() => handleCloseLang("javascript")}
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
          onClose={() => handleCloseTheme("tomorrow_night")}
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
        onChange={updateTextEditor}
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
