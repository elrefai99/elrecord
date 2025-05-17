<template>
  <form @submit.prevent="submitForm" class="space-y-4">
    <input v-model="form.fullname" placeholder="Full Name" class="input" />
    <input v-model="form.email" type="email" placeholder="Email" class="input" />
    <input v-model="form.password" type="password" placeholder="Password" class="input" />
    <input v-model="form.code" placeholder="Code" class="input" />
    <input v-model="form.phone" placeholder="Phone Number" class="input" />
    <button type="submit" class="btn">Sign Up</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import axiosInstance from '../services/axios'

// بيانات النموذج
const form = ref({
  fullname: '',
  email: '',
  password: '',
  code: '',
  phone: ''
})

// إرسال البيانات
const submitForm = async () => {
  try {
    const res = await axiosInstance.post('/v1/auth/register', form.value)
    console.log('Registration success:', res.data)
  } catch (err) {
    console.error('Registration failed:', err)
  }
}
</script>

<style scoped>
.input {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.btn {
  padding: 0.5rem 1rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 6px;
}
</style>
