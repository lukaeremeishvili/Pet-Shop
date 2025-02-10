import { Id, toast, Zoom } from "react-toastify";

export const loadingNotification = () =>
  toast.loading("Waiting Response", {
    position: "bottom-right",
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Zoom,
  });

export const successNotification = () => {
  toast.success("Success", {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Zoom,
  });
};

export const errorNotification = (text: string) => {
  toast.error(text, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Zoom,
  });
};

export const onResponseReturned = (
  loadingToastId: Id,
  navigate: () => void,
  error: string | null
) => {
  toast.dismiss(loadingToastId);
  if (error) errorNotification(error);
  else {
    successNotification();
    navigate();
  }
};
