import { useState } from "react";
import styles from "./styles.module.scss";

export default function Modal({
  confirmAction,
  message,
  actionType,
  setIsOpen,
}) {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // const handleSubmit

  if (actionType === "delete") {
    return (
      <div className={styles.container}>
        {message}
        <button onClick={confirmAction} className={styles.submit_btn}>
          Confirm
        </button>
        <button onClick={() => setIsOpen(false)} className={styles.submit_btn}>
          Cancel
        </button>
      </div>
    );
  } else if (actionType === "new") {
    return (
      <form onSubmit={(e) => confirmAction(e, formData)} className={styles.container}>
        <label className={styles.label}>
          <p>Enter an email:</p>
          <input
            className={styles.styled_input}
            placeholder="Email..."
            type="text"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          <p>Choose a username:</p>
          <input
            className={styles.styled_input}
            placeholder="Username..."
            type="text"
            name="username"
            value={formData.username || ""}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          <p>Enter a password:</p>
          <input
            className={styles.styled_input}
            placeholder="Password..."
            type="password"
            name="password"
            value={formData.password || ""}
            onChange={handleChange}
          />
        </label>
        <input type="submit" className={styles.submit_btn} />
        <button onClick={() => setIsOpen(false)} className={styles.submit_btn}>
          Cancel
        </button>
      </form>
    );
  } else if (actionType === "update") {
    return (
      <form onSubmit={(e) => confirmAction(e, formData)} className={styles.container}>
        <label className={styles.label}>
          <p>Enter a new email:</p>
          <input
            className={styles.styled_input}
            placeholder="Email..."
            type="text"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          <p>Enter a new password:</p>
          <input
            className={styles.styled_input}
            placeholder="Password..."
            type="password"
            name="password"
            value={formData.password || ""}
            onChange={handleChange}
          />
        </label>
        <input type="submit" className={styles.submit_btn} />
        <button onClick={() => setIsOpen(false)} className={styles.submit_btn}>
          Cancel
        </button>
      </form>
    );
  }
}
