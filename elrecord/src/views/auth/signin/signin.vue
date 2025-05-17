<script setup>
import { ref } from 'vue'
import SignInModal from '../../../components/SignInModal.vue'

const showSignIn = ref(false)

function onSignedIn(user) {
  alert(`Welcome, ${user.email}!`)
  // هنا تقدر تحفظ حالة تسجيل الدخول مثلاً
}
</script>

<template>
  <button @click="showSignIn = true">Sign In</button>
  <SignInModal v-model:visible="showSignIn" @signed-in="onSignedIn" />
</template>
