export interface MJMLAttributes {
  [key: string]: string
}

export interface Block {
  id: string
  type: string
  tagName: string
  attributes?: MJMLAttributes
  content?: string
  children?: Block[]
}

export interface Property {
  name: string
  property: string
  type?: string
  defaults?: string
  units?: string[]
  list?: { value: string; name?: string; className?: string }[]
  properties?: Property[]
  detached?: boolean
  value?: string
}

export interface Sector {
  name: string
  open: boolean
  buildProps: string[]
  properties: Property[]
}

export interface PluginConfig {
  sectors: Sector[]
}
