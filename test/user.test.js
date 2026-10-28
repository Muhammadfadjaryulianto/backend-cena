import supertest from "supertest"
import {app} from "../src/application/app.js"
import { logger } from "../src/application/logging.js"
import { createTestUser, getTestUser, getTestUserLogout, removeTestUserLogin, removeTestUserRegister } from "./test-util.js"
import bcrypt from "bcrypt";

describe('POST /api/users', function() {

    afterEach(async () => {
        await removeTestUserRegister();
    });

    it('should can register new user', async () => {
        const result = await supertest(app)
            .post('/api/users')
            .send({
                email: 'sohibul2807@gmail.com',
                username: 'test',
                password: 'Sohibul_2807',
                name: 'test'
            });
        
        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.email).toBe("sohibul2807@gmail.com");
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined;
    }, 10000);

    it('should reject if request is invalid', async () => {
        const result = await supertest(app)
            .post('/api/users')
            .send({
                email: '',
                username: '',
                password: '',
                name: ''
            });
        
        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if email alredy registered', async () => {
        let result = await supertest(app)
            .post('/api/users')
            .send({
                email: 'sohibul2807@gmail.com',
                username: 'test',
                password: 'Sohibul_2807',
                name: 'test'
            });

        logger.info(result.body);
        
        expect(result.status).toBe(200);
        expect(result.body.data.email).toBe("sohibul2807@gmail.com");
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined;

        result = await supertest(app)
            .post('/api/users')
            .send({
                email: 'sohibul2807@gmail.com',
                username: 'newusername',
                password: 'Sohibul_2807',
                name: 'newname'
            });
        
        logger.info(result.body);
        
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if username alredy registered', async () => {
        let result = await supertest(app)
            .post('/api/users')
            .send({
                email: 'sohibul2807@gmail.com',
                username: 'test',
                password: 'Sohibul_2807',
                name: 'test'
            });

        logger.info(result.body);
        
        expect(result.status).toBe(200);
        expect(result.body.data.email).toBe("sohibul2807@gmail.com");
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined;

        result = await supertest(app)
            .post('/api/users')
            .send({
                email: 'newemail@gmail.com',
                username: 'test',
                password: 'Sohibul_2807',
                name: 'newname'
            });
        
        logger.info(result.body);
        
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

});

describe('POST /api/users/login', function() {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUserLogin();
    });

    it('should can login', async () => {
        const result = await supertest(app)
            .post('/api/users/login')
            .send({
                email: "sohibul2807@gmail.com",
                password: "Sohibul_2807"
            });
        
        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    });

    it('should reject login if request is invalid', async () => {
        const result = await supertest(app)
            .post('/api/users/login')
            .send({
                email: "",
                password: ""
            });
        
        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject login if password is wrong', async () => {
        const result = await supertest(app)
            .post('/api/users/login')
            .send({
                email: "sohibul2807@gmail.com",
                password: "wrong_password"
            });
        
        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject login if email is unregistered', async () => {
        const result = await supertest(app)
            .post('/api/users/login')
            .send({
                email: "unregistered@gmail.com",
                password: "Sohibul_2807"
            });
        
        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject login if username is unregistered', async () => {
        const result = await supertest(app)
            .post('/api/users/login')
            .send({
                username: "unregistered_user",
                password: "Sohibul_2807"
            });
        
        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
})

describe('GET /api/users/current', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUserLogin();
    });

    it('should can get current user', async () => {
        const result = await supertest(app)
            .get('/api/users/current')
            .set('Authorization', 'test');
        
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');
    });

    it('should reject if token is invalid', async () => {
        const result = await supertest(app)
            .get('/api/users/current')
            .set('Authorization', 'wrongToken');
        
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
})

describe('PATCH /api/users/current', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUserLogin();
    });

    it('should can update user', async () => {
        const result = await supertest(app)
            .patch("/api/users/current")
            .set('Authorization', 'test')
            .send({
                email: "newEmail@gmail.com",
                username: "newUsername",
                password: "newPassword",
                name: "newName"
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("newUsername");
        expect(result.body.data.email).toBe("newEmail@gmail.com");
        expect(result.body.data.name).toBe("newName");

        const user = await getTestUser();
        expect(await bcrypt.compare("newPassword", user.password)).toBe(true);
    }, 10000)

    it('should can update user email', async () => {
        const result = await supertest(app)
            .patch("/api/users/current")
            .set('Authorization', 'test')
            .send({
                email: "newEmail@gmail.com",
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.email).toBe("newEmail@gmail.com");
    })

    it('should can update user username', async () => {
        const result = await supertest(app)
            .patch("/api/users/current")
            .set('Authorization', 'test')
            .send({
                username: "newUsername",
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.email).toBe("sohibul2807@gmail.com");
        expect(result.body.data.username).toBe("newUsername");
    }, 10000)

    it('should can update user name', async () => {
        const result = await supertest(app)
            .patch("/api/users/current")
            .set('Authorization', 'test')
            .send({
                name: "newName",
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("newName");
    })

    it('should can update user password', async () => {
        const result = await supertest(app)
            .patch("/api/users/current")
            .set('Authorization', 'test')
            .send({
                password: "newPassword"
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.email).toBe("sohibul2807@gmail.com");
        expect(result.body.data.name).toBe("test");

        const user = await getTestUser();
        expect(await bcrypt.compare("newPassword", user.password)).toBe(true);
    })

    it('should reject if request invalid', async () => {
        const result = await supertest(app)
            .patch("/api/users/current")
            .set('Authorization', 'salah')
            .send({});

        logger.info(result.body);

        expect(result.status).toBe(401);
    })
})

describe.only('DELETE /api/users/logout', function() {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUserRegister();
    });

    it('should can logout', async () => {
        const result = await supertest(app)
            .delete("/api/users/logout")
            .set('Authorization', 'test')

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("berhasil logout");

        const user = await getTestUserLogout();
        expect(user.token).toBeNull();
    });

    // it('sholud reject logout if token is invalid', async () => {
    //     const result = await supertest(app)
    //         .delete("/api/users/logout")
    //         .set('Authorization', 'salah')

    //     logger.info(result.body);

    //     expect(result.status).toBe(401);
    // });
})