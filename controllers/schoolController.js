const db = require("../config/db");
const { getDistance } = require("../services/distanceServices");
const { validateSchool } = require("../validators/schoolValidators");

const addSchool = (req, res) => {
  const error = validateSchool(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  const { name, address, latitude, longitude } = req.body;

  const query =
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";

  db.query(query, [name, address, latitude, longitude], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database Error" });
    }

    res.status(201).json({
      message: "School added successfully",
      id: result.insertId,
    });
  });
};

const listSchools = (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  if (!userLat || !userLon) {
    return res.status(400).json({ error: "Latitude & Longitude required" });
  }

  db.query("SELECT * FROM schools", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database Error" });
    }

    const sorted = results
      .map((school) => {
        const distance = getDistance(
          userLat,
          userLon,
          school.latitude,
          school.longitude
        );

        return { ...school, distance };
      })
      .sort((a, b) => a.distance - b.distance);

    res.json(sorted);
  });
};

module.exports = { addSchool, listSchools };