const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');
const { app } = require('../app');
const Todo = require('../models/Todo');

const seedData = [{
  _id: new ObjectID(),
  text: 'First test data'
}, {
  _id: new ObjectID(),
  text: 'Second test data'
}, {
  _id: new ObjectID(),  
  text: 'Third test data'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(seedData);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((err) => done(err));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(3);
          done();
        }).catch((err) => done(err));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.doc.length).toBe(3)
      })
      .end(done);
  });
});

describe('GET /todos/id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${seedData[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(seedData[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var hexID = new ObjectID().toHexString();
    
    request(app)
      .get(`/todos/${hexID}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if todo non-object ids', (done) => {
    request(app)
      .get(`/todos/123abc`)
      .expect(404)
      .end(done);
  });

});