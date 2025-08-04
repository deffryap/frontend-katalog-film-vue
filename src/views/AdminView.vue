<template>
  <div class="p-4 sm:p-0 text-slate-800 dark:text-slate-100" style="background-color: transparent;">
    <div class="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
      <h1 class="text-2xl sm:text-3xl font-bold">Dasbor Admin</h1>
      <button @click="openForm()" class="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm">
        Tambah Konten Baru
      </button>
    </div>

    <!-- Bagian Statistik -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white dark:bg-slate-800 p-4 rounded-lg shadow text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400">Total Konten</p>
            <p class="text-2xl font-bold">{{ totalContent }}</p>
        </div>
        <div class="bg-white dark:bg-slate-800 p-4 rounded-lg shadow text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400">Tahun Terbaru</p>
            <p class="text-2xl font-bold">{{ latestYear }}</p>
        </div>
        <div class="bg-white dark:bg-slate-800 p-4 rounded-lg shadow text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400">Tahun Terlama</p>
            <p class="text-2xl font-bold">{{ earliestYear }}</p>
        </div>
        <div class="bg-white dark:bg-slate-800 p-4 rounded-lg shadow text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400">Genre Teratas</p>
            <p class="text-2xl font-bold">{{ mostCommonGenre }}</p>
        </div>
    </div>
    
    <transition name="form">
        <div v-if="showForm" class="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md mb-8 overflow-hidden">
            <h2 class="text-xl font-semibold mb-4">{{ formMode === 'add' ? 'Tambah Konten Baru' : 'Edit Konten' }}</h2>
            <form @submit.prevent="handleSubmit">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="title" class="block text-sm font-medium mb-1">Judul</label>
                        <input v-model="form.Title" id="title" type="text" placeholder="Judul" class="w-full p-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded" required>
                    </div>
                    <div>
                        <label for="type" class="block text-sm font-medium mb-1">Tipe</label>
                        <select v-model="form.Type" id="type" class="w-full p-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded">
                            <option value="movie">Film</option>
                            <option value="series">TV Series</option>
                        </select>
                    </div>
                    <div>
                        <label for="year" class="block text-sm font-medium mb-1">Tahun</label>
                        <input v-model="form.Year" id="year" type="text" placeholder="Tahun" class="w-full p-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded">
                    </div>
                    <div>
                        <label for="imdbID" class="block text-sm font-medium mb-1">IMDb ID</label>
                        <input v-model="form.imdbID" id="imdbID" type="text" placeholder="IMDb ID" class="w-full p-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded" required :disabled="formMode === 'edit'">
                    </div>
                    <div>
                        <label for="poster" class="block text-sm font-medium mb-1">URL Poster</label>
                        <input v-model="form.Poster" id="poster" type="text" placeholder="URL Poster" class="w-full p-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded">
                    </div>
                    <div>
                        <label for="director" class="block text-sm font-medium mb-1">Sutradara</label>
                        <input v-model="form.Director" id="director" type="text" placeholder="Sutradara" class="w-full p-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded">
                    </div>
                    <div>
                        <label for="genre" class="block text-sm font-medium mb-1">Genre</label>
                        <input v-model="form.Genre" id="genre" type="text" placeholder="Genre (pisahkan dengan koma)" class="w-full p-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded">
                    </div>
                    <div>
                        <label for="runtime" class="block text-sm font-medium mb-1">Durasi</label>
                        <input v-model="form.Runtime" id="runtime" type="text" placeholder="Durasi" class="w-full p-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded">
                    </div>
                    <div class="md:col-span-2">
                        <label for="trailer" class="block text-sm font-medium mb-1">URL Trailer YouTube</label>
                        <input v-model="form.TrailerURL" id="trailer" type="text" placeholder="URL Trailer YouTube" class="w-full p-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded">
                    </div>
                    <div class="md:col-span-2">
                        <label for="plot" class="block text-sm font-medium mb-1">Sinopsis</label>
                        <textarea v-model="form.Plot" id="plot" placeholder="Sinopsis" class="w-full p-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded" rows="3"></textarea>
                    </div>
                    <div class="md:col-span-2">
                        <label for="actors" class="block text-sm font-medium mb-1">Pemeran</label>
                        <textarea v-model="form.Actors" id="actors" placeholder="Pemeran (pisahkan dengan koma)" class="w-full p-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded" rows="2"></textarea>
                    </div>
                </div>
                <div class="mt-4">
                    <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Simpan</button>
                    <button @click="closeForm" type="button" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">Batal</button>
                </div>
            </form>
        </div>
    </transition>

    <!-- Kolom Pencarian Admin -->
    <div class="mb-4 flex justify-center">
        <input v-model="searchQuery" type="text" placeholder="Cari konten di dasbor..." class="w-full max-w-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full p-3 px-5 focus:outline-none focus:ring-2 focus:ring-cyan-500">
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-x-auto">
      <table class="w-full text-left min-w-[600px]">
        <thead class="bg-slate-100 dark:bg-slate-900">
          <tr>
            <th class="p-4 font-semibold">Judul</th>
            <th class="p-4 font-semibold">Tipe</th>
            <th class="p-4 font-semibold">Tahun</th>
            <th class="p-4 font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading"><td colspan="4" class="text-center p-4 text-gray-500 dark:text-gray-400">Memuat data...</td></tr>
          <tr v-else-if="movies.length === 0"><td colspan="4" class="text-center p-4 text-gray-500 dark:text-gray-400">Belum ada konten.</td></tr>
          <tr v-for="movie in movies" :key="movie.id || movie._id" class="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
            <td class="p-4">{{ movie.Title }}</td>
            <td class="p-4"><span :class="movie.Type === 'movie' ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300'" class="px-2 py-1 text-xs font-medium rounded-full">{{ movie.Type === 'movie' ? 'Film' : 'Series' }}</span></td>
            <td class="p-4">{{ movie.Year }}</td>
            <td class="p-4">
              <button @click="editMovie(movie)" class="text-sky-500 dark:text-sky-400 hover:underline mr-4">Edit</button>
              <button @click="deleteMovie(movie.id || movie._id)" class="text-red-500 dark:text-red-400 hover:underline">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';

