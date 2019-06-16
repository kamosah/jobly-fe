import React from 'react';
import { render } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('Render tests for <LoginForm />', () => {
  it('renders appropriate content', () => {
    const { getByTestId } = render(
        <LoginForm />
    );
    expect(getByTestId('submit-btn').textContent).toBe("Submit");
  });
});
