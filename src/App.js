import React, { useContext, useEffect } from 'react'
import useAxios from './CustomHooks/useAxios'
import Follower from './Follower'
import { GlobalContext } from './store/GlobalContext'
import {
  FETCH_SUCCESS, FETCH_FAILURE, PAGINATE_UPDATE, SET_PAGE_CURRENT, HANDLE_NEXT_PAGINATION,
  HANDLE_PREV_PAGINATION
} from './store/action'
import paginate from './ultils'

const url = 'https://api.github.com/users/john-smilga/followers?per_page=100'


const App = () => {
  const { dispatch, state } = useContext(GlobalContext);
  const { followers, isLoading, followersInPage, pageCurrent, arrPaginated } = state;
  console.log(pageCurrent);
  const { response, error } = useAxios(url);


  useEffect(() => {
    // nếu vẫn đang loading, tức là chưa lấy followers xong
    if (isLoading) {
      return;
    }
    // lấy xong rồi thì paginate
    else {
      dispatch({
        type: PAGINATE_UPDATE,
        payload: paginate(followers)
      })
    }
  }, [followers])

  useEffect(() => {
    // nếu response trả về khác null
    // mặc định ở bên kia nó là null, nếu không gặp lỗi
    // nó sẽ trả về giá trị là 1 object response 
    if (response !== null) {
      dispatch({
        type: FETCH_SUCCESS,
        payload: response.data
      })
    }
    // nếu có lỗi
    else {
      dispatch({
        type: FETCH_FAILURE,
        payload: error
      })
    }
  }, [response])

  const handleNextPage = () => {
    if (pageCurrent < arrPaginated.length - 1) {
      dispatch({
        type: HANDLE_NEXT_PAGINATION,
        payload: pageCurrent + 1
      })
    }
    else {
      dispatch({ type: HANDLE_NEXT_PAGINATION, payload: 0 })
    }
  }

  const handlePrevPage = () => {
    if (pageCurrent > 0) {
      dispatch({
        type: HANDLE_PREV_PAGINATION,
        payload: pageCurrent - 1
      })
    }
    else {
      dispatch({
        type: HANDLE_PREV_PAGINATION,
        payload: arrPaginated.length - 1
      })
    }
  }

  if (error) {
    return (
      <main>
        <div className="section-title">
          <h1>{error}</h1>
          <div className="underline"></div>
        </div>
      </main>
    )
  }
  return (
    <main>
      <div className="section-title">
        <h1>{isLoading ? "loading" : "pagination"}</h1>
        <div className="underline"></div>
      </div>
      <section className="followers">
        <div className="container">
          {followersInPage.map((follower) => {
            return <Follower key={follower.id} {...follower} />
          })}
        </div>
        {!isLoading && <div className="btn-container">
          <button onClick={() => {
            handlePrevPage();
          }} className="prev-btn">prev</button>
          {paginate(followers).map((item, index) => {
            return <button key={index} className={
              index === pageCurrent ? "page-btn active-btn" : "page-btn"
            }
              onClick={() => {
                dispatch({
                  type: SET_PAGE_CURRENT,
                  payload: index
                })
              }}
            >
              {index + 1}
            </button>
          })}
          <button onClick={() => {
            handleNextPage()
          }} className="next-btn">next</button>
        </div>}

      </section>
    </main>
  )

}

export default App