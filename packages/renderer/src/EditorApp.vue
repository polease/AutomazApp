
<template>     
    <code-editor ref="codeEditor" height="400px"
    v-model="code" 
    language="typescript" />
    <v-btn id="btnExecute" @click="execute"> Execute Code </v-btn>
</template>

<script lang="ts"  > 
import CodeEditor from "./components/CodeEditor.vue";

 
 
import _ from "underscore";
import { ref, computed } from "vue";

import type { ProblemSolution, ProblemSearchInfo } from "../types/Solution";
import log from "../types/log";
import  "./components/CodeEditor.vue"; 
import Log from '../types/log';

export default {
  data() {
    return {
       code : null
    };
  },
  setup: () => {
    const codeEditor = ref<InstanceType<typeof CodeEditor>>();
    return {
      codeEditor,
    };
  },
  components: {
    codeEditor: CodeEditor,
  },

  directives: { focus },
  watch: {
    // selectedSolution(val) {
    //   console.log(val);
    //   //this.find();
    // },
  },
  mounted() {},
  methods: {
      
    async execute() {
        window.autoWeb.executeJavaScript(this.code);
        Log.info("execute " + this.code);
       
    },
  },
};
</script>


<style></style>
