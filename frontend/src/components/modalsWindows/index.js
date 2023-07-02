import Add from "./Add.jsx";
import Rename from "./Rename.jsx";
import Remove from "./Remove.jsx";

const modals = {
  adding: Add,
  renaming: Rename,
  removing: Remove,
};

const getModalComponent = (modalType) => {
  if (modalType === null) {
    return null;
  }

  const ModalComponent = modals[modalType];
  return <ModalComponent />;
};

export default getModalComponent;
