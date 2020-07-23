import { useState, useEffect } from "react";

import axios from "axios";

import { REACT_APP_API_VERSION } from "../constants";

const useFigmaBadges = () => {
  const [figmaBadges, setFigmaBadges] = useState(null);

  const onSuccess = ({ data = [] }) => {
    setFigmaBadges(data);
  };

  useEffect(() => {
    axios.get(`/api/${REACT_APP_API_VERSION}/badges`).then(onSuccess);
  }, []);

  return figmaBadges;
};

export default useFigmaBadges;
