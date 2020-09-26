// Imports
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const db = require('../database/mySqlDb');
const User = require("../models/user");
const users = require('./data/users').users;

// Configure chai
chai.use(chaiHttp);

describe("Users", function() {
    before(function(done) {
        users.forEach(function(user) {
            db.query((new User(user)).addUser(), (error, result) => {
                // Check for error
                if (error) {
                    console.log("Error while populating database:");
                    console.log(error);
                    done(error);
                    return;
                } else {
                    console.log("Query successful:");
                }
            });
        });
        done(null);
    });

    after(function(done) {
        const sql_drop_table = "DROP TABLE IF EXISTS users;"
        db.query(sql_drop_table, (error, result) => {
            // Check for error
            if (error) {
                console.log("Error while dropping table:");
                console.log(error);
            } else {
                console.log("Drop successful.");
                const sql_create_table = "CREATE TABLE users ( username VARCHAR(255) PRIMARY KEY, password VARCHAR(255), firstname VARCHAR(255),lastname VARCHAR(255), mobile INTEGER);";
                db.query(sql_create_table, (error, result) => {
                    // Check for error
                    if (error) {
                        console.log("Error while creating table:");
                        console.log(error);
                        done(error);
                    } else {
                        console.log("Table Created.");
                        done(null);
                    }
                });
            }
        });

        
    })

    describe("GET /", () => {
        it("should get all users record", function(done) {
            chai.request(app)
                .get('/api/user')
                .end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.a('object');
                    done();
                });
        });
        
        // Test to get single user record
        it("should get a single user record", function(done) {
            const username = "johndoe123";
            chai.request(app)
                .get(`/api/user/${username}`)
                .end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body).to.be.a('object');
                    done();
                });
        });
        
        // Test to get single user record
        it("should not get a single student record", function(done) {
            const username = "notjohndoe123";
            chai.request(app)
                .get(`/api/user/${username}`)
                .end((err, res) => {
                    chai.expect(res).to.have.status(404);
                    done();
                });
        });
    });
});