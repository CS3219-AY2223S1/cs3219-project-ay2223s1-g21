import { Bar, BarText } from "./QuestionSectionElements";
import { FaKeyboard } from "react-icons/fa";
import { TbFileText } from "react-icons/tb";
import Description from "../Description";
import Result from "../Result/index.js";
import { useDispatch, useSelector } from "react-redux";
import { setTab } from "../../../redux/actions/collab";

export default function QuestionSection() {
  
  const { selectedTab } = useSelector(state => state.collabReducer)
  const dispatch = useDispatch();

  return (
    <>
      <Bar>
        <BarText
          curSelected={selectedTab}
          text="Description"
          onClick={() => dispatch(setTab("Description"))}
        >
          <FaKeyboard style={{ marginRight: "5px" }} />
          Description
        </BarText>
        <BarText
          curSelected={selectedTab}
          text="Result"
          onClick={() => dispatch(setTab("Result"))}
        >
          <TbFileText style={{ marginRight: "5px" }} />
          Result
        </BarText>
      </Bar>
      {selectedTab === "Description" && <Description />}
      {selectedTab === "Result" && <Result />}
    </>
  );
}
