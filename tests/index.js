const App = require('yeps');
const error = require('yeps-error');
const chai = require('chai');
const chaiHttp = require('chai-http');
const http = require('http');
const Router = require('yeps-router');
const mysql = require('..');
const pool = require('../pool');
const expect = chai.expect;

chai.use(chaiHttp);
let app, router;

describe('YEPS mysql test', () => {

    beforeEach(() => {
        app = new App();
        app.all([
            error(),
            mysql(),
        ]);
        router = new Router();
    });

    it('should test middleware', async() => {

        let isTestFinished1 = false;
        let isTestFinished2 = false;

        app.then(async ctx => {

            const connection = await ctx.mysql.getConnection();
            const rows = await connection.query('SELECT 1+1 AS res;');

            ctx.mysql.releaseConnection(connection);

            expect(rows).is.a('array');
            expect(rows.length).to.be.equal(1);
            expect(rows[0]).to.have.property('res');
            expect(rows[0].res).to.exist;
            expect(rows[0].res).to.be.equal(2);

            isTestFinished1 = true;

            ctx.res.writeHead(200);
            ctx.res.end(JSON.stringify(rows[0].res));
        });

        await chai.request(http.createServer(app.resolve()))
            .get('/')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('2');
                isTestFinished2 = true;
            });

        expect(isTestFinished1).is.true;
        expect(isTestFinished2).is.true;
    });

    it('should test router', async() => {

        let isTestFinished1 = false;
        let isTestFinished2 = false;

        router.catch().then(async ctx => {
            const connection = await ctx.mysql.getConnection();
            const rows = await connection.query('SELECT 1+1 AS res;');

            ctx.mysql.releaseConnection(connection);

            expect(rows).is.a('array');
            expect(rows.length).to.be.equal(1);
            expect(rows[0]).to.have.property('res');
            expect(rows[0].res).to.exist;
            expect(rows[0].res).to.be.equal(2);

            isTestFinished1 = true;

            ctx.res.writeHead(200);
            ctx.res.end(JSON.stringify(rows[0].res));
        });

        app.then(router.resolve());

        await chai.request(http.createServer(app.resolve()))
            .get('/')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('2');
                isTestFinished2 = true;
            });

        expect(isTestFinished1).is.true;
        expect(isTestFinished2).is.true;
    });

    it('should test pool', async () => {

        const connection = await pool.getConnection();
        const rows = await connection.query('SELECT 1+1 AS res;');

        pool.releaseConnection(connection);

        expect(rows).is.a('array');
        expect(rows.length).to.be.equal(1);
        expect(rows[0]).to.have.property('res');
        expect(rows[0].res).to.exist;
        expect(rows[0].res).to.be.equal(2);
    });

});
