import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProfilePage from './ProfilePage';

describe('Render tests for <ProfilePage />', () => {
  it('renders appropriate content', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>
    );
    expect(getByTestId('profile-page-container').tagName).toBe("DIV");
  });
});
