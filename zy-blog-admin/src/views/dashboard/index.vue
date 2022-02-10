<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles',
      'perms'
    ])
  },
  created() {
    console.log('perms')
    console.log(this.perms)
    if (!this.perms.includes('*') && !this.perms.includes('POST /admin/index')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
