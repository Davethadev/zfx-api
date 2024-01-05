const Package = require("../models/Package");

// Admin

const createPackage = async (req, res) => {
  const package = await Package.create({ ...req.body });
  res.status(201).json({ package });
};

const updatePackage = async (req, res) => {
  try {
    const { id: packageId } = req.params;
    const package = await Package.findByIdAndUpdate(
      { _id: packageId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!package)
      res.status(404).json({ msg: `No package with id : ${packageId}` });
    res.status(201).json({ package });
  } catch (error) {
    console.error(error);
  }
};

const deletePackage = async (req, res) => {
  try {
    const { id: packageId } = req.params;
    const package = await Package.findByIdAndRemove({ _id: packageId });
    if (!package)
      res.status(404).json({ msg: `No package with id : ${packageId}` });
    res.status(200).json({ msg: "Action was successfull" });
  } catch (error) {
    console.error(error);
  }
};

// Admin and User

const getPackages = async (req, res) => {
  const packages = await Package.find({});
  res.status(200).json({ packages, count: packages.length });
};

const getPackage = async (req, res) => {
  try {
    const { id: packageId } = req.params;
    const package = await Package.findOne({ _id: packageId });
    if (!package)
      res.status(404).json({ msg: `No package with id : ${packageId}` });
    res.status(200).json({ package });
  } catch (error) {
    console.error(error);
  }
};

const selectPackage = async (req, res) => {
  try {
    const {
      user,
      params: { id: packageId },
    } = req;
    console.log(user);
    const package = await Package.findOne({ _id: packageId });
    if (!package)
      res.status(404).json({ msg: `No package with id : ${packageId}` });
    user.package = package;
    // const result = await user.save();
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getPackages,
  getPackage,
  createPackage,
  updatePackage,
  deletePackage,
  selectPackage,
};
