<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h2>Sign In</h2>
      <form @submit.prevent="handleSignIn">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Sign In</button>
      </form>
      <button @click="close">Close</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps({
  visible: Boolean,
})

const emit = defineEmits(['update:visible', 'signed-in'])

const email = ref('')
const password = ref('')

function close() {
  emit('update:visible', false)
}

function handleSignIn() {
  // هنا تضيف كود التحقق من بيانات تسجيل الدخول (API مثلاً)
  console.log('Signing in with:', email.value, password.value)
  // بعد نجاح تسجيل الدخول:
  emit('signed-in', { email: email.value })
  close()
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
}
</style>
