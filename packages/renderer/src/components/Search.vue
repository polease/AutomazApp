<template>
  <div id="dd">
    hello here

    <!-- <v-autocomplete
      v-model="selectedSolution"
      v-model:search-input="problemHint"
      :items="matchingSolutions"
      item-text="solutionOverview"
      item-value="solutionId"
      label="what problem you want to solve?"
      id="search"
      ref="search"
      prepend-icon="mdi-database-search"
      @keydown.enter="execute"
      @update:search="find"
      v-focus
    >
    </v-autocomplete> -->
    <v-text-field
      v-model="problemHint"
      :prepend-icon="icon"
      maxlength="100"
      hint="Searching for solution created by smart people around you..."
      label="what problem you want to solve?"
      @keydown.enter="execute"
    ></v-text-field>
    <v-card class="mx-auto" tile>
      <v-list-item lines="two" v-for="solution in matchingSolutions">
        <v-list-item-header>
          <v-list-item-title>{{
            solution.fixingProblem.title
          }}</v-list-item-title>
          <v-list-item-subtitle>{{
            solution.solutionOverview
          }}</v-list-item-subtitle>
        </v-list-item-header>
      </v-list-item>
    </v-card>

    <div class="system-info">
      {{ executionInfo }}
      <mazolution
        ref="mazolution"
        :problemSolution="selectedSolution"
      ></mazolution>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "underscore";
import { ref, computed } from "vue";

import type { ProblemSolution, ProblemSearchInfo } from "../../types/Solution";
import log from "../../types/log";
import Mazolution from "./Mazolution.vue";
import SolutionDB from "./../../types/SolutionDB";

export default {
  data() {
    return {
      problemHint: "",
      matchingSolutions: [],
      selectedSolution: null,
      problemSolutionToEngine: null,
    };
  },
  setup: () => {
    const mazolution = ref<InstanceType<typeof Mazolution>>();
    return {
      mazolution,
    };
  },
  components: {
    mazolution: Mazolution,
  },

  directives: { focus },
  watch: {
    selectedSolution(val) {
      console.log(val);
      //this.find();
    },
    problemHint(val) {
      console.log(val);
      this.find();
    },
  },
  mounted() {},
  methods: {
    find() {
      console.info("find" + this.problemHint);
      this.matchingSolutions = SolutionDB.find(this.problemHint);
      console.log("find count " + this.matchingSolutions.length);
      if (
        this.matchingSolutions &&
        this.matchingSolutions.length > 0 &&
        this.matchingSolutions[0].steps
      )
        this.selectedSolution = this.matchingSolutions[0];
    },
    execute() {
      console.info("execute" + this.selectedSolution);
      if (this.selectedSolution) {
        this.mazolution.execute();
      }
    },
  },
};
</script>
