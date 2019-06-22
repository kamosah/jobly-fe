import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CompanyListItem from './CompanyListItem';

describe('Render tests for <CompanyListItem />', () => {
  it('renders appropriate content', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <CompanyListItem />
      </BrowserRouter>
    );
    expect(getByTestId('company-name').textContent).toBe("name");
  });
});
