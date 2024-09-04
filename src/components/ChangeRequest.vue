<template>
    <div class="change-request-form container">
      <h2>{{ isEdit ? 'Edit Change Request' : 'Create Change Request' }}</h2>
      <form @submit.prevent="submitForm">
        <div class="col p-2">
          <div class="col"><label for="status">Status:</label></div>
          <select v-model="changeRequest.status" id="status" required>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div v-if="!isEdit" class="col p-2">
          <div class="col"><label for="userId">User ID:</label></div>
          <div class="col"><input  v-model="changeRequest.userId" id="userId" required /></div>
        </div>
        <div v-else></div>
        <div class="col">
          <div class="col"><label for="title">Title:</label></div>
          <div class="col"><input type="text" v-model="changeRequest.title" id="title" required /></div>
        </div>
        <div class="col">
          <div class="col"><label for="description">Description:</label></div>
          <div class="col"><textarea v-model="changeRequest.description" id="description" required></textarea></div>
        </div>
        <div>
          <label for="priority">Priority:</label>
          <select v-model="changeRequest.priority" id="priority" required>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label for="category">Category:</label>
          <select v-model="changeRequest.category" id="priority" required>
            <option value="Bug Fix">Bug Fix</option>
            <option value="Feature Request">Feature Request</option>
          </select>
        </div>
        <button class="btn btn-primary m-2" type="submit">{{ isEdit ? 'Update' : 'Create' }}</button>
        <button class="btn btn-danger m-2" type="button" @click="resetForm">Reset</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      existingRequest: {
        type: Object,
        default: () => null,
      },
    },
    data() {
      return {
        changeRequest: this.existingRequest || {
          userId: '',
          title: '',
          description: '',
          priority: 'Low',
          category: '',
          status: 'Pending'
        },
      };
    },
    computed: {
      isEdit() {
        return !!this.existingRequest;
      },
    },
    methods: {
      submitForm() {
        this.$emit('submit', this.changeRequest);
      },
      resetForm() {
        this.changeRequest = this.existingRequest || {
          userId: '',
          title: '',
          description: '',
          priority: 'Low',
          category: '',
          status: 'Pending'
        };
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add some basic styling */
  </style>
  