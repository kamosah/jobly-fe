import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';

describe('Render tests for <HomePage />', () => {
  it('renders appropriate content', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(getByTestId('login').textContent).toBe("Login");
  });
});
