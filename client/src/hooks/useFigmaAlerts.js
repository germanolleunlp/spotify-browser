import { useState, useEffect } from "react";

import axios from "axios";

import { REACT_APP_API_VERSION } from "../constants";

const useFigmaAlerts = () => {
  const [figmaAlerts, setFigmaAlerts] = useState(null);

  const onSuccess = ({ data = [] }) => {
    setFigmaAlerts(data);
  };

  useEffect(() => {
    axios.get(`/api/${REACT_APP_API_VERSION}/alerts`).then(onSuccess);
  }, []);

  return figmaAlerts;
};

export default useFigmaAlerts;
