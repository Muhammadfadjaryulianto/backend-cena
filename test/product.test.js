import supertest from "supertest";
import {createTestProduct, createTestUser, getTestProduct, removeAllTestProducts, removeTestUser, removeTestUserLogin} from "./test-util.js";
import {app} from "../src/application/app.js"
import { logger } from "../src/application/logging.js";
import path from 'path';

describe.only('POST /api/products', function () {

    // beforeEach(async () => {
    //     await createTestUser();
    // })

    afterEach(async () => {
        await removeAllTestProducts();
        // await removeTestUserLogin();
    })

    it('should can create new product', async () => {
        const filePath = path.resolve(__dirname, 'test-files', 'test-image.jpg'); // Path to a test image file
        const result = await supertest(app)
            .post("/api/products")
            .field('judul_buku', 'test')
            .field('nama_penulis', 'test')
            .field('deskripsi', 'test')
            .field('harga', '123456')
            .attach('cover', filePath);
            // .set('Authorization', 'test')
        
        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.cover).toBeDefined();
        expect(result.body.data.judul_buku).toBe("test");
        expect(result.body.data.nama_penulis).toBe("test");
        expect(result.body.data.deskripsi).toBe("test");
        expect(result.body.data.harga).toBe("123456");
        expect(result.body.cover_url).toBeDefined();
    },10000);
})

describe('GET /api/products/:productId', function () {

    afterEach(async () => {
        await removeAllTestProducts();
    })

    it('should can get product', async () => {
        const filePath = path.resolve(__dirname, 'test-files', 'test-image.jpg'); // Path to a test image file
        let result = await supertest(app)
            .post("/api/products")
            .field('judul_buku', 'test')
            .field('nama_penulis', 'test')
            .field('deskripsi', 'test')
            .field('harga', '123456')
            .attach('cover', filePath);
            // .set('Authorization', 'test')
        
        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.cover).toBeDefined();
        expect(result.body.data.judul_buku).toBe("test");
        expect(result.body.data.nama_penulis).toBe("test");
        expect(result.body.data.deskripsi).toBe("test");
        expect(result.body.data.harga).toBe("123456");
        expect(result.body.cover_url).toBeDefined();

        const testProduct = await getTestProduct();
        result = await supertest(app)
            .get("/api/products/" + testProduct.id)

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testProduct.id);
        expect(result.body.data.judul_buku).toBe(testProduct.judul_buku);
        expect(result.body.data.nama_penulis).toBe(testProduct.nama_penulis);
        expect(result.body.data.deskripsi).toBe(testProduct.deskripsi);
        expect(result.body.data.harga).toBe(testProduct.harga);
        expect(result.body.data.cover).toBe(testProduct.cover);
    });

    it('should return 404 if product id is notfound', async () => {
        const filePath = path.resolve(__dirname, 'test-files', 'test-image.jpg'); // Path to a test image file
        let result = await supertest(app)
            .post("/api/products")
            .field('judul_buku', 'test')
            .field('nama_penulis', 'test')
            .field('deskripsi', 'test')
            .field('harga', '123456')
            .attach('cover', filePath);
        
        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.cover).toBeDefined();
        expect(result.body.data.judul_buku).toBe("test");
        expect(result.body.data.nama_penulis).toBe("test");
        expect(result.body.data.deskripsi).toBe("test");
        expect(result.body.data.harga).toBe("123456");
        expect(result.body.cover_url).toBeDefined();

        const testProduct = await getTestProduct();
        result = await supertest(app)
            .get("/api/products/" + (testProduct.id + 1))

        logger.info(result.body);

        expect(result.status).toBe(404);
    });
})

