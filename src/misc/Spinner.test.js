import React from 'react';
import { render } from '@testing-library/react';
import Spinner from './Spinner';

describe('Render tests for <Spinner />', () => {
  it('renders appropriate content', () => {
    const { getByTestId } = render(
        <Spinner />
    );
    expect(getByTestId('container').tagName).toBe("DIV");
  });
});
