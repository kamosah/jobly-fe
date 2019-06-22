import React from 'react';
import { render } from '@testing-library/react';
import PaginateNav from './PaginateNav';

describe('Render tests for <PaginateNav />', () => {
  it('renders appropriate content', () => {
    const { getByTestId } = render(
        <PaginateNav />
    );
    expect(getByTestId('page').textContent).toBe("0");
  });
});
