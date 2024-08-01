import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import videosSlice from "./videosSlice";
import channelsSlice from "./channelsSlice";
import searchSlice from "./searchSlice";
import commentsSlice from "./commentsSlice";
import categorySlice from "./categorySlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    videos: videosSlice,
    categories: categorySlice,
    search: searchSlice,
    channels: channelsSlice,
    comments: commentsSlice
  }
})

export default store;