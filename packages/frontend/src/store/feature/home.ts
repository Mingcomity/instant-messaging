import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { HYDRATE } from 'next-redux-wrapper'

export interface IHomeInitalState {
  counter: number
}

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    counter: 10
  } as IHomeInitalState,
  reducers: {
    increment(state, { type, payload }) {
      state.counter += payload
    }
  },
  extraReducers: (builder) => {
    // Hydrate的操作，保证服务器端和客户端数据的一致性
    builder
      .addCase(HYDRATE, (state, action: any) => {
        // state -> initalStore
        // action.payload -> rootState
        return {
          ...state,
          ...action.payload.home
        }
      })
      .addCase(fetchSearchSuggest.fulfilled, (state, { payload }) => {
        state.counter = payload
      })
  }
})

// 异步的action
export const fetchSearchSuggest = createAsyncThunk(
  'fetchSearchSuggest',
  async () => {
    // 发起网络请求，拿到数据
    const res = await axios.get('')
    return res.data
  }
)

// 同步的action
export const { increment } = homeSlice.actions
export default homeSlice.reducer
