<template>
  <div>
    {{ info }}
  </div>
</template>

<script lang="ts" >

import _  from "underscore";  
import Engine from "../../types/Engine";
import type {ProblemSolution} from "../../types/Solution";
var engine = new Engine();
 


export default {
  methods: {
    execute : function(){
      window.nodeCrypto.sha256sum('data');
      //switch driver
        window.driver.send("set-driver", "editor");
       
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
  expose:['execute'],
  props: {
    problemSolution: {type: Object as () => ProblemSolution,}
  },
  data() {
    return {
      problemSolution : null,

    }
  },
};
</script>
