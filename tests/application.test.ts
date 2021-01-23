import chai from 'chai';
import chaiHttp = require('chai-http');
import app from '../src/app'

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /discovery', () => {
	it('?lat=60.1709&lon=24.941 should equal expectedOutput', done => {
		chai
		.request(app)
		.get('/discovery?lat=60.1709&lon=24.941')
		.end((err, res) => {
			chai.should().exist(res.status);
			res.should.have.status(200);
			expect(res.body).to.deep.equal(expectedOutput);
			done();
		});
	});
	it('?lat=60.1709&lon=0 should return empty sections array', done => {
		chai
		.request(app)
		.get('/discovery?lat=60.1709&lon=0')
		.end((err, res) => {
			chai.should().exist(res.status);
			res.should.have.status(200);
			expect(res.body).to.deep.equal({ "sections": [] });
			done();
		});
	});
	it('?lat=0&lon=24.941 should return empty sections array', done => {
		chai
		.request(app)
		.get('/discovery?lat=0&lon=24.941')
		.end((err, res) => {
			chai.should().exist(res.status);
			res.should.have.status(200);
			expect(res.body).to.deep.equal({ "sections": [] });
			done();
		});
	});
	it('?lat=0&lon=0 should return empty sections array', done => {
		chai
		.request(app)
		.get('/discovery?lat=0&lon=0')
		.end((err, res) => {
			chai.should().exist(res.status);
			res.should.have.status(200);
			expect(res.body).to.deep.equal({ "sections": [] });
			done();
		});
	});
	it('?lat=-1&lon=-1 should return empty sections array', done => {
		chai
		.request(app)
		.get('/discovery?lat=-1&lon=-1')
		.end((err, res) => {
			chai.should().exist(res.status);
			res.should.have.status(200);
			expect(res.body).to.deep.equal({ "sections": [] });
			done();
		});
	});
	it('?lat=999999999999999999999999999&lon=999999999999999999999999999 should return empty sections array', done => {
		chai
		.request(app)
		.get('/discovery?lat=999999999999999999999999999&lon=999999999999999999999999999')
		.end((err, res) => {
			chai.should().exist(res.status);
			res.should.have.status(200);
			expect(res.body).to.deep.equal({ "sections": [] });
			done();
		});
	});
	it('?lat=aaaa&lon=bbbb should return empty sections array', done => {
		chai
		.request(app)
		.get('/discovery?lat=aaaa&lon=bbbb')
		.end((err, res) => {
			chai.should().exist(res.status);
			res.should.have.status(200);
			expect(res.body).to.deep.equal({ "sections": [] });
			done();
		});
	});
	it('no parameters should return empty sections array', done => {
		chai
		.request(app)
		.get('/discovery')
		.end((err, res) => {
			chai.should().exist(res.status);
			res.should.have.status(200);
			expect(res.body).to.deep.equal({ "sections": [] });
			done();
		});
	});
	it('only one parameter should return empty sections array', done => {
		chai
		.request(app)
		.get('/discovery?lat=60.1709')
		.end((err, res) => {
			chai.should().exist(res.status);
			res.should.have.status(200);
			expect(res.body).to.deep.equal({ "sections": [] });
			done();
		});
	});
	it('?lat=&lon= should return empty sections array', done => {
		chai
		.request(app)
		.get('/discovery?lat=&lon=')
		.end((err, res) => {
			chai.should().exist(res.status);
			res.should.have.status(200);
			expect(res.body).to.deep.equal({ "sections": [] });
			done();
		});
	});
});

