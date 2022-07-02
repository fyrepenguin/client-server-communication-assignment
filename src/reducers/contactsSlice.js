import { createSlice } from '@reduxjs/toolkit'
import contactsData from '../data/contacts.json'
import { login } from './authSlice';
const initialState = [...contactsData]

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    createContact: (state, action) => {
      return [...state, action.payload]
    },
    deleteContact: (state, action) => {
      return state.filter(contact => contact.email !== action.payload)
    },
    updateContact: (state, action) => {
      return state.map(contact => {
        if (contact.email === action.payload.email) {
          return { ...contact, ...action.payload }
        }
        return contact
      }
      )
    },
  },
  extraReducers: {
    [login]: (state, action) => {
      return state = [{ firstName: 'You', email: action.payload }, ...state]
    }

  }
})

// Action creators are generated for each case reducer function
export const { createContact, deleteContact, updateContact } = contactsSlice.actions

export default contactsSlice.reducer