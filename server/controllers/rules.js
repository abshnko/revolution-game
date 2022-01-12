export const getRules = async (req, res) => {
  try {
    await res.status(200).json({ rules: "here" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
