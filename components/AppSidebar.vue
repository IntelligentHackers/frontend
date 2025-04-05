<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import NavMain from '@/components/NavMain.vue'
import NavProjects from '@/components/NavProjects.vue'
import NavUser from '@/components/NavUser.vue'
import TeamSwitcher from '@/components/TeamSwitcher.vue'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import {
  Bot,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from 'lucide-vue-next'
const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

const data = {
  user: {
    name: 'username',
    email: 'admin@gensync.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'GenSync',
      plan: 'AI Community',
    }
  ],
  navMain: [
    {
      title: 'Match',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [],
    },
    {
      title: 'ChatBox',
      url: '#',
      icon: Bot,
      items: [],
    },
    {
      title: 'Profile',
      url: '#',
      icon: Settings2,
      items: [],
    },
  ]
}
</script>
<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
      <NavProjects :projects="data.projects" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>