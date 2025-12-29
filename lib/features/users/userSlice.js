import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('/api/users');
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
