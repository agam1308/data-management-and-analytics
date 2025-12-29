import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await fetch('/api/users');
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  } catch (error) {
    console.warn("API unavailable, using mock data:", error);
    return [
      { id: 1, name: 'Demo User', email: 'demo@example.com', role: 'Admin', status: 'Active', created_at: new Date().toISOString() },
      { id: 2, name: 'Alice Smith', email: 'alice@example.com', role: 'Editor', status: 'Active', created_at: new Date().toISOString() },
      { id: 3, name: 'Bob Jones', email: 'bob@example.com', role: 'Viewer', status: 'Inactive', created_at: new Date().toISOString() },
    ];
  }
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
