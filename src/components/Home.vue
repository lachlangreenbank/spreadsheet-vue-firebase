<template>
  <div>
    <div v-if="authenticated">
        <SpreadSheet/>
    </div>
    <h4 v-if="!authenticated">
      You are not logged in! Please <a @click="auth.login()">Log In</a> to continue.
    </h4>
  </div>
</template>

<script>
  import SpreadSheet from './SpreadSheet'
  export default {
    name: 'home',
    props: ['auth', 'authenticated'],
    components: {
      SpreadSheet
    }
  }
</script>

<style>
  a {
    cursor: pointer;
  }
</style>

