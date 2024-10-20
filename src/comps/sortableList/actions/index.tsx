import { FaEdit, FaSave, FaTimes, FaTrashAlt } from "react-icons/fa";
interface IActionsProps {
  isEditing: boolean;
  handleEditToggle: () => void;
  handleDelete: () => void;
  handleSave: () => void;
  handleDiscard: () => void;
}
export default function Actions(props: IActionsProps) {
  const {
    isEditing,
    handleEditToggle,
    handleDelete,
    handleSave,
    handleDiscard,
  } = props;
  return isEditing ? (
    <>
      <FaSave onClick={handleSave} />
      <FaTimes onClick={handleDiscard} />
    </>
  ) : (
    <>
      <FaEdit onClick={handleEditToggle} />
      <FaTrashAlt onClick={handleDelete} />
    </>
  );
}
