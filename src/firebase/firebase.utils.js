import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDehYjgQv3e9E0pfBl02lf0wnqg1-918yw",
    authDomain: "crwn-db-e091d.firebaseapp.com",
    databaseURL: "https://crwn-db-e091d.firebaseio.com",
    projectId: "crwn-db-e091d",
    storageBucket: "crwn-db-e091d.appspot.com",
    messagingSenderId: "1081988622747",
    appId: "1:1081988622747:web:641c4ca36d525a59c3d93e",
    measurementId: "G-VX30EBJ7KL"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    if(!snapShot.exists){
      const { displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email, 
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log("Error creating user", error.message)
      }
    }

    return userRef;
  }

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef)

    const batch = firestore.batch()
    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc()
      batch.set(newDocRef, obj)
    })

    return await batch.commit()
  }

  export const convertCollectonsSnapshotToMap = (collections) => {
    const transformedCollections = collections.docs.map(doc => {
      const { title, items } = doc.data()

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      }
    })

    return transformedCollections.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection
      return accumulator
    }, {})

  }

  firebase.initializeApp(config)


  export const auth = firebase.auth();
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'})
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase;