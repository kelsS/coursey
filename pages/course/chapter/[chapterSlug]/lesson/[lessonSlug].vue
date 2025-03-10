<template>
    <div>
      <p class="mt-0 uppercase font-bold text-slate-500 mb-1">
        Lesson {{ chapter.number }} - {{ lesson.number }}
      </p>
      <h2 class="my-0">{{ lesson.title }}</h2>
      <div class="flex space-x-4 mt-2 mb-8">
        <a
          v-if="lesson.sourceUrl"
          class="font-normal text-md text-gray-500"
          :href="lesson.sourceUrl"
        >
          Download Source Code
        </a>
        <a
          v-if="lesson.downloadUrl"
          class="font-normal text-md text-gray-500"
          :href="lesson.downloadUrl"
        >
          Download Video
        </a>
      </div>
      <VideoPlayer
        v-if="lesson.videoId"
        :videoId="lesson.videoId"
      />
      <p>{{ lesson.text }}</p>
      <!-- render the button only on the client side for now since server is not set up yet-->
       <!-- use nuxt: <ClientOnly> tag -->
        <!-- to render something on the client side only always add the .client.vue extension to the file name -->
        <!-- then remove the <ClientOnly> tag -->
        <!-- ie. LessonCompleteButton.client.vue -->
       <ClientOnly>
        <!-- map button to progress feature -->
        <!-- must use nuxt method instead of vue v-model -->
        <LessonCompleteButton :model-value="isLessonComplete" @update:model-value="toggleComplete" />
       </ClientOnly>
    </div>
</template>
  
  <script setup>
  import LessonCompleteButton from '~/components/LessonCompleteButton.vue';

  // get course
  const course = useCourse();
  // get route
  const route = useRoute();
  
  // get chapter by chapter slug
  const chapter = computed(() => {
    return course.chapters.find(
      (chapter) => chapter.slug === route.params.chapterSlug
    );
  });
  
  // get lesson by lesson slug
  const lesson = computed(() => {
    return chapter.value.lessons.find(
      (lesson) => lesson.slug === route.params.lessonSlug
    );
  });

  // set dynamic title
  const title = computed(() => {
    return `${lesson.value.title} - ${course.title}`;
  })
  useHead({
    title
  })

  // create reference to lesson-complete-button
  // to work better with databases store the state of each marked complete into one variable
  // store the variable with useState
  // allows us to share the progress state across lessons
  // useState handles server side data better than ref()
  // switch from useState to useLocalStorage to store the state in local storage which persists on browser refresh
  // set second param to an empty array
  const progress = useLocalStorage('progress', []);

  const isLessonComplete = computed(() => {

    // check for the chapter array
    // if chapter array DOES NOT exist then the lesson is still incomplete
    if (!progress.value[ chapter.value.number - 1]) {
      console.log('lesson not completed');
      return false;
    }

    // check to see if the lesson exists
    // if lesson array DOES NOT exist then the lesson is still incomplete
    if (!progress.value[chapter.value.number - 1][
      lesson.value.number - 1
    ]) {
      console.log('lesson not completed');
      return false;
    }

    // if chapter and lesson array DOES exist the lesson is complete
    // we return the value
    return progress.value[chapter.value.number - 1][
      lesson.value.number - 1
    ];
  }); // end isLessonComplete

  // use toggleComplete variable to update the progress state
  const toggleComplete = () => {
    // if chapter array DOES NOT exist create it
    if (!progress.value[chapter.value.number - 1]) {
      progress.value[chapter.value.number - 1] = [];
    }

    // once we make sure the array exists we set the value
    // flips between true and false
    progress.value[chapter.value.number - 1][
      lesson.value.number - 1
    ] = !isLessonComplete.value;
  } // end toggleComplete

  // show course data in console
  console.log(course);
  </script>

<style scoped>
    a:focus,
    a:hover,
    button:focus,
    button:hover {
        outline: 2px solid red;
        border-radius: 5px;
    }
</style>