describe('PUT /api/products/:productId', function () {
    // beforeEach(async () => {
    //     await createTestUser();
    // })

    afterEach(async () => {
        await removeAllTestProducts();
        // await removeTestUserLogin();
    },10000)

    it('should can update existing product', async () => {
        const filePath = path.resolve(__dirname, 'test-files', 'test-image.jpg'); // Path to a test image file
        let result = await supertest(app)
            .post("/api/products")
            .field('judul_buku', 'test')
            .field('nama_penulis', 'test')
            .field('deskripsi', 'test')
            .field('harga', '123456')
            .attach('cover', filePath);
            // .set('Authorization', 'test')
        
        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.cover).toBeDefined();
        expect(result.body.data.judul_buku).toBe("test");
        expect(result.body.data.nama_penulis).toBe("test");
        expect(result.body.data.deskripsi).toBe("test");
        expect(result.body.data.harga).toBe("123456");
        expect(result.body.cover_url).toBeDefined();

        const testProduct = await getTestProduct();
        result = await supertest(app)
            .put("/api/products/" + testProduct.id)
            .field('judul_buku', 'judul baru')
            .field('nama_penulis', 'nama penulis baru')
            .field('deskripsi', 'deskripsi baru')
            .field('harga', '678910')
            .attach('cover', filePath)
            // .set('Authorization', 'test')

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testProduct.id);
        expect(result.body.data.judul_buku).toBe('judul baru');
        expect(result.body.data.nama_penulis).toBe('nama penulis baru');
        expect(result.body.data.deskripsi).toBe('deskripsi baru');
        expect(result.body.data.harga).toBe('678910');
        expect(result.body.data.cover).toBeDefined();
    });

    it('should reject if request product not valid', async () => {
        const filePath = path.resolve(__dirname, 'test-files', 'test-image.jpg'); // Path to a test image file
        let result = await supertest(app)
            .post("/api/products")
            .field('judul_buku', 'test')
            .field('nama_penulis', 'test')
            .field('deskripsi', 'test')
            .field('harga', '123456')
            .attach('cover', filePath);
            // .set('Authorization', 'test')
        
        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.cover).toBeDefined();
        expect(result.body.data.judul_buku).toBe("test");
        expect(result.body.data.nama_penulis).toBe("test");
        expect(result.body.data.deskripsi).toBe("test");
        expect(result.body.data.harga).toBe("123456");
        expect(result.body.cover_url).toBeDefined();

        const testProduct = await getTestProduct();
        result = await supertest(app)
            .put("/api/products/" + testProduct.id)
            .field('judul_buku', '')
            .field('nama_penulis', '')
            .field('deskripsi', 'deskripsi baru')
            .field('harga', '6789101234059876')
            .attach('cover', filePath)
            // .set('Authorization', 'test')

        logger.info(result.body);

        expect(result.status).toBe(400);
    });

    it('should reject if product not found', async () => {
        const filePath = path.resolve(__dirname, 'test-files', 'test-image.jpg'); // Path to a test image file
        let result = await supertest(app)
            .post("/api/products")
            .field('judul_buku', 'test')
            .field('nama_penulis', 'test')
            .field('deskripsi', 'test')
            .field('harga', '123456')
            .attach('cover', filePath);
            // .set('Authorization', 'test')
        
        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.cover).toBeDefined();
        expect(result.body.data.judul_buku).toBe("test");
        expect(result.body.data.nama_penulis).toBe("test");
        expect(result.body.data.deskripsi).toBe("test");
        expect(result.body.data.harga).toBe("123456");
        expect(result.body.cover_url).toBeDefined();

        const testProduct = await getTestProduct();
        result = await supertest(app)
            .put("/api/products/" + (testProduct.id + 1))
            .field('judul_buku', 'judul buku baru')
            .field('nama_penulis', 'nama penulis baru')
            .field('deskripsi', 'deskripsi baru')
            .field('harga', '678910')
            .attach('cover', filePath)
            // .set('Authorization', 'test')

        logger.info(result.body);

        expect(result.status).toBe(404);
    });
})

describe('DELETE /api/products/:productId', function (){
    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeAllTestProducts();
        await removeTestUserLogin();
    })
    
    it('should deleted existing product', async () => {
        const filePath = path.resolve(__dirname, 'test-files', 'test-image.jpg'); // Path to a test image file
        let result = await supertest(app)
            .post("/api/products")
            .set('Authorization', 'test')
            .field('judul_buku', 'test')
            .field('nama_penulis', 'test')
            .field('deskripsi', 'test')
            .field('harga', '123456')
            .attach('cover', filePath);
        
        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.cover).toBeDefined();
        expect(result.body.data.judul_buku).toBe("test");
        expect(result.body.data.nama_penulis).toBe("test");
        expect(result.body.data.deskripsi).toBe("test");
        expect(result.body.data.harga).toBe("123456");
        expect(result.body.cover_url).toBeDefined();

        let testProduct = await getTestProduct();
        result = await supertest(app)
            .delete('/api/products/' + testProduct.id)
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("berhasil di hapus");

        testProduct = await getTestProduct();
        expect(testProduct).toBeNull();
    });

    it('should reject if product not found', async () => {
        const filePath = path.resolve(__dirname, 'test-files', 'test-image.jpg'); // Path to a test image file
        let result = await supertest(app)
            .post("/api/products")
            .set('Authorization', 'test')
            .field('judul_buku', 'test')
            .field('nama_penulis', 'test')
            .field('deskripsi', 'test')
            .field('harga', '123456')
            .attach('cover', filePath);
        
        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.cover).toBeDefined();
        expect(result.body.data.judul_buku).toBe("test");
        expect(result.body.data.nama_penulis).toBe("test");
        expect(result.body.data.deskripsi).toBe("test");
        expect(result.body.data.harga).toBe("123456");
        expect(result.body.cover_url).toBeDefined();

        let testProduct = await getTestProduct();
        result = await supertest(app)
            .delete('/api/products/' + (testProduct.id + 1))
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(404);
    });
})