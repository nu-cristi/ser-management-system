import styles from "./styles.module.scss";
import axios from "axios";
//components and hooks
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../../components/Modal";

export default function Users() {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    message: "",
    actionType: "",
    userId: "",
  });
  const isAuth = useAuth();

  useEffect(() => {
    axios.get("http://localhost:4000/api/users").then((response) => {
      setData(response.data);
    });
  }, [data]);

  const deleteUser = () => {
    axios
      .delete("http://localhost:4000/api/users/delete", {
        data: { id: modalConfig.userId },
      })
      .then(() => {
        toast("User deleted successfully");
      });
  };

  const updateUser = (formData) => {
    console.log(formData);
    axios
      .patch("http://localhost:4000/api/users/update", {
        data: {
          id: modalConfig.userId,
          email: formData.email,
          password: formData.password,
        },
      })
      .then(() => {
        toast("User updated successfully");
      });
  };

  const addUser = (formData) => {
    const data = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
    };
    if (!data.email || !data.username || !data.password) {
      toast.error("All fields must be filled");
      return;
    }
    axios.post("http://localhost:4000/api/users/register", data);
  };

  function openModal(e) {
    setIsOpen(true);
    const { id, action } = e.target.dataset;
    setModalConfig({
      ...modalConfig,
      userId: id,
      actionType: action,
      message:
        action === "delete"
          ? "Are you sure you want to delete this user?"
          : null,
    });
  }

  const confirmAction = (e, formData) => {
    e.preventDefault();
    if (modalConfig.actionType === "delete") {
      deleteUser();
    } else if (modalConfig.actionType === "new") {
      addUser(formData);
    } else if (modalConfig.actionType === "update") {
      updateUser(formData);
    }
    setIsOpen(false);
  };

  return isAuth ? (
    <div className={styles.container}>
      <h1>Users Table:</h1>
      <button
        className={styles.btn}
        type="button"
        data-action="new"
        onClick={(e) => openModal(e)}
      >
        Add new user
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data
            ?.slice()
            ?.reverse()
            ?.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td className={styles.btn_td}>
                  <button
                    className={styles.btn}
                    data-id={user._id}
                    type="button"
                    data-action="delete"
                    onClick={(e) => openModal(e)}
                  >
                    Delete user
                  </button>
                  <button
                    className={styles.btn}
                    data-id={user._id}
                    type="button"
                    data-action="update"
                    onClick={(e) => openModal(e)}
                  >
                    Update info
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isOpen && (
        <Modal
          confirmAction={confirmAction}
          message={modalConfig.message}
          actionType={modalConfig.actionType}
          setIsOpen={setIsOpen}
        />
      )}
      <ToastContainer />
    </div>
  ) : null;
}
