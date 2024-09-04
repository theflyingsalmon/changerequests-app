<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input v-model="username" placeholder="Username" required>
        <input v-model="password" type="password" placeholder="Password" required>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'Log-in',
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('/auth/login', {
            username: this.username,
            password: this.password
          })
          localStorage.setItem('token', response.data.token)
          this.$emit('login-success')
        } catch (error) {
          console.error('Login failed:', error)
          // Handle login error (show message to user, etc.)
        }
      }
    }
  }
  </script>