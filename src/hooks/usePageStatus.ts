import { useState } from "react";

export const usePageStatus = () => {
  const [status, setStatus] = useState("initial");

  const isInitial = status === "initial";
  const isHidding = status === "isHidding";
  const isAdding = status === "isAdding";
  const isEditting = status === "isEditting";

  const handleChangeStatusToInitial = () => setStatus("initial");
  const handleChangeStatusToIsHidding = () => setStatus("isHidding");
  const handleChangeStatusToIsAdding = () => setStatus("isAdding");
  const handleChangeStatusToIsEditting = () => setStatus("isEditting");

  return {
    status,
    isInitial,
    isHidding,
    isAdding,
    isEditting,
    handleChangeStatusToInitial,
    handleChangeStatusToIsHidding,
    handleChangeStatusToIsAdding,
    handleChangeStatusToIsEditting,
  };
};
