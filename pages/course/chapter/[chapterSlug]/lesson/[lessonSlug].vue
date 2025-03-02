<template>
    <div>
      <p class="mt-0 uppercase font-bold text-slate-400 mb-1">
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
    </div>
</template>
  
  <script setup>
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

  // show course data in console
  console.log(course);
  </script>