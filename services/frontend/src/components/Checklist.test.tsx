import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { Checklist } from './Checklist'

describe('CheckList', () => {
  const TEST_DATA = [{ title: 'Fruit', checked: false, price: null }]

  test('renders items', async () => {
    render(<Checklist initialItems={TEST_DATA} />)

    expect(screen.getByText('Fruit')).toBeInTheDocument()
    expect(screen.getByTestId('price-0')).toHaveValue('')
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

  test('edit an item price', () => {
    render(<Checklist initialItems={TEST_DATA} />)

    // TODO remember to take into accountlocale at some point
    userEvent.type(screen.getByTestId('price-0'), '2')

    expect(screen.getByTestId('price-0')).toHaveValue('2')

    expect(screen.getByTestId('total')).toHaveValue('2')
  })

  test.todo('prevents adding empty items')
})
