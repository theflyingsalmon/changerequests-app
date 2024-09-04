<template>
  <div>
    <h2>Change Requests</h2>
    <table style="width:100vw">
      <thead>
        <tr>
          <!-- <th>Status</th> -->
          <th>Title</th>
          <th>Description</th>
          <th>Priority</th>
          <th>Category</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody style="text-align: center;">
        <tr v-for="change in changes" :key="change.id">
          <!-- <td>{{ change.status }}</td> -->
          <td>{{ change.title }}</td>
          <td>{{ change.description }}</td>
          <td>{{ change.priority }}</td>
          <td>{{ change.category }}</td>
          <td>
            <button @click="updateStatus(change.id, 'Approved')">Approve</button>
            <button @click="updateStatus(change.id, 'Rejected')">Reject</button>
            <button @click="deleteChange(change.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ChangeList',
  props: {
    //changes: Array,
  },
  data(){
    return{
      changes: [],
    };
  },
  created(){
    this.getRequests();
  },
  methods: {
    async updateStatus(id) {
      try {
        await axios.put(`https://localhost:44336/api/ChangeRequests`, {
            id: id,
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
        this.title = '';
        this.description = '';
        this.$emit('change-added');
      } catch (error) {
        console.error('Error submitting change:', error);
      }
    },
    async deleteChange(id) {
      try{
        let response = await axios.delete(`https://localhost:44336/api/ChangeRequests/${id}`)
        if (response.status !== 204){
          console.log('Bad juju');
        }
        window.location.reload();
      } catch(error) {
        console.error('Error deleting requests:', error);
      }
    },
    async getRequests(){
      try{
        let response = await axios.get('https://localhost:44336/api/ChangeRequests')
        if (response.status !== 200){
          console.log('Bad juju');
        }
        this.changes = response.data;
      } catch {
        console.error('Error getting requests');
      }
    }
  },
}
</script>