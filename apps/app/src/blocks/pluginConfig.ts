import type { PluginConfig } from '@/types/block'

export const pluginConfig: PluginConfig = {
  sectors: [
    {
      name: 'Dimension',
      open: false,
      buildProps: [
        'width',
        'height',
        'max-width',
        'min-height',
        'margin',
        'padding',
        'vertical-align'
      ],
      properties: [
        {
          name: 'Margin',
          property: 'margin',
          properties: [
            { name: 'Top', property: 'margin-top', value: '0px' },
            { name: 'Right', property: 'margin-right', value: '0px' },
            { name: 'Bottom', property: 'margin-bottom', value: '0px' },
            { name: 'Left', property: 'margin-left', value: '0px' }
          ]
        },
        {
          name: 'Padding',
          property: 'padding',
          detached: true,
          properties: [
            { name: 'Top', property: 'padding-top', value: '0px' },
            { name: 'Right', property: 'padding-right', value: '0px' },
            { name: 'Bottom', property: 'padding-bottom', value: '0px' },
            { name: 'Left', property: 'padding-left', value: '0px' }
          ]
        },
        {
          name: 'Vertical Align',
          property: 'vertical-align',
          type: 'select',
          list: [
            { value: 'top', name: 'Top' },
            { value: 'middle', name: 'Middle' },
            { value: 'bottom', name: 'Bottom' }
          ],
          value: 'top'
        }
      ]
    },
    {
      name: 'Typography',
      open: false,
      buildProps: [
        'font-family',
        'font-size',
        'font-weight',
        'letter-spacing',
        'color',
        'line-height',
        'text-align',
        'align',
        'text-decoration',
        'font-style'
      ],
      properties: [
        { name: 'Font', property: 'font-family', value: 'Arial, sans-serif' },
        { name: 'Weight', property: 'font-weight', value: 'normal' },
        { name: 'Font color', property: 'color', value: '#000000' },
        { name: 'Font size', property: 'font-size', value: '' },
        {
          name: 'Text Align',
          property: 'text-align',
          type: 'radio',
          defaults: 'left',
          list: [
            { value: 'left', name: 'Left' },
            { value: 'center', name: 'Center' },
            { value: 'right', name: 'Right' },
            { value: 'justify', name: 'Justify' }
          ],
          value: 'left'
        },
        {
          name: 'Align',
          property: 'align',
          type: 'radio',
          defaults: 'left',
          list: [
            { value: 'left', name: 'Left' },
            { value: 'center', name: 'Center' },
            { value: 'right', name: 'Right' },
            { value: 'justify', name: 'Justify' }
          ],
          value: 'left'
        },
        {
          name: 'Text Decoration',
          property: 'text-decoration',
          type: 'radio',
          defaults: 'none',
          list: [
            { value: 'none', name: 'None' },
            { value: 'underline', name: 'Underline' },
            { value: 'line-through', name: 'Line-through' }
          ],
          value: 'none'
        },
        {
          name: 'Font Style',
          property: 'font-style',
          type: 'radio',
          defaults: 'normal',
          list: [
            { value: 'normal', name: 'Normal' },
            { value: 'italic', name: 'Italic' }
          ],
          value: 'normal'
        }
      ]
    },
    {
      name: 'Decorations',
      open: false,
      buildProps: [
        'background-color',
        'container-background-color',
        'background-url',
        'background-repeat',
        'background-size',
        'border-radius',
        'border'
      ],
      properties: [
        {
          name: 'Background color',
          property: 'container-background-color',
          type: 'color',
          value: '#ffffff'
        },
        { name: 'Background url', property: 'background-url', type: 'file', value: '' },
        {
          name: 'Border Radius',
          property: 'border-radius',
          properties: [
            { name: 'Top', property: 'border-top-left-radius', value: '0px' },
            { name: 'Right', property: 'border-top-right-radius', value: '0px' },
            { name: 'Bottom', property: 'border-bottom-left-radius', value: '0px' },
            { name: 'Left', property: 'border-bottom-right-radius', value: '0px' }
          ]
        },
        {
          name: 'Border Detached',
          property: 'border-detached',
          type: 'composite',
          detached: true,
          properties: [
            {
              name: 'Width',
              property: 'border-width',
              type: 'integer',
              units: ['px', '%'],
              value: '1px'
            },
            {
              name: 'Style',
              property: 'border-style',
              type: 'select',
              list: [
                { value: 'none', name: 'None' },
                { value: 'solid', name: 'Solid' },
                { value: 'dotted', name: 'Dotted' },
                { value: 'dashed', name: 'Dashed' },
                { value: 'double', name: 'Double' },
                { value: 'groove', name: 'Groove' },
                { value: 'ridge', name: 'Ridge' },
                { value: 'inset', name: 'Inset' },
                { value: 'outset', name: 'Outset' }
              ],
              value: 'none'
            },
            { name: 'Color', property: 'border-color', type: 'color', value: '#000000' }
          ]
        }
      ]
    }
  ]
}
