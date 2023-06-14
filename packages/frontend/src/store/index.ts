import { configureStore } from '@reduxjs/toolkit'
import homeReducer from './feature/home'
import { createWrapper } from 'next-redux-wrapper'

const store = configureStore({
  reducer: {
    home: homeReducer
  }
})

const wrapper = createWrapper(() => store)
export default wrapper

export type IAppDispatch = typeof store.dispatch
// rootState的类型
export type IAppRootState = ReturnType<typeof store.getState>
