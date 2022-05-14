<template>
  <div>
    {{ info }}
  </div>
</template>

<script lang="ts" >

import _  from "underscore";
import SolutionDB from './../../types/SolutionDB'

export default {
  methods: {
    
  },
  data() {
    return {
      info: 'process.versions.electron',
      allSolutions : SolutionDB.allSolutions
    }
  },
};
</script>
