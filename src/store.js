import { configureStore } from '@reduxjs/toolkit'
import chatsSlice from './reducers/chatsSlice';
import contactsSlice from './reducers/contactsSlice';
import authSlice from './reducers/authSlice';

export const store = configureStore({
  reducer: { chats: chatsSlice, contacts: contactsSlice, auth: authSlice },
})
