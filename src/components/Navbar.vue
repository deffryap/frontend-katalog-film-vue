<template>
  <nav class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm dark:shadow-none border-b border-slate-200 dark:border-slate-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <router-link to="/" class="text-slate-900 dark:text-white font-bold text-xl">Katalog Film</router-link>
        <div class="flex items-center gap-2 sm:gap-4">
          <button @click="toggleTheme" class="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          </button>
          
          <!-- Tampilkan link Home dan Admin hanya jika sudah login -->
          <router-link v-if="auth.isAuthenticated" to="/" class="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</router-link>
          <router-link v-if="auth.isAuthenticated" to="/admin" class="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Admin</router-link>

          <!-- Tampilkan tombol Logout atau Login -->
          <button v-if="auth.isAuthenticated" @click="auth.logout()" class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button>
          <router-link v-else to="/login" class="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-2 rounded-md text-sm font-medium">Admin</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
const auth = useAuthStore();
const isDarkMode = ref(false);

onMounted(() => {
  isDarkMode.value = document.documentElement.classList.contains('dark');
});

function toggleTheme() {
  if (document.documentElement.classList.toggle('dark')) {
    localStorage.theme = 'dark';
    isDarkMode.value = true;
  } else {
    localStorage.theme = 'light';
    isDarkMode.value = false;
  }
}
</script>
