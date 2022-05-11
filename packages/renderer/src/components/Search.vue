<template>
  <div id="dd">
    hello here
    <div class="demo-controls">
      <input
        class="demo-input"
        id="search"
        ref="search"
        aria-label="Click copy"
        @keyup="find"
        @keyup.enter="execute"
        v-model="problemHint"
        v-focus
        placeholder="what problem you want to solve?."
      />
    </div>
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
import type { ProblemSolution, ProblemSearchInfo } from "../../types/Solution";
import log from "../../types/log";
import Engine from "../../types/Engine";

import mazolution from "./Mazolution.vue";

//const { BrowserWindow } = require('@electron/remote')
const ipc = require("electron").ipcRenderer;
const _ = require("underscore");

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
  methods: {
    find() {
      this.matchingProblems = this.$refs.mazolution.find(this.problemHint);
      if (
        this.matchingProblems &&
        this.matchingProblems.length > 0 &&
        this.matchingProblems[0].solution
      )
        this.selectedSolution = this.matchingProblems[0].solution;
    },
    execute() {
      if (this.selectedSolution) {
        //switch driver
        const ipcRenderer = require("electron").ipcRenderer;
        ipcRenderer.send("set-driver", "editor");

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
