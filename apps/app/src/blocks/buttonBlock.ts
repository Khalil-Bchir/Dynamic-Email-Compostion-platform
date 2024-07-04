import type { Block } from '@/types/block'
import { Type } from '@/constants'
import { v4 as uuidv4 } from 'uuid'

export const buttonBlock: Block = {
  id: uuidv4(),
  type: Type.COLUMN,
  tagName: 'mj-column',
  attributes: {},
  children: [
    {
      id: uuidv4(),
      type: Type.BUTTON,
      tagName: 'mj-button',
      attributes: {
        'background-color': '#F2A523',
        color: '#ffffff',
        'font-size': '14px',
        'font-weight': 'bold',
        padding: '10px 25px 10px 25px',
        href: 'https://www.google.com',
        cursor: 'pointer',
        'css-class': 'tool-block'
      },
      content: 'Click Me'
    }
  ]
}
