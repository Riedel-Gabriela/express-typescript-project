import request from 'supertest';
import { app, Shutdown } from '../../src/server';

describe('Our Application', () => {
  afterAll((done) => {
    Shutdown(done);
  });

  it('Starts and has the proper test environment', async () => {
    expect(process.env.NODE_ENV).toBe('test');
    expect(app).toBeDefined();
  }, 10000);

  it('Returns all options allowed to be called by the server', async () => {
    const response = await request(app).options('/');

    expect(response.status).toBe(200);
    expect(response.headers['access-control-allow-methods']).toBe('GET, POST, PATCH');
  });

  it('Returns a 404 for an unknown route', async () => {
    const response = await request(app).get('/unknown/route');

    expect(response.status).toBe(404);
  });
});
