import React from 'react';
import { render } from '@testing-library/react';
import Alert from './Alert';

describe('Render tests for <Alert />', () => {
  it('renders appropriate content', () => {
    const { getByTestId } = render(
      <Alert />
    );
    expect(getByTestId('error').textContent).toBe("error");
  });
});
