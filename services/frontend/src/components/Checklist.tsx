import React, { useState } from 'react'
import {
  Icon,
  IconButton,
  Checkbox,
  HStack,
  ListItem,
  List,
  Text,
  Button,
  Input,
} from '@chakra-ui/react'
import { DeleteIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'

import { GroceryItems } from '../types'

export const Checklist: React.FC<{
  initialItems: GroceryItems
  onUpdate?: (newItems: GroceryItems) => void
}> = ({ initialItems, onUpdate }) => {
  const [items, setItems] = useState(initialItems)
  const [isEnteringNewItem, setIsEnteringNewItem] = useState(false)
  const [newItemTitle, setNewItemTitle] = useState<string>('')
  // TODO factor out total for display outside
  const [total, setTotal] = useState(0)

  const updateTotal = () => {
    setTotal(items.reduce((acc, item) => acc + (item.price ?? 0), 0))
  }

  const handleBeginEnteringNewItem = () => {
    setIsEnteringNewItem(true)
  }

  const handleRemove = (index: number) => {
    const newItems = items.filter((item, i) => i !== index)
    setItems(newItems)
    updateTotal()
    if (onUpdate) onUpdate(newItems)
  }

  const handleCancelNewItem = () => {
    setNewItemTitle('')
    setIsEnteringNewItem(false)
  }

  const handleAcceptNewItem = () => {
    const newItems = [
      ...items,
      { title: newItemTitle, checked: false, price: null },
    ]
    setItems(newItems)
    setNewItemTitle('')
    setIsEnteringNewItem(false)
    if (onUpdate) onUpdate(newItems)
  }

  // TODO handleNewItemKeyPress (accept on Return)

  const handleToggleItem = (index: number) => {
    const newItems = items.map((item, i) =>
      index === i ? { ...item, checked: !item.checked } : item,
    )
    setItems(newItems)
    updateTotal()
    if (onUpdate) onUpdate(newItems)
  }

  const handlePriceChange = (index: number, input: string) => {
    // TODO validate input according also to locale

    const parsedPrice = input.trim() === '' ? null : parseInt(input, 10)

    setItems((items) =>
      items.map((item, i) =>
        i === index
          ? {
              ...item,
              price: parsedPrice,
            }
          : item,
      ),
    )

    updateTotal()
  }

  return (
    <List spacing={3} w="100%">
      {items.map((item, i) => (
        <ListItem key={i}>
          <HStack>
            <Checkbox
              size="lg"
              onChange={() => handleToggleItem(i)}
              isChecked={item.checked}
              data-testid={'check-' + i}
            />
            <Text
              flex={1}
              as="span"
              textDecoration={item.checked ? 'line-through' : undefined}
            >
              {item.title}
            </Text>
            <Input
              data-testid={'price-' + i}
              onChange={(e) => handlePriceChange(i, e.target.value)}
              value={item.price === null ? '' : item.price}
            />
            <IconButton
              aria-label="Remove"
              onClick={() => handleRemove(i)}
              data-testid={'remove-' + i}
              icon={<Icon as={DeleteIcon} />}
            />
          </HStack>
        </ListItem>
      ))}

      {isEnteringNewItem && (
        <ListItem>
          <HStack>
            <Input
              value={newItemTitle}
              onChange={(e) => setNewItemTitle(e.currentTarget.value)}
              flex={1}
              autoFocus
              placeholder="Enter new item"
            />
            <IconButton
              aria-label="Accept"
              icon={<Icon as={CheckIcon} />}
              colorScheme="blue"
              onClick={handleAcceptNewItem}
            />
            <IconButton
              aria-label="Cancel"
              icon={<Icon as={CloseIcon} />}
              onClick={handleCancelNewItem}
            />
          </HStack>
        </ListItem>
      )}

      <ListItem>
        <Text data-testid="total">{total}</Text>
      </ListItem>

      <ListItem>
        <Button isFullWidth onClick={handleBeginEnteringNewItem}>
          Add item
        </Button>
      </ListItem>
    </List>
  )
}
