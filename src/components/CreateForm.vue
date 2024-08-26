<template>
  <div class="row">
    <div class="col-md-7 col-lg-8">
      <div class="align-check">
      <InputText class="mr-2" id="formName" type="text" v-model="formName" placeholder="Form Name"/>
      <div class="setMargin">
        <InputText class="mr-2" id="ques" type="text" v-model="question" placeholder="Question"/>
        <DropDown v-model="ansType" :options="availableTypes" optionLabel="name" placeholder="Select Type" />
        <PButton label="Add Ques" @click="addQues"/>
      </div>
      {{ ansOptions.length>0? ansOptions : '' }}
      <div v-if="ansType && ansType.name!='Text'">
        <InputText class="mr-2" id="ques" type="text" v-model="ansOption" placeholder="Answer Option"/>
        <PButton label="Add Option" @click="addOption"/>
      </div>
      <DataTable :value="allQuestions">
        <PColumn field="ques" header="Question"></PColumn>
        <PColumn field="ansType" header="Answer Type"></PColumn>
        <PColumn field="ansOptions" header="Answer Option"></PColumn>
      </DataTable>
      <PButton label="Submit Form" @click="submitForm"/>
  </div>
    </div>
    <div class="col-md-5 col-lg-4 backgroundcolor">
      <h2>Form Preview</h2>
      <div v-for="(val, idx) in allQuestions" :key="idx">
        <div v-if="val.ansType === 'Text'" >
          <span class="align-left mt-4">{{ 'Q' + (idx + 1) + ': ' + val.ques }}</span>
          <InputText class="align-left" id="ques" type="text" v-model="answer" :disabled="true" placeholder="Kindly answer"/>
        </div>
        <div v-if="val.ansType === 'SingleSelect'">
          <span class="align-left mt-4">{{ 'Q' + (idx + 1) + ': ' + val.ques }}</span>
          <div v-for="(option, idx) of val.ansOptions" :key="idx" class="field-radiobutton align-left">
            <RadioButton :id="idx" name="category" :value="option" :disabled="true" />
            <label class="optionLabel" :for="idx">{{option}}</label>
          </div>
        </div>
        <div v-if="val.ansType === 'MultiSelect'" > 
          <span class="align-left mt-4">{{ 'Q' + (idx + 1) + ': ' + val.ques }}</span>
          <div v-for="(option, idx) of val.ansOptions" :key="idx" class="field-radiobutton align-left">
            <CheckBox :id="idx" name="category" :value="option" :disabled="true" />
            <label class="optionLabel" :for="idx">{{option}}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>
  
<script>
  // import Axios from "axios";
  import {mapActions} from 'vuex'
  // import Vue from 'vue'
  export default {
      name: 'CreateForm',
      props: {
        msg: String
      },
      data() {
        return {
          question: '',
          availableTypes: [{name: 'Text', code: 'Text'}, {name: 'Single Select', code: 'SingleSelect'},{name: 'Multi Select', code: 'MultiSelect'}],
          ansType: '',
          allQuestions: [],
          ansOptions: [],
          formName: ''
        }
      },
      methods: {
        ...mapActions(['createForm', 'fetchInfo']),
        initState() {
          this.question = ''
          this.ansType = ''
          this.ansOptions = []
        },
        addQues() {
          if(this.question && this.ansType.code) {
            const quesConfig = {
            ques: this.question,
            ansType: this.ansType.code,
            ansOptions: this.ansOptions
          }
          this.allQuestions.push(quesConfig)
          this.initState()
          }
        },
        addOption() {
          console.log(this.ansOption)
          this.ansOptions.push(this.ansOption)
          this.ansOption = ''
        },
        async submitForm() {
          const formData = {
            config: this.allQuestions,
            name: this.formName
          }
          const response = await this.createForm(formData)
          console.log('Response:::::::::::::', response)
          this.$router.push('/')
          // this.$
        },
        async mounted() {
          try {
            const formId = this.$route.query.id;
            if (formId) {
              let response = await this.fetchInfo(formId);
              console.log('Response', response)
              // The response was not rendering somehow but I am explaining what is to be done once I get the response
              // response is an object having id, name and config as keys with their respective values
              // Code will proceed like::::
              //-------------------------------------------------------------------------------------------------
              // this.formName = response.name
              // this.allQuestions = JSON.parse(response.config)
            }
          } catch (error) {
            console.error('Error in mounted hook:', error);
          }
        },
      }
  }
</script>
  
  <style scoped>
  .setMargin {
    margin-bottom: 10px;
    margin-top: 10px;
  }
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
  .div-background {
    height: 150px;
    width: 300px;
    align-items: center;
  }
  .align-check {
    align-content: center;
  }
  .backgroundcolor {
    background-color: #f3f2f1;
    min-height: 50rem;
  }
  .align-left {
    display: flex;
    align-items: flex-start;

  }
  .field-radiobutton {
    display: flex;
    margin-left: 2rem;
    /* justify-content:; */
  }
  .optionLabel {
    margin-left: 1rem;
  }
  </style>
