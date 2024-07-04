import type { Block } from '@/types/block'
import { Type } from '@/constants'
import { v4 as uuidv4 } from 'uuid'

export const createImageBlock: Block = {
  id: uuidv4(),
  type: Type.COLUMN,
  tagName: 'mj-column',
  attributes: {},
  children: [
    {
      id: '',
      type: Type.IMAGE,
      tagName: 'mj-image',
      attributes: {
        width: '400px',
        src: '',
        'css-class': 'image-block'
      }
    }
  ]
}
