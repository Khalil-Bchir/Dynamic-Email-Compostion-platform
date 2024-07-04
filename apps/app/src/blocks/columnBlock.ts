import type { Block } from '@/types/block'
import { Type } from '@/constants'
import { v4 as uuidv4 } from 'uuid'

import { downloadImage } from '@/assets/images'

export const columnsBlock: Block = {
  id: uuidv4(),
  type: Type.SECTION,
  tagName: 'mj-section',
  attributes: {
    padding: '20px',
    'css-class': 'Initial-section'
  },
  children: [
    {
      id: uuidv4(),
      type: Type.COLUMN,
      tagName: 'mj-column',
      attributes: {
        'background-color': '#F8FCFF',
        padding: '20px',
        'css-class': 'columnIndex'
      },
      children: [
        {
          id: uuidv4(),
          type: Type.IMAGE,
          tagName: 'mj-image',
          attributes: {
            width: '200px',
            src: downloadImage,
            'css-class': 'Initial-block'
          }
        }
      ]
    }
  ]
}
