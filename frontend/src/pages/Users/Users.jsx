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
  const [confirm, setConfirm] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    message: "",
    actionType: "",
    userId: "",
  });
  useAuth();

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
    axios.post("http://localhost:4000/api/users/register", data);
  };

  const openModal = (e) => {
    setIsOpen(true);
    modalConfig.userId = e.target.dataset.id;
    modalConfig.actionType = e.target.dataset.action;
    if (modalConfig.actionType === "delete") {
      modalConfig.message = "Are you sure you want to delete this user?";
    }
  };

  const confirmAction = (e, formData) => {
    e.preventDefault();
    if (modalConfig.actionType === "delete") {
      deleteUser();
    } else if (modalConfig.actionType === "new") {
      addUser(formData);
    } else if (modalConfig.actionType === "update") {
      updateUser(formData);
    }
    setConfirm(true);
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1>Users Table:</h1>
      <input
        className={styles.btn}
        type="button"
        value="Add new user"
        data-action="new"
        onClick={(e) => openModal(e)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data
              .slice()
              .reverse()
              .map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td className={styles.btn_td}>
                    <input
                      className={styles.btn}
                      data-id={user._id}
                      type="button"
                      value="Delete user"
                      data-action="delete"
                      onClick={(e) => openModal(e)}
                    />
                    <input
                      className={styles.btn}
                      data-id={user._id}
                      type="button"
                      value="Update info"
                      data-action="update"
                      onClick={(e) => openModal(e)}
                    />
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
  );
}
