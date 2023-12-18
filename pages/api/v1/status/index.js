function status(req, res) {
  res.status(200).json({ response: "this is a response" });
}

export default status;
