import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EditProfileForm from './EditProfileForm';

describe('Render tests for <EditProfileForm />', () => {
  it('renders appropriate content', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <EditProfileForm />
      </BrowserRouter>
    );
    expect(getByTestId('update-btn').textContent).toBe("Update");
  });
});
