import { expect, it } from 'vitest'
import App from '../App'
import {render, screen, fireEvent} from '@testing-library/react';

it('should render correctly', () => {
  const result = render(<App />)
  expect(result).toMatchSnapshot()
})
