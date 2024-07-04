import type { Block } from '@/types/block'
import { Type } from '@/constants'
import { v4 as uuidv4 } from 'uuid'

export const sectionBlock: Block = {
  id: uuidv4(),
  type: Type.SECTION,
  tagName: 'mj-section',
  attributes: {},
  children: []
}
