import type { Block } from '@/types/block'
import { Type } from '@/constants'
import { v4 as uuidv4 } from 'uuid'

import { downloadImage } from '@/assets/images'

export const pageBlock: Block = {
  id: uuidv4(),
  type: Type.PAGE,
  tagName: 'mjml',
  children: [
    {
      id: uuidv4(),
      type: Type.HEAD,
      tagName: 'mj-head',
      children: []
    },
    {
      id: uuidv4(),
      type: Type.BODY,
      tagName: 'mj-body',
      attributes: {},
      children: [
        {
          id: uuidv4(),
          type: Type.SECTION,
          tagName: 'mj-section',
          attributes: {
            'padding-top': '20px'
          },
          children: [
            {
              id: uuidv4(),
              type: Type.GROUP,
              tagName: 'mj-group',
              attributes: {},
              children: [
                {
                  id: uuidv4(),
                  type: Type.COLUMN,
                  tagName: 'mj-column',
                  attributes: {
                    'background-color': '#F8FCFF'
                  },
                  children: [
                    {
                      id: uuidv4(),
                      type: Type.IMAGE,
                      tagName: 'mj-image',
                      attributes: {
                        width: '100px',
                        src: downloadImage
                      }
                    },
                    {
                      id: uuidv4(),
                      type: Type.TEXT,
                      tagName: 'mj-text',
                      attributes: {
                        'font-size': '20px',
                        color: '#249DF5',
                        'font-family': 'helvetica',
                        align: 'center'
                      },
                      content: 'Drop Content Here'
                    }
                  ]
                },
                {
                  id: uuidv4(),
                  type: Type.COLUMN,
                  tagName: 'mj-column',
                  attributes: {
                    'background-color': '#F8FCFF'
                  },
                  children: [
                    {
                      id: uuidv4(),
                      type: Type.IMAGE,
                      tagName: 'mj-image',
                      attributes: {
                        width: '100px',
                        src: downloadImage
                      }
                    },
                    {
                      id: uuidv4(),
                      type: Type.TEXT,
                      tagName: 'mj-text',
                      attributes: {
                        'font-size': '20px',
                        color: '#249DF5',
                        'font-family': 'helvetica',
                        align: 'center'
                      },
                      content: 'Drop Content Here'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: uuidv4(),
          type: Type.SECTION,
          tagName: 'mj-section',
          children: [
            {
              id: uuidv4(),
              type: Type.GROUP,
              tagName: 'mj-group',
              children: [
                {
                  id: uuidv4(),
                  type: Type.COLUMN,
                  tagName: 'mj-column',
                  attributes: {
                    'background-color': '#F8FCFF'
                  },
                  children: [
                    {
                      id: uuidv4(),
                      type: Type.IMAGE,
                      tagName: 'mj-image',
                      attributes: {
                        width: '100px',
                        src: downloadImage
                      }
                    },
                    {
                      id: uuidv4(),
                      type: Type.TEXT,
                      tagName: 'mj-text',
                      attributes: {
                        'font-size': '20px',
                        color: '#249DF5',
                        'font-family': 'helvetica',
                        align: 'center' // Align text to center
                      },
                      content: 'Drop Content Here'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: uuidv4(),
          type: Type.SECTION,
          tagName: 'mj-section',
          attributes: {
            'padding-top': '20px'
          },
          children: [
            {
              id: uuidv4(),
              type: Type.GROUP,
              tagName: 'mj-group',
              attributes: {},
              children: [
                {
                  id: uuidv4(),
                  type: Type.COLUMN,
                  tagName: 'mj-column',
                  attributes: {
                    'background-color': '#F8FCFF'
                  },
                  children: [
                    {
                      id: uuidv4(),
                      type: Type.IMAGE,
                      tagName: 'mj-image',
                      attributes: {
                        width: '100px',
                        src: downloadImage
                      }
                    },
                    {
                      id: uuidv4(),
                      type: Type.TEXT,
                      tagName: 'mj-text',
                      attributes: {
                        'font-size': '20px',
                        color: '#249DF5',
                        'font-family': 'helvetica',
                        align: 'center' // Align text to center
                      },
                      content: 'Drop Content Here'
                    }
                  ]
                },
                {
                  id: uuidv4(),
                  type: Type.COLUMN,
                  tagName: 'mj-column',
                  attributes: {
                    'background-color': '#F8FCFF'
                  },
                  children: [
                    {
                      id: uuidv4(),
                      type: Type.IMAGE,
                      tagName: 'mj-image',
                      attributes: {
                        width: '100px',
                        src: downloadImage
                      }
                    },
                    {
                      id: uuidv4(),
                      type: Type.TEXT,
                      tagName: 'mj-text',
                      attributes: {
                        'font-size': '20px',
                        color: '#249DF5',
                        'font-family': 'helvetica',
                        align: 'center' // Align text to center
                      },
                      content: 'Drop Content Here'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
