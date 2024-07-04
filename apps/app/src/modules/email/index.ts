import { defineModule } from '@/utils'
import emailEditor from './routes/email-editor.vue'
import editorOverview from './routes/editor-overview.vue'
import updateOverview from './routes/update-overview.vue'
import { UploadMedia, MediaList } from './components'

export default defineModule({
  id: 'email',
  name: 'email',
  routes: [
    {
      name: 'email-editor',
      path: '/email',
      component: emailEditor
    },
    {
      name: 'editor-overview',
      path: '/editor-overview',
      component: editorOverview
    },
    {
      path: '/editor-overview/:templateId',
      name: 'UpdateOverview',
      component: updateOverview,
      props: true
    },
    {
      path: '/upload',
      component: UploadMedia,
      props: true
    },
    {
      path: '/media',
      component: MediaList,
      props: true
    }
  ]
})
