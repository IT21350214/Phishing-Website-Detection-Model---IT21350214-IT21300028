const Url = require("../models/Url");
const { PythonShell } = require("python-shell");

exports.getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).send({
      message: "Urls retrieved",
      urls: urls,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addUrl = async (req, res) => {
  const { urlLink } = req.body;

  try {
    console.log("Received URL:", urlLink);

    let options = {
      mode: 'text',
      // pythonPath: "C:/Python312/python.exe", // Uncomment and set the correct Python path if needed
      pythonOptions: ['-u'],
      scriptPath: 'C:\\Users\\famnu\\OneDrive\\Desktop\\pishing\\Backend', // Ensure this is the correct script path
    };

    console.log("PythonShell options:", options);

    // Run the Python script with the specified options
    let pyshell = new PythonShell('python.py', options);

    // Send the URL to the Python script via stdin
    pyshell.send(urlLink);

    // Listen for messages from the Python script
    pyshell.on('message', function (message) {
      console.log("PythonShell message:", message);

      const status = message.trim(); // The message is the prediction

      const newUrl = new Url({
        urlLink,
        status,
      });

      newUrl.save()
        .then(() => {
          console.log("Url added to database");
          res.status(200).send({ message: "Url added", status });
        })
        .catch((err) => {
          console.log("Database save error:", err);
          res.status(500).json({ message: err.message });
        });
    });

    // Handle errors from the Python script
    pyshell.end(function (err) {
      if (err) {
        console.log("PythonShell end error:", err);
        return res.status(500).json({ message: err.message });
      }
      console.log("PythonShell finished");
    });

  } catch (error) {
    console.log("Try-catch error:", error);
    res.status(500).json({ message: error.message });
  }
};
