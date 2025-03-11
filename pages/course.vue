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
  
      <div class="flex flex-col md:flex-row justify-center flex-grow">
        <nav
          class="prose mb-16 md:mb-0 md:mr-4 p-8 bg-white rounded-md md:min-w-[20ch] flex flex-col sticky md:relative" id="chapter-nav" aria-labelledby="course-chapters-title">
          <h2 id="course-chapters-title"><span class="visually-hidden">Course </span>Chapters</h2>
          <ClientOnly>
            <ToggleButton :model-value="isOpen" @update:model-value="toggleOpen" />
          </ClientOnly>
          <!-- All the lessons for the course listed here -->
          <!-- render course -->
          <section id="chapters-submenu" class="menu-closed">          
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

          </section>
        </nav>
  
        <main id="main" class="prose p-12 bg-white rounded-md w-[65ch]">
          <NuxtPage />
        </main>
      </div>
    </div>
</template>

<script setup>
import ToggleButton from '~/components/ToggleButton.vue';
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

const isMenuOpen = useLocalStorage('isMenuOpen', []);

const isOpen = computed(() => {

  const chaptersSubmenu = document.querySelector('#chapters-submenu');

if (isMenuOpen.value === true) {
  console.log('true');
  // removes class hiding the submenu based on toggle button value
  chaptersSubmenu.classList.remove('menu-closed');
  return true;
}

if (isMenuOpen.value === false) {
  console.log('false');
  // adds class hiding the submenu based on toggle button value
  chaptersSubmenu.classList.add('menu-closed');
  return false;
}

return isMenuOpen.value 

}); // end isLessonComplete

// use toggleComplete variable to update the progress state
const toggleOpen = () => {
// once we make sure the array exists we set the value
// flips between true and false
isMenuOpen.value = !isOpen.value;

} // end toggleOpen



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

    /**
     * testing chapter sticky menu on mobile
     */
     #chapter-nav {
      top: 0;
      height: auto;
      overflow: hidden;
      z-index: 1;
      overflow-y: hidden;
    }

     .menu-open {
      display: block;
     }

     .menu-closed {
      display: none;
     }

    /**
     * 768px
     */
    @media (width >= 48rem) {
      #chapter-nav {
        top: 0;
        height: auto;
        overflow: visible;
        z-index: 0;
        overflow-y: visible;
      }

      #chapters-submenu {
        display: block;
      }
     }
</style>