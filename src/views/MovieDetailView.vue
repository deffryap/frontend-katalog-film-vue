<template>
  <div>
    <div v-if="loading" class="text-center text-gray-500 dark:text-gray-400">Memuat detail...</div>
    <div v-else-if="error" class="text-center text-red-400">{{ error }}</div>
    <div v-else-if="movie" class="max-w-6xl mx-auto">
      <router-link to="/" class="mb-8 inline-block bg-slate-200 dark:bg-slate-700 hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 text-slate-700 dark:text-white font-bold py-2 px-4 rounded-full transition-colors">&larr; Kembali</router-link>
      
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Kolom Kiri: Poster -->
        <div class="lg:w-1/3 flex-shrink-0">
          <img :src="movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/500x750/1e293b/94a3b8?text=No+Poster'" :alt="movie.Title" class="w-full max-w-sm mx-auto lg:max-w-full rounded-lg shadow-lg">
        </div>

        <!-- Kolom Kanan: Trailer dan Info -->
        <div class="lg:w-2/3">
          <!-- Trailer Video -->
          <div v-if="movie.TrailerURL" class="aspect-video mb-6">
            <iframe 
              :src="embedUrl" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
              class="w-full h-full rounded-lg shadow-lg"
            ></iframe>
          </div>
          <div v-else class="aspect-video mb-6 bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center">
              <p class="text-gray-500 dark:text-gray-400">Trailer tidak tersedia</p>
          </div>

          <!-- Info Film -->
          <h1 class="text-3xl md:text-4xl font-bold">{{ movie.Title }}</h1>
          <p class="text-lg md:text-xl text-slate-500 dark:text-gray-400 my-2">{{ movie.Year }} &bull; {{ movie.Genre }} &bull; {{ movie.Runtime }}</p>
          <h2 class="text-xl md:text-2xl font-semibold mt-6 mb-2 border-b-2 border-cyan-500 pb-1">Sinopsis</h2>
          <p class="text-slate-600 dark:text-gray-300">{{ movie.Plot }}</p>
          <h3 class="font-semibold mt-4">Sutradara: <span class="font-normal text-slate-600 dark:text-gray-300">{{ movie.Director }}</span></h3>
          <h3 class="font-semibold">Pemeran: <span class="font-normal text-slate-600 dark:text-gray-300">{{ movie.Actors }}</span></h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const movie = ref(null);
const loading = ref(true);
const error = ref(null);
const API_URL = 'https://katalog-film-be.netlify.app/api/movies';

const embedUrl = computed(() => {
  if (!movie.value || !movie.value.TrailerURL) return '';
  if (movie.value.TrailerURL.includes('/embed/')) {
    return movie.value.TrailerURL;
  }
  try {
    const url = new URL(movie.value.TrailerURL);
    const videoId = url.searchParams.get('v');
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  } catch (e) {
    console.error('Invalid trailer URL:', movie.value.TrailerURL);
    return '';
  }
});

onMounted(async () => {
  try {
    const movieId = route.params.id;
    const { data } = await axios.get(`${API_URL}/${movieId}`);
    movie.value = data;
  } catch (err) {
    error.value = "Gagal mengambil detail film.";
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>
