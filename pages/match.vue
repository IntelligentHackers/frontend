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


import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import EffectTinder from '@/assets/js/effect-tinder.esm.js';
import '@/assets/css/effect-tinder.scss';
import 'swiper/css';
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
                <BreadcrumbPage>Match</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div class="flex flex-1 p-6 pt-0 flex-col">
        <h1 class="text-xl font-bold">Match</h1>
        <swiper :modules="[Pagination, Autoplay, Navigation, EffectTinder]" :effect="'tinder'">
          <swiper-slide>
            <img src="@/public/static/images/01.jpg" alt="">
            <div class="swiper-tinder-label swiper-tinder-label-yes">Like</div>
            <div class="swiper-tinder-label swiper-tinder-label-no">Nope</div>
            <div class="demo-slide-name"><b>Sabrina</b>, 23</div>
          </swiper-slide>
          <swiper-slide>
            <img src="@/public/static/images/02.jpg" alt="">
            <div class="swiper-tinder-label swiper-tinder-label-yes">Like</div>
            <div class="swiper-tinder-label swiper-tinder-label-no">Nope</div>
            <div class="demo-slide-name"><b>Jane</b>, 32</div>
          </swiper-slide>
          <swiper-slide>
            <img src="@/public/static/images/03.jpg" alt="">
            <div class="swiper-tinder-label swiper-tinder-label-yes">Like</div>
            <div class="swiper-tinder-label swiper-tinder-label-no">Nope</div>
            <div class="demo-slide-name"><b>Jessica</b>, 24</div>
          </swiper-slide>
          <swiper-slide>
            <img src="@/public/static/images/04.jpg" alt="">
            <div class="swiper-tinder-label swiper-tinder-label-yes">Like</div>
            <div class="swiper-tinder-label swiper-tinder-label-no">Nope</div>
            <div class="demo-slide-name"><b>Kate</b>, 33</div>
          </swiper-slide>
          <swiper-slide>
            <img src="@/public/static/images/05.jpg" alt="">
            <div class="swiper-tinder-label swiper-tinder-label-yes">Like</div>
            <div class="swiper-tinder-label swiper-tinder-label-no">Nope</div>
            <div class="demo-slide-name"><b>Helen</b>, 37</div>
          </swiper-slide>
          <swiper-slide>
            There are no more recommendations
          </swiper-slide>
          <button class="swiper-tinder-button swiper-tinder-button-no">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
              <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
            </svg>
          </button>
          <button class="swiper-tinder-button swiper-tinder-button-yes">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
              <path
                d="m480-121-41-37q-106-97-175-167.5t-110-126Q113-507 96.5-552T80-643q0-90 60.5-150.5T290-854q57 0 105.5 27t84.5 78q42-54 89-79.5T670-854q89 0 149.5 60.5T880-643q0 46-16.5 91T806-451.5q-41 55.5-110 126T521-158l-41 37Z" />
            </svg>
          </button>
        </swiper>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<style>
.swiper-tinder {
  padding: 16px;
  width: 40vw;
  height: 80vh;
  margin-top: 1rem;
  overflow: hidden;
  user-select: none;
}
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

.swiper-slide::before {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50%;
  pointer-events: none;
  content: "";
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.95) 25%, rgba(0, 0, 0, 0));
  z-index: 10;
}

.demo-slide-name {
  padding: 16px 16px 96px;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  color: #fff;
  z-index: 200;
  font-size: 24px;
}

.demo-empty-slide {
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  line-height: 1.5;
  text-align: center;
  font-weight: bold;
  color: #555;
  text-shadow: 0px 1px 0px #fff;
}
.demo-empty-slide::before {
  display: none;
}
</style>