import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  apiKey: ' AIzaSyDy_llFClr2n0eEMy21Kn0x3hHB-xz22SY ',
  authDomain: 'https://spreadsheet-laser-cut.firebaseio.com/',
  databaseURL: 'https://spreadsheet-laser-cut.firebaseio.com/',
  projectId: 'spreadsheet-laser-cut',
  storageBucket: 'https://spreadsheet-laser-cut.firebaseio.com/'
})

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database()
