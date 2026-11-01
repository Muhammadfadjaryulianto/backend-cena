import {
  createProductValidation,
  getProductValidation,
  updateProductValidation,
} from "../validation/product-validation.js";
import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";
import { removeFile } from "../utils/file-helper.js";

const cleanupFile = async (filename) => {
  try {
    await removeFile(filename);
  } catch (error) {
    console.error("File cleanup failed:", error);
  }
};

// create product
const create = async (user, file, request) => {
  try {
    const product = validate(createProductValidation, request);

    if (file) {
      product.cover = file.filename;
    }

    product.userId = user.id;

    return await prismaClient.product.create({
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
  } catch (error) {
    if (file) {
      await cleanupFile(file.filename);
    }

    throw error;
  }
};

// get product
const get = async (user, productId) => {
  productId = validate(getProductValidation, productId);

  const product = await prismaClient.product.findFirst({
    where: {
      userId: user.id,
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

// get all product
const getAllProduct = async (user) => {
  return prismaClient.product.findMany({
    where: {
      userId: user.id,
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
};

// update product
const update = async (user, file, request) => {
  let existingProduct;
  let updatedProduct;

  try {
    const product = validate(updateProductValidation, request);

    existingProduct = await prismaClient.product.findFirst({
      where: {
        id: product.id,
        userId: user.id,
      },
    });

    if (!existingProduct) {
      throw new ResponseError(404, "product is not found");
    }

    const updateData = {
      judul_buku: product.judul_buku,
      nama_penulis: product.nama_penulis,
      deskripsi: product.deskripsi,
      harga: product.harga,
    };

    if (file) {
      updateData.cover = file.filename;
    }

    updatedProduct = await prismaClient.product.update({
      where: {
        id: product.id,
      },
      data: updateData,
      select: {
        id: true,
        cover: true,
        judul_buku: true,
        nama_penulis: true,
        deskripsi: true,
        harga: true,
      },
    });
  } catch (error) {
    // Database atau validasi gagal:
    // hapus file baru, pertahankan file lama.
    if (file) {
      await cleanupFile(file.filename);
    }

    throw error;
  }

  // Database berhasil diperbarui.
  // Sekarang aman untuk menghapus cover lama.
  if (
    file &&
    existingProduct.cover &&
    existingProduct.cover !== file.filename
  ) {
    await cleanupFile(existingProduct.cover);
  }

  return updatedProduct;
};

// delete product
const remove = async (user, productId) => {
  productId = validate(getProductValidation, productId);

  const product = await prismaClient.product.findFirst({
    where: {
      id: productId,
      userId: user.id,
    },
    select: {
      id: true,
      cover: true,
    },
  });

  if (!product) {
    throw new ResponseError(404, "product is not found");
  }

  // Hapus data produk terlebih dahulu.
  await prismaClient.product.delete({
    where: {
      id: product.id,
    },
  });

  // Jika database berhasil menghapus produk,
  // hapus file cover dari filesystem.
  if (product.cover) {
    await cleanupFile(product.cover);
  }

  return {
    message: "product deleted successfully",
  };
};

export default {
  create,
  get,
  update,
  remove,
  getAllProduct,
};
