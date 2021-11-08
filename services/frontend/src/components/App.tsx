import React, { useEffect, useState } from 'react'
import { Container, Flex, Text } from '@chakra-ui/react'

import { GroceryItems } from '../types'
import { Checklist } from './Checklist'

export const App: React.FC = () => {
  const [initialItems, setInitialItems] = useState<GroceryItems | null>(null)

  useEffect(() => {
    fetch('/api/groceries', {
      headers: { accept: 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        // TODO enforce types
        setInitialItems(data.groceries)
      })
      .catch((err) => {
        // TODO surface error message to user via toast
        console.error(err)
      })
  }, [])

  const handleUpdate = (newItems: GroceryItems) => {
    fetch('/api/groceries', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ groceries: newItems }),
    })
      .then((res) => {
        console.log(res.status)
      })
      .catch((err) => {
        // TODO surface error message to user via toast
        console.error(err)
      })

    // TODO debounce so updates are pushed to API only once every n seconds
    // TODO catch beforeUnload to offer "if you exit now, data may not be saved" message
  }

  return (
    <Flex h="100%" w="100%" pt={8} justifyContent="center">
      <Container>
        {initialItems ? (
          <Checklist onUpdate={handleUpdate} initialItems={initialItems} />
        ) : (
          <Text>Loading...</Text>
        )}
      </Container>
    </Flex>
  )
}
