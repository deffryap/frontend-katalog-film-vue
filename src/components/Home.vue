<template>
  <div>
    <header class="text-center mb-12">
      <h1 class="text-4xl sm:text-5xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300 tracking-wider">Selamat Datang</h1>
      <p class="text-gray-400 mt-2">Jelajahi koleksi film kami</p>
      <form @submit.prevent="fetchMovies" class="mt-8 max-w-xl mx-auto">
        <div class="relative">
          <input v-model="searchQuery" type="text" placeholder="Cari berdasarkan judul..." class="w-full bg-slate-800 border border-slate-700 rounded-full p-4 pl-6 pr-16 focus:outline-none focus:ring-2 focus:ring-cyan-500">
          <button type="submit" class="absolute inset-y-0 right-0 bg-cyan-600 hover:bg-cyan-700 rounded-full px-5 m-1.5 text-white font-semibold">Cari</button>
        </div>
      </form>
    </header>

    <main>
      <!-- Loading Skeleton -->
      <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <div v-for="n in 10" :key="n" class="bg-slate-800 rounded-lg animate-pulse">
          <div class="bg-slate-700 aspect-[2/3] rounded-lg"></div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-else-if="error" class="text-center py-10">
        <p class="text-lg text-red-400">{{ error }}</p>
      </div>
      
      <!-- No Results -->
      <div v-else-if="movies.length === 0" class="text-center py-10">
        <p class="text-lg text-gray-400">Tidak ada film yang ditemukan.</p>
      </div>

      <!-- Movie Grid -->
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        <MovieCard v-for="movie in movies" :key="movie.id || movie.imdbID" :movie="movie" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import MovieCard from '../components/MovieCard.vue';

const movies = ref([]);
const searchQuery = ref('');
const loading = ref(true);
const error = ref(null);
const API_URL = 'http://localhost:3000/api/movies'; // Sesuaikan port

async function fetchMovies() {
  loading.value = true;
  error.value = null;
  try {
    let url = API_URL;
    if (searchQuery.value) {
      url += `?search=${encodeURIComponent(searchQuery.value)}`;
    }
    const response = await axios.get(url);
    movies.value = response.data;
  } catch (err) {
    error.value = 'Gagal memuat film. Pastikan backend berjalan.';
    console.error(err);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchMovies);
</script>
