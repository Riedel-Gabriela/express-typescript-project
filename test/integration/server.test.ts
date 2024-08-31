import request from 'supertest';
import { application, Shutdown } from '../../src/server';

describe('Application', () => {
  afterAll((done) => {
    Shutdown(done);
  });

  it('Starts and has the proper test environment', async () => {
    expect(process.env.NODE_ENV).toBe('test');
    expect(application).toBeDefined();
  }, 10000);

  it('Returns a 404 for an unknown route', async () => {
    const response = await request(application).get('/unknown/route');

    expect(response.status).toBe(404);
  }, 10000);
});
