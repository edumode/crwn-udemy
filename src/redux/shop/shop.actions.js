import ShopActionsTypes from './shop.types'

import { firestore, convertCollectonsSnapshotToMap } from '../../firebase/firebase.utils'

export const fetchCollectionsStart = collectionMap => ({
    type: ShopActionsTypes.FETCH_COLLECTIONS_START,
    payload: collectionMap
})

export const fetchCollectionsSuccess = collectionMap => ({
    type: ShopActionsTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionMap
})

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionsTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections')
        dispatch(fetchCollectionsStart())
        
        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectonsSnapshotToMap(snapshot)
            dispatch(fetchCollectionsSuccess(collectionsMap))
        }).catch(error => dispatch(fetchCollectionsFailure(error.message)))
    }
}