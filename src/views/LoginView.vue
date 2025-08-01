<template>
  <div class="max-w-md mx-auto mt-10">
    <div class="bg-slate-800 p-8 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6">Login Admin</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="username" class="block text-gray-300 mb-2">Username</label>
          <input v-model="username" type="text" id="username" class="w-full p-3 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" required>
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-300 mb-2">Password</label>
          <input v-model="password" type="password" id="password" class="w-full p-3 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" required>
        </div>
        <button type="submit" class="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-lg transition-colors">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const username = ref('');
const password = ref('');
const auth = useAuthStore();

const handleLogin = () => {
  auth.login({ username: username.value, password: password.value });
};
</script>
