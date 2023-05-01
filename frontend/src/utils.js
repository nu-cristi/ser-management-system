// Updates a state based on an input. Used throughout the project for every form.
const handleInputChange = (event, callback) => {
  const { name, value } = event.target;
  callback((prevState) => ({ ...prevState, [name]: value }));
};

export { handleInputChange };
