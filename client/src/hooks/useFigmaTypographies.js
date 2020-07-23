import { useState, useEffect } from "react";

import axios from "axios";

import { REACT_APP_API_VERSION } from "../constants";

const useFigmaTypographies = () => {
  const [figmaTypographies, setFigmaTypographies] = useState(null);

  const onSuccess = ({ data = [] }) => {
    setFigmaTypographies(data);
  };

  useEffect(() => {
    axios.get(`/api/${REACT_APP_API_VERSION}/typographies`).then(onSuccess);
  }, []);

  return figmaTypographies;
};

export default useFigmaTypographies;
