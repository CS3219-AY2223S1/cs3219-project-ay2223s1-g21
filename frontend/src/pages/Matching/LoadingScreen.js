import { PageContainer } from "./MatchingElements";
import "./loading.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoadingScreen() {
  const [string, setString] = useState("LOADING");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      if (string.length === 11) {
        setString("LOADING");
      } else {
        setString((prev) => prev + ".");
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [string]);
  

  return (
    <PageContainer>
      <div class="bounce">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span class="loadingdescription"> {string} </span>
      <div class="cancel" onClick={() => navigate("/home")}> Cancel </div>
    </PageContainer>
  );
}
