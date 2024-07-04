interface Campaign {
  id: number
  campaignName: string
  editedAt: Date
  createdAt: Date
}

export const campaigns: Campaign[] = [
  {
    id: 1,
    campaignName: 'Summer Sale',
    editedAt: new Date('2023-01-15T08:00:00Z'),
    createdAt: new Date('2023-01-10T08:00:00Z')
  },
  {
    id: 2,
    campaignName: 'Back to School',
    editedAt: new Date('2023-02-05T08:00:00Z'),
    createdAt: new Date('2023-01-30T08:00:00Z')
  },
  {
    id: 3,
    campaignName: 'Winter Clearance',
    editedAt: new Date('2023-03-20T08:00:00Z'),
    createdAt: new Date('2023-03-15T08:00:00Z')
  },
  {
    id: 4,
    campaignName: 'Spring Fashion',
    editedAt: new Date('2023-04-10T08:00:00Z'),
    createdAt: new Date('2023-04-05T08:00:00Z')
  },
  {
    id: 5,
    campaignName: 'Holiday Deals',
    editedAt: new Date('2023-06-25T08:00:00Z'),
    createdAt: new Date('2023-06-20T08:00:00Z')
  },
  {
    id: 6,
    campaignName: 'Tech Fest',
    editedAt: new Date('2023-07-15T08:00:00Z'),
    createdAt: new Date('2023-07-10T08:00:00Z')
  },
  {
    id: 7,
    campaignName: 'Fitness Challenge',
    editedAt: new Date('2023-09-05T08:00:00Z'),
    createdAt: new Date('2023-09-01T08:00:00Z')
  },
  {
    id: 8,
    campaignName: 'Spring Cleaning',
    editedAt: new Date('2023-10-20T08:00:00Z'),
    createdAt: new Date('2023-10-15T08:00:00Z')
  },
  {
    id: 9,
    campaignName: 'Summer Camp',
    editedAt: new Date('2023-12-10T08:00:00Z'),
    createdAt: new Date('2023-12-05T08:00:00Z')
  },
  {
    id: 10,
    campaignName: 'Gaming Marathon',
    editedAt: new Date('2024-01-15T08:00:00Z'),
    createdAt: new Date('2024-01-10T08:00:00Z')
  },
  {
    id: 11,
    campaignName: 'New Year Resolution',
    editedAt: new Date('2024-03-05T08:00:00Z'),
    createdAt: new Date('2024-03-01T08:00:00Z')
  },
  {
    id: 12,
    campaignName: 'Holiday Shopping',
    editedAt: new Date('2024-04-20T08:00:00Z'),
    createdAt: new Date('2024-04-15T08:00:00Z')
  }
]
