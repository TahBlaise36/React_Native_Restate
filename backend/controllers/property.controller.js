import Property from "../models/property.model.js";
import User from "../models/user.model.js";

export const createProperty = async (req, res, next) => {
  try {
    const property = await Property.create(req.body);

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: property,
    });
  } catch (err) {
    next(err);
  }
};

export const getProperties = async (req, res, next) => {
  try {
    const properties = await Property.find()
      .populate("agent", "name email avatarUrl")
      .populate("facilities");

    res.json({ success: true, data: properties });
  } catch (err) {
    next(err);
  }
};

export const getProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("agent", "name email avatarUrl")
      .populate("facilities");

    if (!property) {
      const error = new Error("Property not found");
      error.statusCode = 404;
      throw error;
    }

    res.json({ success: true, data: property });
  } catch (err) {
    next(err);
  }
};

export const updateProperty = async (req, res, next) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!property) {
      const error = new Error("Property not found");
      error.statusCode = 404;
      throw error;
    }

    res.json({ success: true, data: property });
  } catch (err) {
    next(err);
  }
};

export const deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      const error = new Error("Property not found");
      error.statusCode = 404;
      throw error;
    }

    await property.deleteOne();

    res.json({ success: true, message: "Property deleted successfully" });
  } catch (err) {
    next(err);
  }
};
