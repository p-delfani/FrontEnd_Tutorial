import React, { useState } from "react";
import CourseHoc from "../HOCs/CourseHoc";

function Reactjs({ title, increasePrice, price }) {
  return (
    <div>
      <h3>Course Title: {title}</h3>
      <button onClick={increasePrice}>
        Increase Course Price (Price = {price})
      </button>
    </div>
  );
}

export default CourseHoc(Reactjs, 'React Js', 2_200_000);
