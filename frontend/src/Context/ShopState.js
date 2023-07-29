import React, { useState } from "react";
import shopContext from "./shopContext";

const ShopState = (props) => {
  const [loginState, setLoginState] = useState(false);

  return (
    <shopContext.Provider value={{ loginState, setLoginState }}>
      {props.children}
    </shopContext.Provider>
  );
};

export default ShopState;
