import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Counter } from './Counter'

test('clicking increases counter', async () => {
  render(<Counter />)

  fireEvent.click(screen.getByRole('button'))

  expect(screen.getByRole('button')).toHaveTextContent('Count: 1')
})

// test('async', async () => {
//   render(<Component />)
//   fireEvent.click(screen.getByText('...'))
//   await waitFor(() => screen.getByText('...'))
// })
