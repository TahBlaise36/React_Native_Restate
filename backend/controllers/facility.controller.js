import Facility from "../models/facility.model.js";

export const createFacility = async (req, res, next) => {
  try {
    const { title } = req.body;

    const existingFacility = await Facility.findOne({ title });

    if (existingFacility) {
      const error = new Error("Facility already exists");
      error.statusCode = 409;
      throw error;
    }

    const facility = await Facility.create(req.body);

    if (!facility) {
      const error = new Error("Facility not found!");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: facility });
  } catch (err) {
    next(err);
  }
};

export const getFacilities = async (req, res, next) => {
  try {
    const facilities = await Facility.find();

    res.status(200).json({ success: true, data: facilities });
  } catch (error) {
    next(error);
  }
};

export const getFacility = async (req, res, next) => {
  try {
    const facility = await Facility.findById(req.params.id);

    if (!facility) {
      const error = new Error("Facility not found!");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ success: true, data: facility });
  } catch (err) {
    next(err);
  }
};

export const deleteFacility = async (req, res, next) => {
  try {
    const facility = await Facility.findById(req.params.id);

    if (!facility) {
      const error = new Error("Facility not found!");
      error.statusCode = 404;
      throw error;
    }

    await facility.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Facility deleted successfully" });
  } catch (err) {
    next(err);
  }
};
