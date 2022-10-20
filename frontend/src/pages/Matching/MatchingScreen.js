import { PageContainer } from "./MatchingElements";
import "./matching.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MatchingScreen({matchTimer}) {
  const { roomId } = useSelector(state => state.matchingReducer);
  const [string, setString] = useState("Matching");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      if (string.length === 11) {
        setString("Matching");
      } else {
        setString((prev) => prev + ".");
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [string]);


  return (
    <PageContainer>
      <div class="e-loadholder">
        <div class="m-loader">
          <span class="e-text"> {matchTimer > 0 && matchTimer} </span>
        </div>
      </div>
      <span class="description"> {roomId ? "Match Found!" : matchTimer > 0 ? string : "No Match"} </span>
      {!matchTimer && <span class="okay" onClick={() => navigate("/home")}> Go Back Home </span>}
    </PageContainer>
  );
}
