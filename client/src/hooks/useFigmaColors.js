import { useState, useEffect } from "react";

import axios from "axios";

import { REACT_APP_API_VERSION } from "../constants";

const useFigmaColors = () => {
  const [figmaColors, setFigmaColors] = useState(null);

  const onSuccess = ({ data = [] }) => {
    setFigmaColors(data);
  };

  useEffect(() => {
    axios.get(`/api/${REACT_APP_API_VERSION}/colors`).then(onSuccess);
  }, []);

  return figmaColors;
};

export default useFigmaColors;
