<template>
  <div>
    <header class="text-center mb-12">
      <h1 class="text-4xl sm:text-5xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300 tracking-wider">Selamat Datang</h1>
      <p class="text-gray-500 dark:text-gray-400 mt-2">Jelajahi koleksi film dan serial TV kami</p>
      
      <div class="mt-8 flex justify-center gap-2 sm:gap-4">
        <button @click="setCategory('all')" :class="activeCategory === 'all' ? 'bg-cyan-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'" class="px-5 py-2 rounded-full font-semibold transition-colors">Semua</button>
        <button @click="setCategory('movie')" :class="activeCategory === 'movie' ? 'bg-cyan-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'" class="px-5 py-2 rounded-full font-semibold transition-colors">Film</button>
        <button @click="setCategory('series')" :class="activeCategory === 'series' ? 'bg-cyan-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'" class="px-5 py-2 rounded-full font-semibold transition-colors">TV Series</button>
      </div>

      <div class="mt-6 max-w-xl mx-auto">
        <input v-model="searchQuery" type="text" placeholder="Cari judul..." class="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full p-4 px-6 focus:outline-none focus:ring-2 focus:ring-cyan-500">
      </div>
    </header>

    <main>
      <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <div v-for="n in 10" :key="n" class="bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse">
          <div class="bg-slate-300 dark:bg-slate-700 aspect-[2/3] rounded-lg"></div>
        </div>
      </div>
      <div v-else-if="error" class="text-center py-10"><p class="text-lg text-red-400">{{ error }}</p></div>
      <div v-else-if="movies.length === 0" class="text-center py-10"><p class="text-lg text-gray-500 dark:text-gray-400">Tidak ada konten yang ditemukan.</p></div>
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        <MovieCard v-for="movie in movies" :key="movie.id || movie.imdbID" :movie="movie" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import MovieCard from '../components/MovieCard.vue';

const movies = ref([]);
const searchQuery = ref('');
const activeCategory = ref('all');
const loading = ref(true);
const error = ref(null);
const API_URL = 'http://localhost:3000/api/movies';

let debounceTimer;
async function fetchMovies() {
  loading.value = true;
  error.value = null;
  try {
    const params = new URLSearchParams();
    if (searchQuery.value) params.append('search', searchQuery.value);
    if (activeCategory.value !== 'all') params.append('type', activeCategory.value);
    const response = await axios.get(`${API_URL}?${params.toString()}`);
    // Urutkan data berdasarkan judul (A-Z)
    movies.value = response.data.sort((a, b) => a.Title.localeCompare(b.Title));
  } catch (err) {
    error.value = 'Gagal memuat konten. Pastikan backend berjalan.';
    console.error(err);
  } finally {
    loading.value = false;
  }
}

function setCategory(category) { activeCategory.value = category; }

watch([searchQuery, activeCategory], () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => { fetchMovies(); }, 300);
});

onMounted(fetchMovies);
</script>
