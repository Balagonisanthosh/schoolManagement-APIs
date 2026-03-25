const validateSchool = (data) => {
  const { name, address, latitude, longitude } = data;

  if (!name || !address) {
    return "Name and Address are required";
  }

  if (
    typeof latitude !== "number" ||
    typeof longitude !== "number"
  ) {
    return "Latitude and Longitude must be numbers";
  }

  return null;
};

module.exports = { validateSchool };