import productService from "../service/product-service.js";
import { formatProductCover } from "../utils/cover-helper.js";
// create product
const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const cover = req.file;
    const result = await productService.create(user, cover, request);
    const baseUrl =
      process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
    const formattedResult = formatProductCover(result, baseUrl);
    res.status(201).json({
      data: formattedResult,
    });
  } catch (e) {
    next(e);
  }
};

// get product
const get = async (req, res, next) => {
  try {
    const user = req.user;
    const productId = req.params.productId;
    const result = await productService.get(user, productId);
    const baseUrl =
      process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
    const formattedResult = formatProductCover(result, baseUrl);
    res.status(200).json({
      data: formattedResult,
    });
  } catch (e) {
    next(e);
  }
};

// get all product
const getAllProduct = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await productService.getAllProduct(user);
    const baseUrl =
      process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
    const formattedResult = formatProductCover(result, baseUrl);
    res.status(200).json({
      data: formattedResult,
    });
  } catch (e) {
    next(e);
  }
};

// update product
const update = async (req, res, next) => {
  try {
    const user = req.user;
    const productId = req.params.productId;
    const request = req.body;
    request.id = productId;

    const cover = req.file;
    const result = await productService.update(user, cover, request);

    const baseUrl =
      process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;

    const formattedResult = formatProductCover(result, baseUrl);

    res.status(200).json({
      data: formattedResult,
    });
  } catch (e) {
    next(e);
  }
};

// delete product
const remove = async (req, res, next) => {
  try {
    const user = req.user;
    const productId = req.params.productId;

    await productService.remove(user, productId);
    res.status(200).json({
      data: "berhasil di hapus",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  get,
  update,
  remove,
  getAllProduct,
};
