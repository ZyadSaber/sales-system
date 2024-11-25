import { useCallback, useState } from "react";

const useVisibleState = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleOpen = useCallback(() => {
    setVisible(true);
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  return {
    visible,
    handleOpen,
    handleClose,
  };
};

export default useVisibleState;
