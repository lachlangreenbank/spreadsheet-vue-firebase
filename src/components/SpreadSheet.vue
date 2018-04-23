<template>
  <div>
    <div>
      <button
        class="btn btn-success btn-margin"
        @click="addRow" style="margin-top:-10px; margin-bottom:10px;">
          Add row
      </button>
      <Spreadsheet v-if="spreadsheetRready" :data="demoBasic.data" :header="demoBasic.header"  @update="onUpdate"/>
    </div>
  </div>
</template>

<script>
import Spreadsheet from '@anydown/vue-spreadsheet-lite'
import '@anydown/vue-spreadsheet-lite/dist/vue-spreadsheet-lite.css'

import {db} from '../firebase'
import firebase from 'firebase'

const example = [...Array(20).keys()]
  .map(i => `A${i} B${i} C${i} D${i}`)
  .join('\n')

export default {
  name: 'app',
  components: {
    Spreadsheet
  },
  computed: {
    gridData () {
      return this.dataSrc.split('\n').map(s => s.split(' '))
    },
    currentUser: function () {
      // TODO save the response auth token from login/signup in vuex and check agaist it on login
      if (firebase.auth().currentUser === null) {
        return false
      } else {
        return firebase.auth().currentUser
      }
    }
  },
  created: function () {
    // getting the users contracts fir the left drawer
    let self = this
    const dataRef = 'data'
    this.dataRef = db.ref(dataRef)
    this.dataRef.on('value', function (snapshot) {
      console.log(snapshot.val())
      self.demoBasic.data = snapshot.val()
      console.log(snapshot.val())
      if (snapshot.val() !== null) {
        self.spreadsheetRready = true
      }
    }, function (errorObject) {
      console.log('The contract path read failed: ' + errorObject.code)
    })
  },
  methods: {
    toObject: function (arr) {
      var rv = {}
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== undefined) rv[i] = arr[i]
      }
      return rv
    },
    onUpdate (data) {
      console.log(data)
      if (data) {
        let output = data.map(s => s.join(' ')).join('\n')
        this.dataSrc = output
        data = this.toObject(data)
        console.log(data)
        let dataRef = firebase.database().ref('data')
        dataRef.update(data, function (snapshot, err) {
          if (err) {
            console.log('ERRRR')
            console.log(err)
          } else {
            // console.log(snapshot.val())
            console.log('Data updated sucessfully')
          }
        })
      }
    },
    addRow () {
      if (this.demoBasic.data === null) {
        this.demoBasic.data = [['', '', '', '', '', '', '']]
        this.spreadsheetRready = true
      } else {
        this.demoBasic.data.push(['', '', '', '', '', '', ''])
      }
    }
  },
  data () {
    return {
      demoBasic: {
        header: [
          { name: 'Name', width: 200 },
          { name: 'File Name', width: 200 },
          { name: 'Material', width: 200 },
          { name: 'Size', width: 200 },
          { name: 'No. Copies', width: 200 },
          { name: 'Ready to cut', width: 200 },
          { name: 'Notes', width: 200 }
        ],
        data: [
          []
        ]
      },
      archive: {
        header: [
          { name: 'Name', width: 200 },
          { name: 'File Name', width: 200 },
          { name: 'Material', width: 200 },
          { name: 'Size', width: 200 },
          { name: 'No. Copies', width: 200 },
          { name: 'Ready to cut', width: 200 },
          { name: 'Notes', width: 200 }
        ],
        data: [
          []
        ]
      },
      dataSrc: example,
      spreadsheetRready: false
    }
  }
}
</script>
<style type="text/css">

  rect {
    fill:white;
    fill:#fff;
    stroke:#999;
    shape-rendering:crispEdges
  }
  .pane {
   display:-ms-flexbox;
   display:flex
  }
  #app {
   margin:1rem
  }
  textarea {
   width:20rem;
   background:#333;
   color:#fff
  }
  .right {
   -ms-flex:1;
   flex:1
  }
  rect {
   fill:#fff;
   stroke:#999;
   shape-rendering:crispEdges
  }
  .selection {
   fill:none;
   stroke:#9e37ff;
   stroke-width:3px
  }
  .col-header {
   fill:#eee
  }
  .col-header{
   fill:#eee
  }
  .col-header__resize {
   cursor:col-resize;
   opacity:0
  }
  .col-header__resize:hover {
   cursor:col-resize;
   fill:#9e37ff;
   opacity:.5
  }
  .col-header__resize.active {
   fill:#9e37ff;
   opacity:.5
  }
  .grid {
   position:relative;
   background:#eee;
   width:100%
  }
  .editor__frame {
   position:absolute;
   overflow:hidden;
   height:20px;
  }
  .editor__frame {
   transform: translate(1px, 2px) scale(0.98);
   position: absolute;
  }
  text {
   dominant-baseline:central;
   -webkit-user-select:none;
   -moz-user-select:none;
   -ms-user-select:none;
   user-select:none
  }
  input {
   border:none;
   box-sizing:border-box;
   outline:0;
   margin-left:2px
  }
  svg {
   display:block;
   width:100% !important;
  }
  .editor__textarea {
   opacity:0;
   width:100%;
   height:20px;
  }
  .editor--visible {
   opacity:1;
   background-color: white;
  }
  /*!
   * Bootstrap Reboot v4.0.0 (https://getbootstrap.com)
   * Copyright 2011-2018 The Bootstrap Authors
   * Copyright 2011-2018 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * Forked from Normalize.css, licensed MIT (https://github.com/necolas/normalize.css/blob/master/LICENSE.md)
   */*,:after,:before {
   box-sizing:border-box
  }
  html {
   font-family:'Roboto' sans-serif;
   line-height:1.15;
   -webkit-text-size-adjust:100%;
   -ms-text-size-adjust:100%;
   -ms-overflow-style:scrollbar;
   -webkit-tap-highlight-color:transparent
  }
  @-ms-viewport {
   width:device-width
  }
  article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section {
   display:block
  }
  body {
   margin:0;
   font-family:-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Arial,sans-serif;
   font-size:1.2rem;
   font-weight:400;
   line-height:1.5;
   color:#212529;
   text-align:left;
   background-color:#fff
  }
  [tabindex="-1"]:focus {
   outline:0!important
  }
  hr {
   box-sizing:content-box;
   height:0;
   overflow:visible
  }
  h1,h2,h3,h4,h5,h6 {
   margin-top:0;
   margin-bottom:.5rem
  }
  p {
   margin-top:0;
   margin-bottom:1rem
  }
  abbr[data-original-title],abbr[title] {
   text-decoration:underline;
   -webkit-text-decoration:underline dotted;
   text-decoration:underline dotted;
   cursor:help;
   border-bottom:0
  }
  address {
   font-style:normal;
   line-height:inherit
  }
  address,dl,ol,ul {
   margin-bottom:1rem
  }
  dl,ol,ul {
   margin-top:0
  }
  ol ol,ol ul,ul ol,ul ul {
   margin-bottom:0
  }
  dt {
   font-weight:700
  }
  dd {
   margin-bottom:.5rem;
   margin-left:0
  }
  blockquote {
   margin:0 0 1rem
  }
  dfn {
   font-style:italic
  }
  b,strong {
   font-weight:bolder
  }
  small {
   font-size:80%
  }
  sub,sup {
   position:relative;
   font-size:75%;
   line-height:0;
   vertical-align:baseline
  }
  sub {
   bottom:-.25em
  }
  sup {
   top:-.5em
  }
  a {
   color:#007bff;
   text-decoration:none;
   background-color:transparent;
   -webkit-text-decoration-skip:objects
  }
  a:hover {
   color:#0056b3;
   text-decoration:underline
  }
  a:not([href]):not([tabindex]),a:not([href]):not([tabindex]):focus,a:not([href]):not([tabindex]):hover {
   color:inherit;
   text-decoration:none
  }
  a:not([href]):not([tabindex]):focus {
   outline:0
  }
  code,kbd,pre,samp {
   font-family:monospace,monospace;
   font-size:1em
  }
  pre {
   margin-top:0;
   margin-bottom:1rem;
   overflow:auto;
   -ms-overflow-style:scrollbar
  }
  figure {
   margin:0 0 1rem
  }
  img {
   vertical-align:middle;
   border-style:none
  }
  svg:not(:root) {
   overflow:hidden;
   width:100%;
  }
  table {
   border-collapse:collapse
  }
  caption {
   padding-top:.75rem;
   padding-bottom:.75rem;
   color:#6c757d;
   text-align:left;
   caption-side:bottom
  }
  th {
   text-align:inherit
  }
  label {
   display:inline-block;
   margin-bottom:.5rem
  }
  button {
   border-radius:0
  }
  button:focus {
   outline:1px dotted;
   outline:5px auto -webkit-focus-ring-color
  }
  button,input,optgroup,select,textarea {
   margin:0;
   font-family:inherit;
   font-size:inherit;
   line-height:inherit
  }
  button,input {
   overflow:visible
  }
  button,select {
   text-transform:none
  }
  [type=reset],[type=submit],button,html [type=button] {
   -webkit-appearance:button
  }
  [type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner {
   padding:0;
   border-style:none
  }
  input[type=checkbox],input[type=radio] {
   box-sizing:border-box;
   padding:0
  }
  input[type=date],input[type=datetime-local],input[type=month],input[type=time] {
   -webkit-appearance:listbox
  }
  textarea {
   overflow:auto;
   resize:vertical
  }
  fieldset {
   min-width:0;
   padding:0;
   margin:0;
   border:0
  }
  legend {
   display:block;
   width:100%;
   max-width:100%;
   padding:0;
   margin-bottom:.5rem;
   font-size:1.5rem;
   line-height:inherit;
   color:inherit;
   white-space:normal
  }
  progress {
   vertical-align:baseline
  }
  [type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button {
   height:auto
  }
  [type=search] {
   outline-offset:-2px;
   -webkit-appearance:none
  }
  [type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration {
   -webkit-appearance:none
  }
  ::-webkit-file-upload-button {
   font:inherit;
   -webkit-appearance:button
  }
  output {
   display:inline-block
  }
  summary {
   display:list-item;
   cursor:pointer
  }
  template {
   display:none
  }
  [hidden] {
   display:none!important
  }

</style>