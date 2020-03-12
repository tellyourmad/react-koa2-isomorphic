import React from "react";
import CoverDiv from "../../components/uiComp/CoverDiv";
import RespRect from "../../components/uiComp/RespRect";

export default function Loading() {
  return (
    <CoverDiv
      style={{
        position: "absolute",
        zIndex: 99,
        left: 0,
        top: 0,
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        WebkitJustifyContent: "center",
        alignItems: "center",
        WebkitAlignItems: "center",
        backgroundColor: "#f8f8f8"
      }}
    >
      <RespRect id="LoadingAnimate" />
    </CoverDiv>
  );
}
