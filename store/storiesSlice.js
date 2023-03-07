import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    stories: [],
    loaded: false,
}

export const storiesSlice = createSlice({
    name: 'stories',
    initialState,
    reducers: {
        updateStories: (state, { payload }) => {
            state.stories = payload;
            state.loaded = true;
        },
    },
});

export const { updateStories } = storiesSlice.actions;

export default storiesSlice.reducer;
