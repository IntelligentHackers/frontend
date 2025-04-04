<template>
  <div class="min-h-screen flex items-center justify-center px-20">
    <div class="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- 左侧文本 + 按钮 -->
      <div class="flex flex-col justify-center">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          GenSync
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Join us and start your journey today.
        </p>
        <HoverButton text="Get Started" @click="showLogin = true" />
      </div>

      <!-- 右侧图片 -->
      <div class="flex justify-center">
        <!--<img
          src="/img/frontend-young.svg"
          alt="Frontend Illustration"
          class="w-full max-w-md md:max-w-lg"
        />-->
      </div>
    </div>

    <!-- 登录框 -->
    <transition name="fade">
      <!-- 调用页面 -->
        <div v-if="showLogin" @click="showLogin = false" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div 
            @click.stop 
            class="bg-white/90 h-40 dark:bg-black/20 border border-white/20 p-6 rounded-2xl shadow-2xl backdrop-blur-lg w-[90%] max-w-md transition-all duration-500 overflow-hidden"
            :class="{
              'h-60': step === 'login',
              'h-40': step === 'password',
              'h-48': step === 'mailverify',
              'h-80': step === 'selectRole',
              'h-96': step === 'voiceChat' || step === 'textChat',
            }"
          >
            <LoginPage v-model:step="step" />
          </div>
        </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const step = ref<'login' | 'password' | 'selectRole' | 'mailverify' | 'voiceChat' | 'textChat' | 'AllDone'>('login')
const showLogin = ref(false)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.popup-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.popup-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.popup-leave-active {
  transition: all 0.3s ease;
}

.popup-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
</style>