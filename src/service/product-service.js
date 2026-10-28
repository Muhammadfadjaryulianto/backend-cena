import {
  createProductValidation,
  getProductValidation,
  updateProductValidation,
} from "../validation/product-validation.js";
import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";

// create produk bila ada user autentikasi
// const create = async (user, file, request) => {
//     const product = validate(createProductValidation, request);
//     product.userId = user.id;
//     product.cover = `https://cunning-nominally-grouper.ngrok-free.app/api/cover/${file.filename}`;

//     return prismaClient.product.create({
//         data: product,
//         select: {
//             id: true,
//             cover: true,
//             judul_buku: true,
//             nama_penulis: true,
//             deskripsi: true,
//             harga: true
//         }
//     })
// }

// create produk percobaan tanpa user autentikasi
const create = async (file, request) => {
  const product = validate(createProductValidation, request);
  // product.cover = `https://cunning-nominally-grouper.ngrok-free.app/api/cover/${file.filename}`;

  product.cover = file.filename;
  return prismaClient.product_test.create({
    data: product,
    select: {
      id: true,
      cover: true,
      judul_buku: true,
      nama_penulis: true,
      deskripsi: true,
      harga: true,
    },
  });
};

// get produk bila ada user autentikasi
// const get = async (user, productId) => {
//     productId = validate(getProductValidation, productId);

//     const product = await prismaClient.product.findFirst({
//         where: {
//             userId: user.id,
//             id: productId
//         },
//         select: {
//             id: true,
//             judul_buku: true,
//             nama_penulis: true,
//             deskripsi: true,
//             harga: true,
//             cover: true
//         }
//     });

//     if(!product){
//         throw new ResponseError(404, "product is not found");
//     }

//     return product;
// }

// get produk bila ada user autentikasi
const get = async (productId) => {
  productId = validate(getProductValidation, productId);

  const product = await prismaClient.product_test.findFirst({
    where: {
      id: productId,
    },
    select: {
      id: true,
      judul_buku: true,
      nama_penulis: true,
      deskripsi: true,
      harga: true,
      cover: true,
    },
  });

  if (!product) {
    throw new ResponseError(404, "product is not found");
  }

  return product;
};

// get all product bila ada user autentikasi
// const getAllProduct = async (user) => {

//     return prismaClient.product_test.findMany({
//         where: {
//             userId: user.id,
//         },
//         select: {
//             id: true,
//             judul_buku: true,
//             nama_penulis: true,
//             deskripsi: true,
//             harga: true,
//             cover: true
//         }
//     });
// }

// get all product percobaan tanpa user autentikasi
const getAllProduct = async () => {
  return prismaClient.product_test.findMany({
    select: {
      id: true,
      judul_buku: true,
      nama_penulis: true,
      deskripsi: true,
      harga: true,
      cover: true,
    },
  });
};

// update produk bila ada user autentikasi
// const update = async (user, file, request) => {
//     const product = validate(updateProductValidation, request);

//     const totalProductInDatabase = await prismaClient.product.count({
//         where: {
//             userId: user.id,
//             id: product.id
//         }
//     });

//     if(totalProductInDatabase !== 1){
//         throw new ResponseError(404, "product is not found");
//     }

//     product.cover = `https://cunning-nominally-grouper.ngrok-free.app/api/cover/${file.filename}`;

//     return prismaClient.product.update({
//         where: {
//             id: product.id
//         },
//         data: {
//             cover: product.cover,
//             judul_buku: product.judul_buku,
//             nama_penulis: product.nama_penulis,
//             deskripsi: product.deskripsi,
//             harga: product.harga,
//         },
//         select: {
//             id: true,
//             cover: true,
//             judul_buku: true,
//             nama_penulis: true,
//             deskripsi: true,
//             harga: true
//         }
//     });
// }

// update produk percobaan tanpa user autentikasi
const update = async (file, request) => {
  const product = validate(updateProductValidation, request);

  const totalProductInDatabase = await prismaClient.product_test.count({
    where: {
      id: product.id,
    },
  });

  if (totalProductInDatabase !== 1) {
    throw new ResponseError(404, "product is not found");
  }

  product.cover = `https://cunning-nominally-grouper.ngrok-free.app/api/cover/${file.filename}`;
  // product.cover = file.filename;

  return prismaClient.product_test.update({
    where: {
      id: product.id,
    },
    data: {
      cover: product.cover,
      judul_buku: product.judul_buku,
      nama_penulis: product.nama_penulis,
      deskripsi: product.deskripsi,
      harga: product.harga,
    },
    select: {
      id: true,
      cover: true,
      judul_buku: true,
      nama_penulis: true,
      deskripsi: true,
      harga: true,
    },
  });
};

// delete produk bila user autentikasi
// const remove = async (user, productId) => {
//     productId = validate(getProductValidation, productId);

//     const totalInDatabase = await prismaClient.product.count({
//         where: {
//             userId: user.id,
//             id: productId
//         }
//     });

//     if(totalInDatabase !== 1){
//         throw new ResponseError(404, "product is not found");
//     }

//     return prismaClient.product.delete({
//         where: {
//             id: productId
//         }
//     });
// }

// delete produk percobaan tanpa user autentikasi
const remove = async (productId) => {
  productId = validate(getProductValidation, productId);

  const totalInDatabase = await prismaClient.product_test.count({
    where: {
      id: productId,
    },
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "product is not found");
  }

  return prismaClient.product_test.delete({
    where: {
      id: productId,
    },
  });
};

export default {
  create,
  get,
  update,
  remove,
  getAllProduct,
};
