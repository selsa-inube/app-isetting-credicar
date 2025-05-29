import { useState } from "react";

const useDetailsCycle = () => {
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => setShowModal(!showModal);
  return { showModal, handleToggleModal, handleCloseModal };
};

export { useDetailsCycle };
