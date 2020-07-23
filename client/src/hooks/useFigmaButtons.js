import { useState, useEffect } from "react";

import axios from "axios";

import { REACT_APP_API_VERSION } from "../constants";

const useFigmaButtons = () => {
  const [figmaButtons, setFigmaButtons] = useState(null);

  const onSuccess = ({ data = [] }) => {
    setFigmaButtons(data);
  };

  useEffect(() => {
    axios.get(`/api/${REACT_APP_API_VERSION}/buttons`).then(onSuccess);
  }, []);

  return figmaButtons;
};

export default useFigmaButtons;
