import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/common";

export const getChannelInfo = createAsyncThunk('channels/getChannelInfo', async (id, thunkAPI) => {
  try {
    const result = await axios(`${BASE_URL}/channels`, {
      params: {
        part: 'snippet,contentDetails,statistics',
        key: import.meta.env.VITE_YOUTUBE_API_KEY,
        id: id
      }
    })
    return result.data?.items[0];
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    isLoading: false,
    channelInfo: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChannelInfo.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getChannelInfo.fulfilled, (state, { payload }) => {
        state.channelInfo = payload;
        state.isLoading = false;
      }),
      builder.addCase(getChannelInfo.rejected, (state) => {
        state.isLoading = false;
      })
  }
})

export default channelsSlice.reducer;