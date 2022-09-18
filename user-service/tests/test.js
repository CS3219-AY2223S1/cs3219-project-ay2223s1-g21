import chai from "chai";
import chaiHttp from "chai-http";

import app from "../index.js";

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// Configure chai
chai.use(chaiHttp);
chai.should();

//Set up in memory db
beforeEach(async() => {     
    const mongoServer = await MongoMemoryServer.create({ instance: { storageEngine: 'wiredTiger'} });
    mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
});

//Tear down in memory db
after(async function () {
    const collections = await mongoose.connection.db.collections()
  
    for (let collection of collections) {
      await collection.drop();
    }
})

const email = "test@gmail.com";
const password = "test1A";
const newPassword = "test1B";
let accessToken = "";
let id = "";

describe("POST /api/user/signup", () => {
    it("valid user1", (done) => {
        chai.request(app)
            .post('/api/user/signup')
            .send({ "email": email, "password": password })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    it("valid user2", (done) => {
        chai.request(app)
            .post('/api/user/signup')
            .send({ "email": email + "2", "password": password })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    it("duplicate user1", (done) => {
        chai.request(app)
            .post('/api/user/signup')
            .send({ "email": email, "password": password })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it("invalid password", (done) => {
        chai.request(app)
            .post('/api/user/signup')
            .send({ "email": email, "password": "12345" })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it("missing password", (done) => {
        chai.request(app)
            .post('/api/user/signup')
            .send({ "email": email })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it("missing email", (done) => {
        chai.request(app)
            .post('/api/user/signup')
            .send({ "password": password })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});

describe("POST /api/user/login", () => {
    it("valid user1", (done) => {
        chai.request(app)
            .post('/api/user/login')
            .send({ "email": email, "password": password })
            .end((err, res) => {
                res.should.have.status(200);
                accessToken = res.body.token;
                id = res.body.id;
                done();
            });
    });

    it("invalid user1 password", (done) => {
        chai.request(app)
            .post('/api/user/login')
            .send({ "email": email, "password": password + "1" })
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it("invalid email", (done) => {
        chai.request(app)
            .post('/api/user/login')
            .send({ "email": email + "1", "password": password })
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    it("missing email", (done) => {
        chai.request(app)
            .post('/api/user/login')
            .send({ "password": password })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it("missing password", (done) => {
        chai.request(app)
            .post('/api/user/login')
            .send({ "email": email })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});

describe("POST /api/user/logout", () => {
    it("valid logout", (done) => {
        chai.request(app)
            .post('/api/user/logout')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

describe("POST /api/user/login", () => {
    it("valid user1 login after logout", (done) => {
        chai.request(app)
            .post('/api/user/login')
            .send({ "email": email, "password": password })
            .end((err, res) => {
                res.should.have.status(200);
                accessToken = res.body.token;
                id = res.body.id;
                done();
            });
    });
});

describe("POST /api/user/changepassword", () => {
    it("missing password", (done) => {
        chai.request(app)
            .put('/api/user/changepassword')
            .set({ "access-token": accessToken })
            .send({ "newPassword": newPassword, "reNewPassword": newPassword, "id": id })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it("missing newPassword", (done) => {
        chai.request(app)
            .put('/api/user/changepassword')
            .set({ "access-token": accessToken })
            .send({ "currentPassword": password, "reNewPassword": newPassword, "id": id })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it("missing reNewPassword", (done) => {
        chai.request(app)
            .put('/api/user/changepassword')
            .set({ "access-token": accessToken })
            .send({ "currentPassword": password, "newPassword": newPassword, "id": id })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it("missing id", (done) => {
        chai.request(app)
            .put('/api/user/changepassword')
            .set({ "access-token": accessToken })
            .send({ "currentPassword": password, "newPassword": newPassword, "reNewPassword": newPassword })
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
    });

    it("missing token", (done) => {
        chai.request(app)
            .put('/api/user/changepassword')
            .send({ "currentPassword": password, "newPassword": newPassword, "reNewPassword": newPassword, "id": id })
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
    });

    it("invalid token", (done) => {
        chai.request(app)
            .put('/api/user/changepassword')
            .set({ "access-token": accessToken + "1"})
            .send({ "currentPassword": password, "newPassword": newPassword, "reNewPassword": newPassword, "id": id })
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it("valid token, invalid id", (done) => {
        chai.request(app)
            .put('/api/user/changepassword')
            .set({ "access-token": accessToken })
            .send({ "currentPassword": password, "newPassword": newPassword, "reNewPassword": newPassword, "id": id + "1" })
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it("valid user1 different reNewPassword", (done) => {
        chai.request(app)
            .put('/api/user/changepassword')
            .set({ "access-token": accessToken })
            .send({ "currentPassword": password, "newPassword": newPassword, "reNewPassword": newPassword + "1", "id": id })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it("valid user1 identical changed password", (done) => {
        chai.request(app)
            .put('/api/user/changepassword')
            .set({ "access-token": accessToken })
            .send({ "currentPassword": password, "newPassword": password, "reNewPassword": password, "id": id })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it("valid user1 invalid password", (done) => {
        chai.request(app)
            .put('/api/user/changepassword')
            .set({ "access-token": accessToken })
            .send({ "currentPassword": password + "1", "newPassword": newPassword, "reNewPassword": newPassword, "id": id })
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });
    
    it("valid user1 change password", (done) => {
        chai.request(app)
            .put('/api/user/changepassword')
            .set({ "access-token": accessToken })
            .send({ "currentPassword": password, "newPassword": newPassword, "reNewPassword": newPassword, "id": id })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

describe("POST /api/user/login", () => {
    it("invalid user1 login with old password", (done) => {
        chai.request(app)
            .post('/api/user/login')
            .send({ "email": email, "password": password })
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it("valid user1 login with new password", (done) => {
        chai.request(app)
            .post('/api/user/login')
            .send({ "email": email, "password": newPassword })
            .end((err, res) => {
                res.should.have.status(200);
                accessToken = res.body.token;
                id = res.body.id;
                done();
            });
    });
});

describe("POST /api/user/delete", () => {

    it("missing id, valid token", (done) => {
        chai.request(app)
            .delete('/api/user/delete')
            .set({ "access-token": accessToken })
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
    });

    it("valid user1 id, missing token", (done) => {
        chai.request(app)
            .delete('/api/user/delete')
            .send({ "id": id })
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
    });

    it("valid user1 id, invalid token", (done) => {
        chai.request(app)
            .delete('/api/user/delete')
            .set({ "access-token": accessToken + "1" })
            .send({ "id": id })
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it("invalid user1 id, valid token", (done) => {
        chai.request(app)
            .delete('/api/user/delete')
            .set({ "access-token": accessToken })
            .send({ "id": id + "1" })
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it("valid user1 id, valid token", (done) => {
        chai.request(app)
            .delete('/api/user/delete')
            .set({ "access-token": accessToken })
            .send({ "id": id })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

describe("POST /api/user/login", () => {
    it("invalid user1 login after deletion", (done) => {
        chai.request(app)
            .post('/api/user/login')
            .send({ "email": email, "password": password })
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});
