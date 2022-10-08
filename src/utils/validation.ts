import { handleAlertMessage } from "./auth";
import { MutableRefObject } from "react";

export const validationInputs = (
  titleInput: MutableRefObject<HTMLInputElement>,
  priceInput: MutableRefObject<HTMLInputElement>,
  descriptionInput: MutableRefObject<HTMLTextAreaElement>,
  yearInput: MutableRefObject<HTMLInputElement>,
  driveSelect: MutableRefObject<HTMLSelectElement>,
  transmissionSelect: MutableRefObject<HTMLSelectElement>,
  modificationInput: MutableRefObject<HTMLInputElement>,
  mileageInput: MutableRefObject<HTMLInputElement>,
  bodySelect: MutableRefObject<HTMLSelectElement>,
  statusSelect: MutableRefObject<HTMLSelectElement>
) => {
  const titleInputValue = titleInput.current.value;
  const priceInputValue = priceInput.current.value;
  const descriptionTextAreaValue = descriptionInput.current.value;
  const yearInputValue = yearInput.current.value;
  const driveSelectValue = driveSelect.current.value;
  const transmissionSelectValue = transmissionSelect.current.value;
  const modificationInputValue = modificationInput.current.value;
  const mileageInputValue = mileageInput.current.value;
  const bodySelectValue = bodySelect.current.value;
  const statusSelectValue = statusSelect.current.value;

  const inputs = [
    titleInput.current,
    priceInput.current,
    descriptionInput.current,
    yearInput.current,
    driveSelect.current,
    transmissionSelect.current,
    modificationInput.current,
    mileageInput.current,
    bodySelect.current,
    statusSelect.current,
  ];

  const addDangerBorderByCondition = () =>
    inputs.forEach((input) =>
      input.value.length
        ? input.classList.remove("border-danger")
        : input.classList.add("border-danger")
    );

  const checkInputValue = (): Boolean => {
    return (
      !titleInputValue ||
      !priceInputValue ||
      !descriptionTextAreaValue ||
      !yearInputValue ||
      !driveSelectValue ||
      !transmissionSelectValue ||
      !modificationInputValue ||
      !mileageInputValue ||
      !bodySelectValue ||
      !statusSelectValue
    );
  };

  if (checkInputValue()) {
    handleAlertMessage({
      alertText: "Заполните все поля!",
      alertStatus: "warning",
    });
    addDangerBorderByCondition();
    return false;
  }

  if (isNaN(+priceInputValue)) {
    handleAlertMessage({ alertText: "Введите число", alertStatus: "warning" });
    addDangerBorderByCondition();

    priceInput.current.classList.add("border-danger");
    return false;
  }

  titleInput.current.value = "";
  priceInput.current.value = "";
  descriptionInput.current.value = "";
  yearInput.current.value = "";
  driveSelect.current.value = "";
  transmissionSelect.current.value = "";
  modificationInput.current.value = "";
  mileageInput.current.value = "";
  bodySelect.current.value = "";
  statusSelect.current.value = "";

  inputs.forEach((input) => input.classList.remove("border-danger"));

  return true;
};
