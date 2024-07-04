import type { Block } from '@/types/block'
import { Type } from '@/constants'
import { v4 as uuidv4 } from 'uuid'

export const textBlock: Block = {
  id: uuidv4(),
  type: Type.COLUMN,
  tagName: 'mj-column',
  attributes: {},
  children: [
    {
      id: uuidv4(),
      type: Type.TEXT,
      tagName: 'mj-text',
      attributes: {
        'css-class': 'tool-block'
      },
      content: 'Your text content here'
    }
  ]
}
