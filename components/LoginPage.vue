<template>
  <div ref="container" class="overflow-hidden transition-all duration-500 select-none"
    style="position: absolute; width: calc(100% - 3rem);">
    <transition name="slide-left" mode="out-in">
      <div v-if="step === 'login'" key="login" style="position: fixed; width: calc(100% - 3rem);">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Sign in to GenSync</h2>

        <div class="relative w-full">
          <IInput v-model="email" label="Email" @keydown.enter="goToPassword" placeholder="Enter your email" />
          <transition name="fade">
            <button v-if="isValidEmail"
              class="absolute right-2 top-2 flex items-center justify-center w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-opacity"
              @click="goToPassword">
              <FontAwesomeIcon :icon="faArrowRight" class="text-gray-700 dark:text-white text-lg" />
            </button>
          </transition>
        </div>

        <div class="flex items-center w-full my-4">
          <div class="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          <span class="px-2 text-gray-500 dark:text-gray-400 text-sm">or</span>
          <div class="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        <div class="flex justify-between w-full">
          <div class="flex gap-4">
            <button @click="goToRoleSelection" class="icon-btn bg-white dark:bg-gray-700">
              <FontAwesomeIcon :icon="faGoogle" class="text-xl text-gray-700 dark:text-white" />
            </button>
            <button @click="goToRoleSelection" class="icon-btn bg-white dark:bg-gray-700">
              <FontAwesomeIcon :icon="faApple" class="text-xl text-gray-700 dark:text-white" />
            </button>
          </div>

          <button @click="handleHelp"
            class="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition">
            Get Help?
          </button>
        </div>
      </div>
    </transition>

    <transition name="slide-left" mode="out-in">
      <div v-if="step === 'password'" key="password" style="position: fixed; width: calc(100% - 3rem);">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Enter Your Password</h2>

        <div class="relative w-full">
          <IInput v-model="password" label="Password" type="password" @keydown.enter="goToRoleSelection"
            placeholder="Enter your password" />
          <button
            class="absolute right-2 top-2 flex items-center justify-center w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            @click="goToRoleSelection">
            <FontAwesomeIcon :icon="faArrowRight" class="text-gray-700 dark:text-white text-lg" />
          </button>
        </div>
      </div>
    </transition>

    <transition name="slide-left" mode="out-in">
      <div v-if="step === 'mailverify'" key="mailverify" style="position: fixed; width: calc(100% - 3rem);">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Enter the 6-Digit Verification Code
        </h2>

        <div class="flex justify-center gap-2 mb-4">
          <input v-for="(digit, index) in codeDigits" :key="index" ref="codeInputs" v-model="codeDigits[index]"
            type="text" maxlength="1" inputmode="numeric" pattern="[0-9]*"
            class="w-12 h-14 text-center text-2xl font-bold border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            @input="onInput(index)" @keydown.backspace.prevent="onBackspace(index)" />
        </div>

        <p class="text-center text-sm text-gray-500 dark:text-gray-400">
          <span v-if="countdown > 0">
            Resend available in <span class="font-semibold text-blue-500">{{ countdown }}</span>s
          </span>
          <span v-else>
            Haven’t received it?
            <span class="underline cursor-pointer text-blue-500 hover:text-blue-600" @click="resendCode">
              Resend
            </span>
          </span>
        </p>
      </div>
    </transition>

    <transition name="slide-left" mode="out-in">
      <div v-if="step === 'selectRole'" key="selectRole" style="position: fixed; width: calc(100% - 3rem);">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Choose Your Role</h2>
        <p class="text-center text-gray-600 dark:text-gray-400 mb-10">Select an option below to continue</p>

        <div class="flex flex-col gap-4">
          <button class="role-btn" @click="">
            <FontAwesomeIcon :icon="faChild" class="text-2xl text-gray-700 dark:text-white w-10" />
            <div>
              <p class="font-bold text-gray-900 dark:text-white text-left">I'm Young</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">For younger users</p>
            </div>
          </button>

          <button class="role-btn" @click="openVoicechat">
            <FontAwesomeIcon :icon="faUserTie" class="text-2xl text-gray-700 dark:text-white w-10" />
            <div>
              <p class="font-bold text-gray-900 dark:text-white text-left">I'm Elderly</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">For senior users</p>
            </div>
          </button>
        </div>
      </div>
    </transition>

    <transition name="slide-left" mode="out-in">
      <div v-if="step === 'voiceChat'" key="voiceChat" style="position: fixed; width: calc(100% - 3rem);">
        <div class="flex flex-col items-center justify-center h-full text-center px-4">

          <!-- 标题和简介 -->
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Voice Conversation</h1>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              Speak freely. We’re listening to your voice input in real time.
            </p>
          </div>

          <!-- 麦克风权限提示 -->
          <svg v-if="!micGranted" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-20 mt-12">
            <path
              d="M248.4 84.3c1.6-2.7 4.5-4.3 7.6-4.3s6 1.6 7.6 4.3L461.9 410c1.4 2.3 2.1 4.9 2.1 7.5c0 8-6.5 14.5-14.5 14.5l-387 0c-8 0-14.5-6.5-14.5-14.5c0-2.7 .7-5.3 2.1-7.5L248.4 84.3zm-41-25L9.1 385c-6 9.8-9.1 21-9.1 32.5C0 452 28 480 62.5 480l387 0c34.5 0 62.5-28 62.5-62.5c0-11.5-3.2-22.7-9.1-32.5L304.6 59.3C294.3 42.4 275.9 32 256 32s-38.3 10.4-48.6 27.3zM288 368a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm-8-184c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 96c0 13.3 10.7 24 24 24s24-10.7 24-24l0-96z" />
          </svg>
          <h2 v-if="!micGranted" class="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">
            Please allow microphone access
          </h2>

          <!-- 上下对称的音量条 -->
          <div v-else>
            <div class="flex flex-col items-center gap-1">
              <!-- 上半部分 -->
              <div class="flex gap-2 items-end h-24">
                <div v-for="(level, index) in levels" :key="'top-' + index" :style="{ height: `${level}px` }"
                  class="w-7 bg-gray-700 dark:bg-blue-400 rounded-t-md transition-all duration-100 ease-out" />
              </div>
            </div>
            <div class="flex flex-col items-center gap-1">
              <!-- 上半部分 -->
              <div class="flex gap-2 items-start h-24">
                <div v-for="(level, index) in levels" :key="'top-' + index" :style="{ height: `${level}px` }"
                  class="w-7 bg-gray-700 dark:bg-blue-400 rounded-b-md transition-all duration-100 ease-out" />
              </div>
            </div>
          </div>
          <SetupButton class="w-60" :text="'Use Text Instead'" @click="switchToTextMode" />
        </div>
      </div>
    </transition>
    <transition name="slide-left" mode="out-in">
      <div v-if="step === 'textChat'" key="textChat" style="position: fixed; width: calc(100% - 3rem); height: 21rem;"
        class="flex flex-col max-w-2xl mx-auto">
        <div style="background: #ECECEC; width: 100%">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Text Conversation</h1>
          <p class="text-gray-600 dark:text-gray-300 text-sm mb-2">
            We’re listening to your voice input in real time.
          </p>
        </div>
        <!-- 对话框区域 -->
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

        <!-- 底部输入框 -->
        <div class="flex gap-2 items-center w-full">
          <IInput v-model="input" placeholder="Type your message..." class="flex-1 h-10 w-full"
            @keydown.enter="sendMessage" />
          <SetupButton @click="sendMessage" :disabled="input.trim() === ''" :text="'Send'" />
        </div>
      </div>
    </transition>
    <transition name="slide-left" mode="out-in">
      <div v-if="step === 'AllDone'" key="AllDone" style="position: fixed; width: calc(100% - 3rem); height: 21rem;"
        class="flex flex-col max-w-2xl mx-auto">
        <div style="background: #ECECEC; width: 100%">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-1">Text Conversation</h1>
          <p class="text-gray-600 dark:text-gray-300 text-sm mb-2">
            We’re listening to your voice input in real time.
          </p>
        </div>
        <!-- 对话框区域 -->
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

        <!-- 底部输入框 -->
        <div class="flex gap-2 items-center">
          <Input v-model="input" placeholder="Type your message..." class="flex-1" @keydown.enter="sendMessage" />
          <Button @click="sendMessage" :disabled="input.trim() === ''">
            <FontAwesomeIcon :icon="faPaperPlane" class="text-2xl text-gray-700 dark:text-white w-10" />
          </Button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, nextTick, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRight, faChild, faUserTie, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

