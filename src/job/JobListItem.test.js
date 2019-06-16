import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import JobListItem from './JobListItem';

describe('Render tests for <JobListItem />', () => {
  it('renders appropriate content', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <JobListItem />
      </BrowserRouter>
    );
    expect(getByTestId('company-name').textContent).toBe("name");
  });
});
