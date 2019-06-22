import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CompanyPage from './CompanyPage';

describe('Render tests for <CompanyPage />', () => {
  it('renders appropriate content', () => {
    const { getByTestId, debug } = render(
      <CompanyPage />
    );
    // debug();
    expect(getByTestId('content-container').tagName).toBe("DIV");
  });
});
