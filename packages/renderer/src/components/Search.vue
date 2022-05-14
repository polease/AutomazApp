<template>
  <div id="dd">
    hello here


    <v-autocomplete
      v-model="selectedSolution"
      v-model:search-input="problemHint"
      :items="matchingProblems"
      :item-text="(item) => item.problemStatement.description"
      :item-value="(item) => item.id"
      label="what problem you want to solve?"
      id="search"
      ref="search"
      prepend-icon="mdi-database-search"
      @keydown.enter="execute"
      @update:search="find"
      v-focus
    >
    </v-autocomplete>

    <div class="matching-problems" v-for="problem in matchingProblems">
      <div>{{ problem.problemStatement.title }}</div>
    </div>

    <div class="system-info">
      {{ executionInfo }}
      <mazolution ref="mazolution"></mazolution>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "underscore";
import {ref, computed} from 'vue'


import type { ProblemSolution, ProblemSearchInfo } from "../../types/Solution";
import log from "../../types/log";
import Engine from "../../types/Engine";
import mazolution from "./Mazolution.vue";
import SolutionDB from "./../../types/SolutionDB"; 


var engine = new Engine();

export default {
  
  data() {
    return {
      problemHint: "",
      matchingProblems: [],
      selectedSolution: null,
      executionInfo: null,
    };
  },
  components: {
    mazolution: mazolution,
  },

  directives: { focus },
  watch: {
    selectedSolution(val) {
      console.log(val);
      //this.find();
    },
    problemHint(val) {
      console.log(val);
      //this.find();
    },
  },
  mounted() {
    this.matchingProblems = SolutionDB.find(this.problemHint);
    console.log("created" + this.matchingProblems.length);
  },
  methods: {
    find() {
      console.info("find" + this.problemHint);
      this.matchingProblems = SolutionDB.find(this.problemHint);
      console.log("find count " + this.matchingProblems.length);
      if (
        this.matchingProblems &&
        this.matchingProblems.length > 0 &&
        this.matchingProblems[0].solution
      )
        this.selectedSolution = this.matchingProblems[0].solution;
    },
    execute() {
      console.info("execute" + this.selectedSolution);
      if (this.selectedSolution) {
        //switch driver
        //ipcRenderer.send("set-driver", "editor");

        //BrowserWindow.getFocusedWindow().hide();

        var result = null;
        //todo: check environment first
        _.each(
          this.selectedSolution.steps,
          function (step, index) {
            engine.execute(step);
            //this.executionInfo = result;
          },
          this
        );
      }
    },
  },
};
</script>
