// src/mocks/handlers.js
import { rest } from 'msw';
import { mockProfiles } from '../utils/mockData';

export const handlers = [
  rest.get('/api/profiles', (req, res, ctx) => {
    return res(
      ctx.delay(150),
      ctx.json(mockProfiles)
    );
  }),
];