import { defineModule } from '@/utils'
import organizationOverview from './routes/organization-overview.vue'
import { CreateOrg, OrgList, AcceptInvitation, UserOrgList } from './components'

export default defineModule({
  id: 'organization',
  name: 'organization',
  routes: [
    {
      //name: 'organization-overview',
      path: '/organization',
      component: organizationOverview
    },
    {
      name: 'create-org',
      path: '/create-org',
      component: CreateOrg
    },
    {
      name: 'organization-overview',
      path: '/',
      component: OrgList
    },
    {
      path: '/invite/:invitationToken',
      name: 'accept-invitation',
      component: AcceptInvitation,
      meta: {
        public: true
      }
    },
    {
      path: '/user-orgs',
      name: 'user-orgs',
      component: UserOrgList
    }
  ]
})