// 模拟对话内容的 JSON 数据
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

const micGranted = ref(false)
const levels = ref([0, 0, 0, 0]) // 初始竖条高度

let audioContext: AudioContext | null = null
let analyser: AnalyserNode | null = null
let dataArray: Uint8Array

onMounted(() => {
  if (step.value === 'voiceChat') {
    initMic()
  }
})

const initMic = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    micGranted.value = true

    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const source = audioContext.createMediaStreamSource(stream)
    analyser = audioContext.createAnalyser()
    analyser.fftSize = 64

    const bufferLength = analyser.frequencyBinCount
    dataArray = new Uint8Array(bufferLength)
    source.connect(analyser)

    updateLevels()
  } catch (e) {
    console.warn('Mic permission denied or error:', e)
  }
}

const updateLevels = () => {
  if (!analyser) return

  analyser.getByteFrequencyData(dataArray)

  const bars = 4
  const step = Math.floor(dataArray.length / bars)
  const rawLevels = []

  for (let i = 0; i < bars; i++) {
    const slice = dataArray.slice(i * step, (i + 1) * step)
    let avg = slice.reduce((sum, v) => sum + v, 0) / slice.length

    if (i === 0) avg *= 0.7   // 原柱子1
    if (i === 1) avg *= 1.2   // 原柱子2
    if (i === 2) avg *= 1.3   // 原柱子3
    if (i === 3) avg *= 1.5   // 原柱子4

    const height = Math.max(14, Math.min((avg / 255) * 100, 100))
    rawLevels.push(height)
  }

  // 重新排序：[2, 0, 1, 3]
  levels.value = [rawLevels[2], rawLevels[0], rawLevels[1], rawLevels[3]]

  requestAnimationFrame(updateLevels)
}

