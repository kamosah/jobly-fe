import React from 'react';
import { render } from '@testing-library/react';
import JobsList from './JobsList';

describe('Render tests for <JobsList />', () => {
  it('renders appropriate content', () => {
    const { getByTestId } = render(
      <JobsList />
    );
    expect(getByTestId('content-container').tagName).toBe("DIV");
  });
});
