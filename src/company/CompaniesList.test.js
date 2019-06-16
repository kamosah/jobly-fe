import React from 'react';
import { render } from '@testing-library/react';
import CompaniesList from './CompaniesList';

describe('Render tests for <CompaniesList />', () => {
  it('renders appropriate content', () => {
    const { getByTestId } = render(
      <CompaniesList />
    );
    expect(getByTestId('companies-list-container').tagName).toBe("DIV");
  });
});