const openVoicechat = () => {
  step.value = 'voiceChat'
  initMic()
}

const switchToTextMode = () => {
  step.value = 'textChat'
}

const router = useRouter()
const email = ref('')
const password = ref('')
const isValidEmail = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))

const codeDigits = ref(Array(6).fill(''))
const codeInputs = ref<HTMLInputElement[]>([])
const countdown = ref(60)
let countdownTimer: number | null = null

const startCountdown = () => {
  countdown.value = 60
  countdownTimer && clearInterval(countdownTimer)
  countdownTimer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(countdownTimer!)
    }
  }, 1000)
}

const resendCode = () => {
  // TODO: trigger actual resend code logic
  startCountdown()
}

const props = defineProps<{
  step: 'login' | 'password' | 'selectRole' | 'mailverify' | 'voiceChat' | 'textChat' | 'AllDone'
}>()

const emit = defineEmits<{
  (e: 'update:step', value: 'login' | 'password' | 'selectRole' | 'mailverify' | 'voiceChat' | 'textChat' | 'AllDone'): void
}>()

const step = ref(props.step)

// 同步 step 到父组件
watch(step, (val) => {
  emit('update:step', val)
})

const goToPassword = () => {
  if (isValidEmail.value)
    // step.value = 'password'
    step.value = 'mailverify'
  codeInputs.value[0]?.focus()
  startCountdown()
}

// 输入自动跳转 + 完成时 alert
const onInput = (index: number) => {
  const val = codeDigits.value[index]

  // 只允许数字
  if (!/^\d$/.test(val)) {
    codeDigits.value[index] = ''
    return
  }

  // 自动跳到下一个输入框
  if (index < 5) {
    nextTick(() => codeInputs.value[index + 1]?.focus())
  }

  // 如果全部填满，触发 alert
  if (codeDigits.value.every(d => d !== '')) {
    console.log(`你输入的验证码是：${codeDigits.value.join('')}`);
    step.value = 'selectRole'
  }
}

// 支持退格跳回
const onBackspace = (index: number) => {
  if (codeDigits.value[index] === '') {
    if (index > 0) {
      codeDigits.value[index - 1] = ''
      nextTick(() => codeInputs.value[index - 1]?.focus())
    }
  } else {
    codeDigits.value[index] = ''
  }
}

const goToRoleSelection = () => {
  step.value = 'selectRole'
}

const navigateTo = (path: string) => {
  router.push(path)
}

const handleHelp = () => {
  alert('Redirecting to support page...')
  router.push('/help')
}
</script>

<style scoped>
/* 按钮样式 */
.icon-btn {
  display: flex;
  align-items: center;
  width: 40px;
  height: 40px;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s;
}

.icon-btn:hover {
  background-color: #555;
}

.role-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: #f9fafb;
  border-radius: 12px;
  transition: background 0.3s;
}

.role-btn:hover {
  background-color: #f3f4f6;
}

.dark .role-btn {
  background-color: #333;
}

.dark .role-btn:hover {
  background-color: #555;
}

/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-left-leave-active {
  transition: .5s ease;
}

.slide-left-enter-active {
  opacity: 0;
  transform: translateX(100%);
  transition: .5s ease;
}

.slide-left-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>