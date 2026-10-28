import productService from "../service/product-service.js";

// create produk controller bila ada user autentikasi
// const create = async (req, res, next) => {
//     try {
//         const user = req.user;
//         const request = req.body;
//         console.log(req.file);
//         const cover = req.file;
//         const result = await productService.create(user, cover, request);

//         res.status(200).json({
//             data: result,
//             cover_url: `http://localhost:300/api/cover/${req.file.filename}`
//         })
//     }catch(e){
//         next(e)
//     }
// }

// create produk controller percobaan tanpa user autentikasi
const create = async (req, res, next) => {
  try {
    const request = req.body;
    console.log(req.file);
    const cover = req.file;
    const result = await productService.create(cover, request);

    const baseUrl =
      process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;

    result.cover = `${baseUrl}/api/cover/${result.cover}`;
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

// get produk controller bila ada user autentikasi
// const get = async (req, res, next) => {
//     try {
//         const user = req.user;
//         const productId = req.params.productId;
//         const result = await productService.get(user, productId);
//         console.log(result);

//         res.status(200).json({
//             data: result,
//         })
//     }catch(e){
//         next(e)
//     }
// }

// get produk cotroller percobaan tanpa user autentikasi
const get = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const result = await productService.get(productId);
    console.log(result);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

// get all product bila ada user autentikasi
// const getAllProduct = async (req, res, next) => {
//     try {
//         const user = req.user;
//         const result = await productService.getAllProduct(user);
//         console.log(result);

//         res.status(200).json({
//             data: result
//         });
//     } catch (e) {
//         next(e);
//     }
// };

// get all product percobaan tanpa user autentikasi
const getAllProduct = async (req, res, next) => {
  try {
    const result = await productService.getAllProduct();
    console.log(result);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

// update product controller bila ada user autentikasi
// const update = async (req, res, next) => {
//     try {
//         const user = req.user;
//         const productId = req.params.productId;
//         const request = req.body;
//         request.id = productId;
//         console.log(req.file);
//         console.log(productId);
//         const cover = req.file;

//         const result = await productService.update(user, cover, request);

//         res.status(200).json({
//             data: result,
//             cover_url: `http://localhost:300/api/cover/${req.file.filename}`
//         })
//     }catch(e){
//         next(e)
//     }
// }

// update product controller percobaan tanpa user autentikasi
const update = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const request = req.body;
    request.id = productId;
    console.log(req.file);
    console.log(productId);
    const cover = req.file;

    const result = await productService.update(cover, request);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

// delete product controller bila ada user autentikasi
// const remove = async (req, res, next) => {
//     try {
//         const user = req.user;
//         const productId = req.params.productId;

//         await productService.remove(user, productId);
//         res.status(200).json({
//             data: "berhasil di hapus"
//         })
//     }catch(e){
//         next(e)
//     }
// }

// delete product controller percobaan tanpa user autentikasi
const remove = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    await productService.remove(productId);
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
