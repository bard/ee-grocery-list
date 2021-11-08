import React, { useState } from 'react'
import './Counter.css'

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0)

  return (
    <button
      className="Counter"
      onClick={() => setCount((count) => count + 1)}
    >
      Count: {count}
    </button>
  )
}
