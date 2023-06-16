const express = require("express");
const axios = require("axios");

const app = express();
const port = 3001;

app.use(express.json());

app.get("/api/province", async (req, res) => {
  try {
    const response = await axios.get("https://vapi.vnappmob.com/api/province");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching provinces:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching provinces" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
