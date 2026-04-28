import React, { useState } from "react";

function withToggle(OriginalComponent) {
  const NewComponent = () => {
    const [isShow, setIsShow] = useState(false);

    const toggleHandler = () => {
      console.log("Toggle Handler");
      setIsShow((prevIsShow) => !prevIsShow);
    };

    return <OriginalComponent isShow={isShow} toggleHandler={toggleHandler} />;
  };

  return NewComponent;
}

export default withToggle;
