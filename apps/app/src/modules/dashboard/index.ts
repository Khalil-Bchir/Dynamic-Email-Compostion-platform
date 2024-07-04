import { defineModule } from '@/utils'

import Dashboard from './routes/Example.vue'

export default defineModule({
  id: 'dashboard',
  name: 'dashboard',
  routes: [
    {
      name: 'campaignEvents',
      path: '/dashboard/:id',
      component: Dashboard,
      props: true
    }
  ]
})
