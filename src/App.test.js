import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { decode } from "jsonwebtoken";
import App from './App';

jest.mock('jsonwebtoken', () => ({
  decode: jest.fn(() => ({ username: "test" }))
}));

describe('<App />', () => {
  it('renders without crashing and authenticates user', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(decode).toHaveBeenCalled();
  });
});
