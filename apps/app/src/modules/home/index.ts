import { defineModule } from '@/utils'
import HomeOverview from './routes/home-overview.vue'
import CampaignEvents from './routes/campaign-events.vue'
export default defineModule({
  id: 'home',
  name: 'home',
  routes: [
    {
      name: 'home-overview',
      path: '/:id',
      component: HomeOverview
    }
    //{ name: 'campaign-events',path: '/:id',component: CampaignEvents,props: true    }
  ]
})
