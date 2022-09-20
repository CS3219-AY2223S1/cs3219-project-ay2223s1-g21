import {
  Bar,
  BarText,
} from "./QuestionSectionElements";
import { useState } from "react";
import { FaKeyboard } from "react-icons/fa";
import { BiChat } from "react-icons/bi";
import Description from "./Description";
import Submissions from "./Submissions";

export default function QuestionSection() {
  const [selectedText, setSelectedText] = useState("Description");

  return (
    <>
      <Bar>
        <BarText
          curSelected={selectedText}
          text="Description"
          onClick={() => setSelectedText("Description")}
        >
          <FaKeyboard style={{marginRight: '5px'}}/>
          Description
        </BarText>
        <BarText
          curSelected={selectedText}
          text="Submissions"
          onClick={() => setSelectedText("Submissions")}
        >
          <BiChat style={{marginRight: '5px'}}/>
          Chat Box
        </BarText>
      </Bar>
      {selectedText === "Description" && <Description />}
      {selectedText === "Submissions" && <Submissions />}
    </>
  );
}
