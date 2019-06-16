import React from 'react';
import { render } from '@testing-library/react';
import SearchForm from './SearchForm';

describe('Render tests for <SearchForm />', () => {
  it('renders appropriate content', () => {
    const { getByTestId } = render(
        <SearchForm />
    );
    expect(getByTestId('search-btn').textContent).toBe("Search");
  });
});
