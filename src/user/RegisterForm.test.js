import React from 'react';
import { render } from '@testing-library/react';
import RegisterForm from './RegisterForm';

describe('Render tests for <RegisterForm />', () => {
  it('renders appropriate content', () => {
    const { getByTestId } = render(
        <RegisterForm />
    );
    expect(getByTestId('submit-btn').textContent).toBe("Submit");
  });
});
