import Joi from "joi";

const createProductValidation = Joi.object({
    cover: Joi.any().optional().allow(null, ''),
    judul_buku: Joi.string().max(100).required(),
    nama_penulis: Joi.string().max(100).required(),
    deskripsi: Joi.string().optional().allow(null, ''),
    harga: Joi.string().max(10).required(),
});

const getProductValidation = Joi.number().positive().required();

const updateProductValidation = Joi.object({
    id: Joi.number().positive().required(),
    cover: Joi.any().optional().allow(null, ''),
    judul_buku: Joi.string().max(100).required(),
    nama_penulis: Joi.string().max(100).required(),
    deskripsi: Joi.string().optional().allow(null, ''),
    harga: Joi.string().max(10).required()
});

export {
    createProductValidation,
    getProductValidation,
    updateProductValidation
}