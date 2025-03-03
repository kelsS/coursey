<template>
    <div
      class="p-12 bg-gray-100 w-full h-full min-h-screen flex flex-col items-center">
      <header class="prose mb-12" id="header">
        <h1>
          <span class="font-medium">
            Course:
            <span class="font-bold">Mastering Nuxt 3</span>
          </span>
        </h1>
      </header>
  
      <div class="flex flex-row justify-center flex-grow">
        <nav
          class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] flex flex-col" id="chapter-nav" aria-label="Chapters">
          <h2>Chapters</h2>
          <!-- All the lessons for the course listed here -->
          <!-- render course -->
          <div
            class="space-y-1 mb-4 flex flex-col"
            v-for="chapter in chapters"
            :key="chapter.slug">
            <h3>{{ chapter.title }}</h3>
            <!-- NuxtLink = drop in replacement for <a> tag -> change :href = :to -->
                <!-- :class -> updates class based on route path -->
                 <!-- sets the active link color to red -->
                <NuxtLink
                    v-for="(lesson, index) in chapter.lessons"
                    :key="lesson.slug"
                    class="flex flex-row space-x-1 prose-sm font-normal py-1 px-4 -mx-4"
                    :to="lesson.path"
                    :class="{
                        'text-red-900':
                        lesson.path === $route.fullPath,
                        'text-gray-500':
                        lesson.path !== $route.fullPath,
                    }"
                    >
                    <!-- full path in useCourse.ts -->
                    <span class="text-gray-500">{{ index + 1 }}.</span>
                    <span>{{ lesson.title }}</span>
                </NuxtLink>
            </div>
        </nav>
  
        <main id="main" class="prose p-12 bg-white rounded-md w-[65ch]">
          <h2>Lesson</h2>
          <p>This is a lesson</p>

          <NuxtPage />
        </main>
      </div>
    </div>
</template>

<script setup>
// get chapters
const { chapters } = useCourse();

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  bodyAttrs: {
    class: 'test'
  }
})
</script>

<style scoped>
    a:focus,
    a:hover,
    button:focus,
    button:hover {
        outline: 2px solid red;
        border-radius: 5px;
    }

    /* set router link active class */
    .router-link-active {
        /* set the active link color*/
        @apply text-red-900;
    }
</style>