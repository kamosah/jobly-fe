import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import CompanyListItem from './CompanyListItem';

describe('Render tests for <CompanyListItem />', () => {
  it('renders appropriate content', () => {
    const { container } = render(
      <MemoryRouter>
        <CompanyListItem />
      </MemoryRouter>
    );
    expect(container.querySelector('img').alt).toBe('handle');
    expect(container.querySelector('h5').textContent).toBe('name');
    expect(container.querySelector('p').textContent).toBe('description');
  });
});
