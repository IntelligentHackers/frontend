<script lang="ts">
export const description
  = 'GenSync AI Community'
export const iframeHeight = '800px'
export const containerClass = 'w-full h-full'
</script>
<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

const messages = ref([
  { role: 'system', content: 'Hello! How can I help you today?' },
  { role: 'user', content: 'What is the weather like?' },
  { role: 'system', content: 'It’s sunny and 25°C today.' },
])

// 输入框绑定值
const input = ref('')

// 发送消息逻辑
const sendMessage = () => {
  if (input.value.trim() === '') return

  const cachemsg = input.value.trim()

  messages.value.push({
    role: 'user',
    content: cachemsg,
  })

  // 模拟系统回复
  setTimeout(() => {
    messages.value.push({
      role: 'system',
      content: 'You said: ' + cachemsg,
    })
  }, 500)

  input.value = ''
}

const users = [
  { id: 1, name: '张三', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: '李四', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: '王五', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, name: '赵六', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 5, name: '孙七', avatar: 'https://i.pravatar.cc/150?img=5' }
]
</script>
<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header
        class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="hidden md:block">
                <BreadcrumbLink href="#">
                  Platform
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator class="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>ChatBox</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div class="flex flex-1 gap-6 p-6 pt-0">
        <div class="w-80 border-r border-gray-300">
          <h1 class="text-xl font-bold mb-4">Address List</h1>
          <div v-for="user in users" :key="user.id" class="flex items-center space-x-4 py-3">
            <img :src="user.avatar" alt="avatar" class="w-10 h-10 rounded-full object-cover" />
            <div class="text-base font-medium">{{ user.name }}</div>
          </div>
        </div>
        <div style="width: 100%; height: 100%;" class="flex flex-col max-w-2xl mx-auto">
          <div class="flex gap-3 items-center mb-10">
            <img :src="users[0].avatar" alt="avatar" class="w-10 h-10 rounded-full object-cover" />
            <div class="text-base font-medium">{{ users[0].name }}</div>
          </div>
          <div class="flex-1 overflow-y-auto space-y-4 px-1">
            <div v-for="(message, index) in messages" :key="index" :class="[
              'w-fit max-w-[80%] px-4 py-2 text-sm',
              message.role === 'user'
                ? 'ml-auto bg-blue-100 dark:bg-blue-800 text-gray-800 dark:text-gray-100 rounded-xl rounded-tr-none'
                : 'mr-auto bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 rounded-xl rounded-tl-none'
            ]">
              {{ message.content }}
            </div>
          </div>

          <div class="flex gap-2 items-center w-full">
            <IInput v-model="input" placeholder="Type your message..." class="flex-1 h-10 w-full"
              @keydown.enter="sendMessage" />
            <SetupButton class="h-10" @click="sendMessage" :disabled="input.trim() === ''" :text="'Send'" />
          </div>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>