import {
  ReturnUserInfoType,
  ReturnUserListType,
  getUserInfoApi,
  getUserListAPi, getMessageList, ReturnMessageListType
} from '@/service/homeApi'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {HYDRATE} from 'next-redux-wrapper'

export interface IHomeInitalState {
  friendList: ReturnUserListType
  userInfo: ReturnUserInfoType
  messageList: ReturnMessageListType
}

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    friendList: [],
    userInfo: {} as ReturnUserInfoType,
    messageList: []
  } as IHomeInitalState,
  reducers: {},
  extraReducers: (builder) => {
    // Hydrate的操作，保证服务器端和客户端数据的一致性
    builder
        .addCase(HYDRATE, (state, action: any) => {
          return {
            ...state,
            ...action.payload.home
          }
        })
        .addCase(fetchFriendList.fulfilled, (state, {payload}) => {
          state.friendList = payload.data
        })
        .addCase(fetchUserInfo.fulfilled, (state, {payload}) => {
          state.userInfo = payload.data
        })
        .addCase(fetchMessageList.fulfilled, (state, {payload}) => {
          state.messageList = payload.data
        })
  }
})

// 异步获取List
export const fetchFriendList = createAsyncThunk(
    'fetchFriendList',
    async (cookie: { session: string }) => {
      const headers = {Cookie: `session=${cookie.session}`}
      const res = await getUserListAPi(headers)
      return res.data
    }
)

// 异步获取List
export const fetchUserInfo = createAsyncThunk(
    'fetchUserInfo',
    async (cookie?: { session: string } | undefined) => {
      if (cookie) {
        const headers = {Cookie: `session=${cookie.session}`}
        const res = await getUserInfoApi(headers)
        return res.data
      } else {
        const res = await getUserInfoApi()
        return res.data
      }
    }
)

// 异步获取聊天记录
export const fetchMessageList = createAsyncThunk(
    'fetchMessageList',
    async (data?: { session: string, receiver: string } | undefined) => {
      if (data?.session) {
        const headers = {Cookie: `session=${data.session}`}
        const res = await getMessageList(data.receiver, headers)
        return res.data
      } else {
        const res = await getMessageList(data!.receiver)
        return res.data
      }
    }
)

// 同步的action
// export const { updateCookie } = homeSlice.actions
export default homeSlice.reducer
