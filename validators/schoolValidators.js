const validateSchool = (data) => {
  const { name, address, latitude, longitude } = data;

  if (!name || name.trim() === "") {
    return "School name is required";
  }

  if (name.trim().length < 3) {
    return "School name must be at least 3 characters";
  }

  

  if (!address || address.trim() === "") {
    return "Address is required";
  }

  if (
    typeof latitude !== "number" ||
    typeof longitude !== "number"
  ) {
    return "Latitude and Longitude must be numbers";
  }

  if (latitude < -90 || latitude > 90) {
    return "Latitude must be between -90 and 90";
  }

  if (longitude < -180 || longitude > 180) {
    return "Longitude must be between -180 and 180";
  }

  return null;
};

module.exports = { validateSchool };