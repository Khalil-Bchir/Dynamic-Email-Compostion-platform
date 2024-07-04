import type { Block } from '@/types/block'
import { Type } from '@/constants'
import { v4 as uuidv4 } from 'uuid'

import { downloadImage } from '@/assets/images'

export const mjmlDocument: Block = {
  id: uuidv4(),
  type: Type.PAGE,
  tagName: 'mjml',
  children: [
    {
      id: uuidv4(),
      type: Type.HEAD,
      tagName: 'mj-head',
      children: [
        {
          id: uuidv4(),
          type: Type.HTML_ATTRIBUTES,
          tagName: 'mj-html-attributes',
          children: [
            {
              id: uuidv4(),
              type: Type.SELECTOR,
              tagName: 'mj-selector',
              attributes: {
                path: '.group-part'
              },
              children: [
                {
                  id: uuidv4(),
                  tagName: 'mj-html-attribute',
                  type: Type.ATTRIBUTES,
                  attributes: {
                    name: 'id'
                  },
                  content: 'column'
                }
              ]
            },
            {
              id: uuidv4(),
              type: Type.SELECTOR,
              tagName: 'mj-selector',
              attributes: {
                path: '.tool-block div'
              },
              children: [
                {
                  id: uuidv4(),
                  tagName: 'mj-html-attribute',
                  type: Type.ATTRIBUTES,
                  attributes: {
                    name: 'id'
                  },
                  content: 'text'
                }
              ]
            },
            {
              id: uuidv4(),
              type: Type.SELECTOR,
              tagName: 'mj-selector',
              attributes: {
                path: '.tool-block p'
              },
              children: [
                {
                  id: uuidv4(),
                  tagName: 'mj-html-attribute',
                  type: Type.ATTRIBUTES,
                  attributes: {
                    name: 'id'
                  },
                  content: 'button'
                }
              ]
            },
            {
              id: uuidv4(),
              type: Type.SELECTOR,
              tagName: 'mj-selector',
              attributes: {
                path: '.tool-block a'
              },
              children: [
                {
                  id: uuidv4(),
                  tagName: 'mj-html-attribute',
                  type: Type.ATTRIBUTES,
                  attributes: {
                    name: 'id'
                  },
                  content: 'button'
                }
              ]
            },
            {
              id: uuidv4(),
              type: Type.SELECTOR,
              tagName: 'mj-selector',
              attributes: {
                path: '.image-block img'
              },
              children: [
                {
                  id: uuidv4(),
                  tagName: 'mj-html-attribute',
                  type: Type.ATTRIBUTES,
                  attributes: {
                    name: 'id'
                  },
                  content: 'image'
                }
              ]
            },
            {
              id: uuidv4(),
              type: Type.SELECTOR,
              tagName: 'mj-selector',
              attributes: {
                path: '.image-block img'
              },
              children: [
                {
                  id: uuidv4(),
                  tagName: 'mj-html-attribute',
                  type: Type.ATTRIBUTES,
                  attributes: {
                    name: 'crossorigin'
                  },
                  content: 'anonymous'
                }
              ]
            },
            {
              id: uuidv4(),
              type: Type.SELECTOR,
              tagName: 'mj-selector',
              attributes: {
                path: '.Initial-block img'
              },
              children: [
                {
                  id: uuidv4(),
                  tagName: 'mj-html-attribute',
                  type: Type.ATTRIBUTES,
                  attributes: {
                    name: 'crossorigin'
                  },
                  content: 'anonymous'
                }
              ]
            }
          ]
        }
      ]
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
            padding: '20px',
            'css-class': 'Initial-section'
          },
          children: [
            {
              id: uuidv4(),
              type: Type.COLUMN,
              tagName: 'mj-column',
              attributes: {
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
        },
        {
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
              type: Type.GROUP,
              tagName: 'mj-group',
              attributes: {
                padding: '20px'
              },
              children: [
                {
                  id: uuidv4(),
                  type: Type.COLUMN,
                  tagName: 'mj-column',
                  attributes: {
                    'css-class': 'columnIndex',
                    padding: '20px'
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
          ]
        },
        {
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
              type: Type.GROUP,
              tagName: 'mj-group',
              attributes: {
                padding: '20px'
              },
              children: [
                {
                  id: uuidv4(),
                  type: Type.COLUMN,
                  tagName: 'mj-column',
                  attributes: {
                    'css-class': 'columnIndex',
                    padding: '20px'
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
          ]
        }
      ]
    }
  ]
}
