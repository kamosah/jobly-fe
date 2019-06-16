import React from 'react';
import { render } from '@testing-library/react';
import NotFound from './NotFound';

describe('Render tests for <NotFound />', () => {
  it('renders appropriate content', () => {
    const { getByTestId } = render(
        <NotFound />
    );
    expect(getByTestId('not-found').textContent).toBe("Page Not Found");
  });
});
