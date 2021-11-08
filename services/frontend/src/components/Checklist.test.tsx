import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { Checklist } from './Checklist'

describe('CheckList', () => {
  const TEST_DATA = [{ title: 'Fruit', checked: false }]

  test('renders items', async () => {
    render(<Checklist initialItems={TEST_DATA} />)

    expect(screen.getByText('Fruit')).toBeInTheDocument()
  })

  test('allows removing items', async () => {
    render(<Checklist initialItems={TEST_DATA} />)

    fireEvent.click(screen.getByTestId('remove-0'))

    expect(screen.queryByText('Fruit')).toBeNull()
  })

  test('allows adding items', async () => {
    render(<Checklist initialItems={TEST_DATA} />)

    fireEvent.click(screen.getByText('Add item'))

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('Enter new item'),
      ).toBeInTheDocument()
    })

    userEvent.type(screen.getByPlaceholderText('Enter new item'), 'Milk')

    fireEvent.click(screen.getByLabelText('Accept'))

    expect(screen.getByText('Milk')).toBeInTheDocument()

    expect(
      screen.queryByPlaceholderText('Enter new item'),
    ).not.toBeInTheDocument()
  })

  test.todo('prevents adding empty items')
})
