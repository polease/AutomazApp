<template>
  <div>
    {{ info }}
  </div>
</template>

<script lang="ts">
import _ from "underscore";
import Engine from "../../types/Engine";
import type { ProblemSolution } from "../../types/Solution";
import "../../../renderer/src/index"; 
import {sleep} from "../../types/util"

var engine = new Engine();

export default {
  methods: {
    execute: async function () {
      //switch driver
      window.api.send("set-driver", "editor");

      
     

      //BrowserWindow.getFocusedWindow().hide();

      var result = null;
      //todo: check environment first
      for(var step of this.problemSolution.steps)
          await engine.execute(step);
          //this.executionInfo = result;
         
          
    },
  },
  expose: ["execute"],
  props: {
    problemSolution: { type: Object as () => ProblemSolution },
  },
  data() {
    return {};
  },
};
</script>
