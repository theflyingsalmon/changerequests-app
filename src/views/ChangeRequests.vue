<template>
  <div class="container">
    <div class="container p-2">
      <h1>Change Requests</h1>
      <button class="btn btn-primary" @click="showCreateForm">Create New Request</button>
    </div>

    <ChangeRequest
      v-if="isFormVisible"
      :existingRequest="currentRequest"
      @submit="handleFormSubmit"
    />

    <div class="container">
      <table class="table">
        <thead class="">
          <tr>
            <th>Status</th>
            <th>User ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Category</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody class="">
          <tr v-for="request in sortedChangeRequests" :key="request.id">
            <td class="align-middle"><span class="badge rounded-pill status p-2" :class="request.status">{{ request.status }}</span></td>
            <td class="align-middle">{{ request.userId }}</td>
            <td class="align-middle">{{ request.title }}</td>
            <td class="align-middle">{{ request.description }}</td>
            <td class="align-middle">{{ request.priority }}</td>
            <td class="align-middle">{{ request.category }}</td>
            <td >
              <button class="btn btn-warning m-2" @click="editRequest(request)">Edit</button>
              
              <button class="btn btn-danger m-2" @click="deleteRequest(request.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    
  </div>
</template>

<script>
import axios from 'axios';
import ChangeRequest from '@/components/ChangeRequest.vue';

export default {
  components: {
    ChangeRequest,
  },
  data() {
    return {
      changeRequests: [],
      isFormVisible: false,
      currentRequest: null,
    };
  },
  computed: {
    sortedChangeRequests() {
      const priorityMapping = {
        'High': 3,
        'Medium': 2,
        'Low': 1,
      };

      return [...this.changeRequests].sort((a, b) => {
        return priorityMapping[b.priority] - priorityMapping[a.priority];
      });
    },
  },
  methods: {
    async fetchChangeRequests() {
      try {
        const response = await axios.get('changerequests-api-fsbnhbb3gbccfbgw.ukwest-01.azurewebsites.net/api/ChangeRequests');
        this.changeRequests = response.data;
      } catch (error) {
        console.error('Error fetching change requests:', error);
      }
    },
    showCreateForm() {
      this.currentRequest = null;
      this.isFormVisible = true;
    },
    async handleFormSubmit(request) {
      if (this.currentRequest) {
        // Update existing request
        await this.updateRequest(request);
      } else {
        // Create new request
        await this.createRequest(request);
      }
      this.isFormVisible = false;
      this.fetchChangeRequests();
    },
    async createRequest(request) {
      try {
        await axios.post('changerequests-api-fsbnhbb3gbccfbgw.ukwest-01.azurewebsites.net/api/ChangeRequests', request);
      } catch (error) {
        console.error('Error creating change request:', error);
      }
    },
    async updateRequest(request) {
      try {
        await axios.put(`changerequests-api-fsbnhbb3gbccfbgw.ukwest-01.azurewebsites.net/api/ChangeRequests/${request.id}`, request);
      } catch (error) {
        console.error('Error updating change request:', error);
      }
    },
    async deleteRequest(id) {
      try {
        await axios.delete(`changerequests-api-fsbnhbb3gbccfbgw.ukwest-01.azurewebsites.net/api/ChangeRequests/${id}`);
        this.fetchChangeRequests();
      } catch (error) {
        console.error('Error deleting change request:', error);
      }
    },
    editRequest(request) {
      this.currentRequest = { ...request };
      this.isFormVisible = true;
    },
  },
  mounted() {
    this.fetchChangeRequests();
  },
};
</script>

<style scoped>
/* Add some basic styling */

.status.Pending { background-color: #ffc107}
.status.Accepted {background-color: #28a745}
.status.Rejected {background-color: #dc3545}
</style>
