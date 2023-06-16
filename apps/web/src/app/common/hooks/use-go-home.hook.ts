import { useNavigate } from "react-router-dom";

import { Path } from '../../constants';

export const useGoHome = () => {
  const navigate = useNavigate();

  return () => navigate(Path.Root);
};
