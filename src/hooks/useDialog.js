import swal from "sweetalert";
import { toast } from "react-toastify";

/**
 * Represents a React hook to show a delete dialog box.
 *
 */

export default function useDialog() {
  const deleteItemId = (handleDelete, id) => {
    swal({
      title: "Are you sure",
      text: `You want to delete? process cannot be reversed`,
      icon: "warning",
      buttons: {
        none: {
          text: "cancel",
          className: "cancel",
          value: null,
        },
        confirm: {
          text: "delete",
          value: true,
          closeModal: false,
          className: "confirm--delete",
        },
      },
    }).then((value) => {
      if (value) {
        handleDelete(id)
          .then(() => {
            swal.stopLoading();
            swal.close();
            toast.success("Deleted successfully");
          })
          .catch((err) => {
            swal.stopLoading();
            swal.close();
            toast.error(err?.response?.data?.message || "Could not delete");
          });
      } else {
        swal.stopLoading();
        swal.close();
      }
    });
  };
  const deleteItem = (handleDelete, name) => {
    swal({
      title: `Are you sure you want to remove ${name}?`,
      text: `You want to remove ${name}? process cannot be reversed`,
      icon: "warning",
      buttons: {
        none: {
          text: "cancel",
          className: "cancel",
          value: null,
        },
        confirm: {
          text: "delete",
          value: true,
          closeModal: false,
          className: "confirm--delete",
        },
      },
    }).then((value) => {
      if (value) {
        handleDelete()
          .then(() => {
            swal.stopLoading();
            swal.close();
            toast.success("Removed successfully");
          })
          .catch((err) => {
            swal.stopLoading();
            swal.close();
            toast.error(
              err?.response?.data?.message || "Could not delete"
            );
          });
      } else {
        swal.stopLoading();
        swal.close();
      }
    });
};

  return {
    deleteItem,
    deleteItemId
  };

}