const expectedOutput = {"sections":[{"title":"Popular Restaurants","restaurants":[{"blurhash":"UAN=8k?LS~M:ErJFs%t0MDMWRqo@%BxSV{RX","launch_date":"2020-04-20","location":[24.938082,60.17626],"name":"Sea Chain","online":true,"popularity":0.956990414084132},{"blurhash":"UKB;Mk]|I^oJ1SJD$ebHESNMj[a}-4xBNeWX","launch_date":"2020-10-25","location":[24.949733,60.166172],"name":"Bacon Basket","online":true,"popularity":0.9482709720911751},{"blurhash":"UIEejN}*9|VzGob=wKV{5%S1xaS^r3RVbpxn","launch_date":"2020-06-06","location":[24.92619,60.177111],"name":"Fried Spinach","online":true,"popularity":0.9395215599867948},{"blurhash":"UDSoswyZVqm.p%cRjLaKUgZ+k.kWrFZ%a$kX","launch_date":"2020-11-26","location":[24.938908,60.160413],"name":"Salt","online":true,"popularity":0.8954324472876662},{"blurhash":"UI97ru%EIvocNMa#t2oc0YIvxnR.-hocIvWF","launch_date":"2020-01-20","location":[24.938353,60.172132],"name":"Chili Pepper","online":true,"popularity":0.8934866288893477},{"blurhash":"UNDLy=}iEmRqT1S6nis*7uOnwKW=RDaetKk8","launch_date":"2020-04-15","location":[24.931383,60.172675],"name":"Papas Burger Party","online":true,"popularity":0.8212304387029502},{"blurhash":"UFHIoI^rEURS%xx=nhV]1UJE$wkVU{R7XmtP","launch_date":"2020-10-16","location":[24.92958,60.162341],"name":"Fried Cheese Burger","online":true,"popularity":0.7899445009551945},{"blurhash":"UEPh{Wz}O%r^H5O;rwbbMtR#o#W-#anmSbad","launch_date":"2020-08-07","location":[24.937487,60.17703],"name":"Chocolate","online":true,"popularity":0.7620805718597206},{"blurhash":"UIDbdj=cNuNH%zENWBxZ1Hb]$PkCD6%1ozt6","launch_date":"2020-10-28","location":[24.922481,60.170761],"name":"Tempting Lemon Van","online":true,"popularity":0.7606795592575231},{"blurhash":"UGIf?c^o9-V|EWovxTRpGHOGwHt1m?Vyo[xm","launch_date":"2020-07-19","location":[24.937045,60.161703],"name":"Fried Pineapple","online":true,"popularity":0.7439754745659923}]},{"title":"New Restaurants","restaurants":[{"blurhash":"ULFgVE}sE3bvGNORnUj=A1JCoaniMUj0tMS5","launch_date":"2020-09-24","location":[24.936465,60.178633],"name":"Loving Meat Basket","online":true,"popularity":0.7400471016913404},{"blurhash":"UOC~Pw#,JUo0?Rk9n%oc1PS|w]k9DZs,Szba","launch_date":"2020-09-06","location":[24.932806,60.160777],"name":"Shocking","online":true,"popularity":0.06954263841889538},{"blurhash":"UDSFySu_TUk*qEcEiei|T,X|kXi%mjZ$o#kV","launch_date":"2020-09-25","location":[24.94665,60.172647],"name":"Happy Corn Planet","online":false,"popularity":0.5036221275154465},{"blurhash":"UELnB2~oD*M#L6c4wjWFD6IBpFtPm{Z=jpt1","launch_date":"2020-09-07","location":[24.952036,60.169315],"name":"Fried Pasta","online":false,"popularity":0.47589749120556957}]},{"title":"Nearby Restaurants","restaurants":[{"blurhash":"UBO1xu~SIWNdUWTun6soDVMltPtMU{n5tQR,","launch_date":"2020-04-24","location":[24.942847,60.169778],"name":"Fictive Olive Mafia","online":true,"popularity":0.2233905847654424},{"blurhash":"UI97ru%EIvocNMa#t2oc0YIvxnR.-hocIvWF","launch_date":"2020-01-20","location":[24.938353,60.172132],"name":"Chili Pepper","online":true,"popularity":0.8934866288893477},{"blurhash":"UGB|33~3I;Ic-{%DjcRo0|Ef$%xWIMM-kQxn","launch_date":"2020-11-29","location":[24.93623,60.169935],"name":"Fake Onion","online":true,"popularity":0.23036375831315775},{"blurhash":"UNDVs2}5JWOFFyt2$eRoGZKPniw[VyRoS}t2","launch_date":"2020-05-04","location":[24.945715,60.167827],"name":"Real Pizza Factory","online":true,"popularity":0.5045108175927286},{"blurhash":"UGKp#o@uCO#SLwTIrYkBC~X7rsXRduSgb[nP","launch_date":"2020-11-24","location":[24.950464,60.170267],"name":"Butter Hotel","online":true,"popularity":0.6251161053931533},{"blurhash":"UNB[ly,]JisW%2xHWUju32OTwhSeNGR*s:ju","launch_date":"2020-08-19","location":[24.938521,60.166018],"name":"Fictive Spinach","online":true,"popularity":0.032796935023081085},{"blurhash":"UNDLy=}iEmRqT1S6nis*7uOnwKW=RDaetKk8","launch_date":"2020-04-15","location":[24.931383,60.172675],"name":"Papas Burger Party","online":true,"popularity":0.8212304387029502},{"blurhash":"UAN=8k?LS~M:ErJFs%t0MDMWRqo@%BxSV{RX","launch_date":"2020-04-20","location":[24.938082,60.17626],"name":"Sea Chain","online":true,"popularity":0.956990414084132},{"blurhash":"UHSFWrsTWobEpLX7jajYROWEkCkCZ_n,a$bJ","launch_date":"2020-08-04","location":[24.943179,60.176732],"name":"Awesome Garlic Mafia","online":true,"popularity":0.4964753603220507},{"blurhash":"UBM[YD{FFvO*YBO$RRw6C#K}rracQ_i+x[b[","launch_date":"2020-02-18","location":[24.93755,60.165211],"name":"Pineapple Plus","online":true,"popularity":0.4140474136156465}]}]}