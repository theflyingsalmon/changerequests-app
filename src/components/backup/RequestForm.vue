<template>
  <div class="container">
    <h2>Submit a Change Request</h2>
  </div>
  <div class="container">
    
    <form @submit.prevent="submitChange">
      <input v-model="userid" placeholder="UserID" required>
      <input v-model="title" placeholder="Title" required>
      <textarea v-model="description" placeholder="Description" required></textarea>
      <input v-model="priority" placeholder="Priority" required>
      <input v-model="category" placeholder="Category" required>

      <button type="submit">Submit</button>
    </form>


  </div>
  
</template>

<script>
import axios from 'axios'

export default {
  name: 'RequestForm',
  setup() {
  },
  data() {
    return {
      userid:'',
      title: '',
      description: '',
      priority: 0,
      category: ''
    }
  },
  methods: {
    async submitChange() {
      try {
        await axios.post('https://localhost:44336/api/ChangeRequests', {
            userid: this.userid,
            title: this.title,
            description: this.description,
            priority: this.priority,
            category: this.category,
        }, {
          headers: {
            //Authorization: `Bearer ${token}`
          }
        });
        window.location.reload();
      } catch (error) {
        console.error('Error submitting change:', error);
      }
    }
  }
}
</script>