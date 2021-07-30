import { tsExternalModuleReference } from '@babel/types';
import request from 'supertest';
import { app } from '../../app';

it('returns a 400 with missing email and password', async () => {
  return await request(app).post('/api/users/signin').send({}).expect(400);
});

it('returns a 400 with an invalid email', async () => {
  return await request(app)
    .post('/api/users/signin')
    .send({
      email: 'matheus',
      password: 'password',
    })
    .expect(400);
});

it('fails when a email that does not existe is dupplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('fails when an incorrect password is suplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'incorrect',
    })
    .expect(400);
});

it('responds with a cookie when given valid credencials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
