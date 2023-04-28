import axios from "axios";
//components and hooks
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../../component/Modal";

export default function Users() {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    message: '',
    actionType: '',
    userId: ''
  })
  useAuth();

  useEffect(() => {
    axios.get("http://localhost:4000/api/users").then((response) => {
      setData(response.data);
    });
  }, [data]);

  const deleteUser = () => {
    axios
      .delete(`http://localhost:4000/api/users/delete/${modalConfig.userId}`)
      .then(() => {
        toast("User deleted successfully");
      });
  };

  function openModal(e) {
    setIsOpen(true);
    modalConfig.userId = e.target.dataset.id;
    modalConfig.actionType = e.target.dataset.action
    if (modalConfig.actionType === "delete") {
      modalConfig.message = 'Are you sure you want to delete this user?'
    } else if (modalConfig.actionType === "new") {
      modalConfig.message = "Please fill in the requested fields";
    } else {
      modalConfig.message = "Update";
    }
  }

  function confirmAction() {
    if(modalConfig.actionType === 'delete' ){
      deleteUser();
    }else if(modalConfig.actionType === 'new'){
      console.log('new')
    }else{
      console.log("update")
    }
    setConfirm(true);
    setIsOpen(false);
  }

  return (
    <>
      <h1>Users Table:</h1>
      <input type="button" 
      value="Add new user"
      data-action="new"
      onClick={(e) => openModal(e)}></input>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
          {data &&
            data
              .slice()
              .reverse()
              .map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <input
                      data-id={user._id}
                      type="button"
                      value="Delete user"
                      data-action="delete"
                      onClick={(e) => openModal(e)}
                    />
                    <input
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
      {isOpen && <Modal confirmAction={confirmAction} message={modalConfig.message} />}
      <ToastContainer />
    </>
  );
}
