/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Block } from '@/types/block'
import { Type } from '@/constants'
import { v4 as uuidv4 } from 'uuid'

export const twoColumnsBlock: Block = {
  id: uuidv4(),
  type: Type.SECTION,
  tagName: 'mj-section',
  attributes: {
    padding: '20px 0px 20px 0px',
    'background-repeat': 'repeat',
    'background-size': 'auto',
    'background-position': 'top center',
    border: 'none',
    direction: 'ltr',
    'text-align': 'center'
  },
  children: [
    {
      id: uuidv4(),
      type: Type.COLUMN,
      tagName: 'mj-column',
      attributes: {
        width: '50%'
      },
      children: []
    },
    {
      id: uuidv4(),
      type: Type.COLUMN,
      tagName: 'mj-column',
      attributes: {
        width: '50%'
      },
      children: []
    }
  ]
}