const movies = ref([]);
const loading = ref(true);
const showForm = ref(false);
const formMode = ref('add');
const defaultForm = { Title: '', Year: '', imdbID: '', Type: 'movie', Poster: '', Plot: '', Director: '', Actors: '', Genre: '', Runtime: '', TrailerURL: '' };
const form = ref({ ...defaultForm });
let editingMovieId = null;
const API_URL = 'http://localhost:3000/api/movies';
const searchQuery = ref('');
let debounceTimer;

const totalContent = computed(() => movies.value.length);
const latestYear = computed(() => {
    if (!movies.value.length) return 'N/A';
    const years = movies.value.map(m => parseInt(m.Year)).filter(y => !isNaN(y));
    return years.length ? Math.max(...years) : 'N/A';
});
const earliestYear = computed(() => {
    if (!movies.value.length) return 'N/A';
    const years = movies.value.map(m => parseInt(m.Year)).filter(y => !isNaN(y));
    return years.length ? Math.min(...years) : 'N/A';
});
const mostCommonGenre = computed(() => {
    if (!movies.value.length) return 'N/A';
    const genreCounts = movies.value.flatMap(m => (m.Genre || '').split(',').map(g => g.trim())).filter(g => g).reduce((acc, genre) => { acc[genre] = (acc[genre] || 0) + 1; return acc; }, {});
    if (Object.keys(genreCounts).length === 0) return 'N/A';
    return Object.keys(genreCounts).reduce((a, b) => genreCounts[a] > genreCounts[b] ? a : b);
});

async function fetchMovies() {
  try {
    loading.value = true;
    const params = new URLSearchParams();
    if (searchQuery.value) {
        params.append('search', searchQuery.value);
    }
    const response = await axios.get(`${API_URL}?${params.toString()}`);
    // Urutkan data berdasarkan judul (A-Z)
    movies.value = response.data.sort((a, b) => a.Title.localeCompare(b.Title));
  } catch (error) {
    console.error("Gagal mengambil data:", error);
    alert("Gagal mengambil data.");
  } finally {
    loading.value = false;
  }
}

watch(searchQuery, () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        fetchMovies();
    }, 300);
});

function openForm() {
  formMode.value = 'add';
  form.value = { ...defaultForm };
  editingMovieId = null;
  showForm.value = true;
}

function closeForm() {
  showForm.value = false;
}

async function handleSubmit() {
  try {
    if (formMode.value === 'add') {
      await axios.post(API_URL, form.value);
    } else {
      await axios.put(`${API_URL}/${editingMovieId}`, form.value);
    }
    closeForm();
    fetchMovies();
  } catch (error) {
    console.error("Gagal menyimpan:", error);
    alert("Gagal menyimpan. Periksa kembali data Anda.");
  }
}

function editMovie(movie) {
  formMode.value = 'edit';
  editingMovieId = movie.id || movie._id;
  Object.keys(form.value).forEach(key => {
    form.value[key] = movie[key] || '';
  });
  showForm.value = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteMovie(id) {
  if (confirm("Anda yakin ingin menghapus konten ini?")) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchMovies();
    } catch (error) {
      console.error("Gagal menghapus:", error);
      alert("Gagal menghapus.");
    }
  }
}

onMounted(fetchMovies);
</script>

<style scoped>
.form-enter-active { transition: all 0.4s ease-in-out; }
.form-leave-active { transition: all 0.3s ease-in-out; }
.form-enter-from, .form-leave-to { opacity: 0; transform: translateY(-20px); max-height: 0px; }
.form-enter-to, .form-leave-from { max-height: 1000px; opacity: 1; transform: translateY(0); }
</style>
