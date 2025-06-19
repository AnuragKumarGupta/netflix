export const checkValidate = (name, email, password, isSignIn) => {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const isPAsswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  if (!isSignIn) {
    const isNameValid = /^[a-zA-Z]+(?:[\s-'][a-zA-Z]+)*$/.test(name);
    if (!isNameValid) {
      return "Invalid Name";
    }
  }
  if (!isEmailValid) {
    return "Invalid Email";
  }
  if (!isPAsswordValid) {
    return "Invalid Password";
  }
  return null;
};
