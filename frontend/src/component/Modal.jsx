export default function Modal({confirmAction, message}) {
  return (
    <>
      <div>
        {message}
        <button onClick={confirmAction}>Confirm</button>
      </div>
    </>
  );
}
