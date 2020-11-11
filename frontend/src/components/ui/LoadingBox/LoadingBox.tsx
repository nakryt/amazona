import React from "react";
import classes from "./LoadingBox.module.css";

type Props = {
  style?: object;
};

export default function LoadingBox({ style }: Props) {
  return (
    <div className="loading" style={style}>
      <div className={classes.ldsRing}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
