import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';

describe('Render tests for <NavBar />', () => {
  it('renders appropriate content', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    expect(getByTestId('login').textContent).toBe("Login");
  });
});
