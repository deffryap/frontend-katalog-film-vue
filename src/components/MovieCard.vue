<template>
  <router-link :to="{ name: 'movieDetail', params: { id: movie.id || movie._id } }">
    <div class="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg dark:shadow-none transition-all duration-300 group hover:scale-105 hover:shadow-cyan-500/20 cursor-pointer">
      <div class="relative">
        <img :src="movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/500x750/1e293b/94a3b8?text=No+Poster'" :alt="movie.Title" class="w-full h-auto object-cover aspect-[2/3] bg-slate-200 dark:bg-slate-700">
        <div v-if="movie.Type" class="absolute top-2 right-2 bg-cyan-600 text-white text-xs font-bold px-2 py-1 rounded-full">{{ movie.Type === 'movie' ? 'Film' : 'Series' }}</div>
        <div class="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h3 class="font-bold text-white truncate text-sm sm:text-base">{{ movie.Title }}</h3>
          <p class="text-xs sm:text-sm text-gray-300">{{ movie.Year }}</p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  movie: {
    type: Object,
    required: true
  }
});
</script>