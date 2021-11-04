import { useState } from "react";

export const usePageStatus = () => {
  const [status, setStatus] = useState("initial");

  const isInitial = status === "initial";
  const isHidding = status === "isHidding";
  const isAdding = status === "isAdding";

  const handleChangeStatusToInitial = () => setStatus("initial");
  const handleChangeStatusToIsHidding = () => setStatus("isHidding");
  const handleChangeStatusToIsAdding = () => setStatus("isAdding");

  return {
    status,
    isInitial,
    isHidding,
    isAdding,
    handleChangeStatusToInitial,
    handleChangeStatusToIsHidding,
    handleChangeStatusToIsAdding,
  };
};
