import { FETCH_SUCCESS, FETCH_FAILURE, PAGINATE_UPDATE, HANDLE_NEXT_PAGINATION, HANDLE_PREV_PAGINATION, SET_PAGE_CURRENT } from './action'

import paginate from '../ultils'
const initState = {
    isLoading: true,
    isError: false,
    followers: [],
    errorMessage: "",
    pageCurrent: 0,
    // mảng trên tổng 
    followersInPage: [],
    // mảng tổng khi được paginate
    arrPaginated: [],
}

const reducer = (state, action) => {
    switch (action.type) {
        case FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                followers: action.payload
            }
        case FETCH_FAILURE:
            return {
                ...state, isLoading: false,
                isError: true,
                errorMessage: action.payload
            }
        case PAGINATE_UPDATE:
            return {
                ...state, followersInPage: action.payload[state.pageCurrent],
                arrPaginated: action.payload
            }
        case SET_PAGE_CURRENT:
            return {
                ...state, pageCurrent: action.payload,
                followersInPage: state.arrPaginated[action.payload]
            }
        case HANDLE_NEXT_PAGINATION:
            return {
                ...state, pageCurrent: action.payload, followersInPage: state.arrPaginated[action.payload]
            }
        default:
            throw new Error(`No action matching with ${action.type}`)
    }
}

export default reducer
export { initState }