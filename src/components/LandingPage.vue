<template>
    <div class="hello">
      <h1> Welcome to The Form Builder</h1>
      <PButton label="Create Form" @click="createForm"/>
      <DataTable :value="forms" class="mt-3">
        <PColumn field="id" header="ID" style="width: 10%"></PColumn>
        <PColumn field="name" header="Form Name" style="width: 30%"></PColumn>
        <PColumn header="View" :style="{ width: '10%' }">
          <template #body="slotProps">
            <i class="pi pi-eye action-icon" @click="viewDetails(slotProps.data)"></i>
          </template>
        </PColumn>
      </DataTable>
    </div>
</template>
  
<script>
    import {mapActions, mapState} from 'vuex'
    export default {
        name: 'LandingPage',
        props: {
          msg: String
        },
        methods: {
          ...mapActions(['fetchFormsList', 'fetchInfo']),
          createForm(){
            this.$router.push('/create-form')
          },
          viewDetails(form) {
            this.$router.push(`/create-form?id=${form.id}`)
          }
        },
        computed: {
          ...mapState(['forms'])
        },
        async mounted() {
          await this.fetchFormsList()
        }
  }
</script>
  
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .action-icon {
    cursor: pointer;
    font-size: 1.2em;
    transition: color 0.3s; 
  }
  </style>
  