import { prismaClient} from "../src/application/database.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

// Remove test user from the database
export const removeTestUserRegister = async () => {
    await prismaClient.user.deleteMany({
        where: {
           username: "test"
        }
    });
};

// Remove test user from the database
export const removeTestUserLogin = async () => {
    await prismaClient.user.deleteMany({
        where: {
           token: "test"
        }
    });
};

export const createTestUser = async () => {
    const uniqueUsername = `test_${uuidv4()}`;
    const uniqueEmail = `test_${uuidv4()}@example.com`;
    await prismaClient.user.create({
        data: {
            email: "test@gmail.com",
            username: "test",
            password: await bcrypt.hash("Sohibul_2807", 10),
            name: "test",
            token: "test",
        }
    })
}

export const getTestUser = async () => {
    return prismaClient.user.findFirst({
        where: {
            token: "test"
        }
    });
}

export const getTestUserLogout = async () => {
    return prismaClient.user.findFirst({
        where: {
            name: "test"
        }
    });
}

export const removeAllTestProducts = async () => {
    const user = await getTestUser();
    await prismaClient.product_test.deleteMany({
        where: {
            judul_buku: "test" 
        }
    });
}

export const createTestProduct = async () => {
    const filePath = path.resolve(__dirname, 'test-files', 'test-image.jpg'); // Path to a test image file
    await prismaClient.product.create({
        data: {
            judul_buku: "test",
            nama_penulis: "test",
            deskripsi: "test",
            harga: "123456",
            cover: filePath
        }
    })
}

export const getTestProduct = async () => {
    const user = await getTestUser();
    return prismaClient.product_test.findFirst({
        where: {
            judul_buku: "test"
        }
    })
}