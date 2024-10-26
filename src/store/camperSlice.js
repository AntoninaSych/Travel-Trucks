import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';

const initialState = {
    campers: [],
    selectedCamper: null,
    status: 'idle',
    error: null,
    page: 1,
    savedFilters: {}, // State for saving filters
};

// Thunk to fetch list of campers with filters and pagination
export const fetchCampers = createAsyncThunk(
    'campers/fetchCampers',
    async ({ page, filters = {} }, thunkAPI) => {
        try {
            let query = `page=${page}&limit=5`;
            if (filters.location) query += `&location=${encodeURIComponent(filters.location)}`;
            Object.entries(filters.filters || {}).forEach(([key, value]) => {
                if (value) query += `&${key.toLowerCase()}=true`;
            });
            Object.entries(filters.vehicleType || {}).forEach(([key, value]) => {
                if (value) query += `&form=${encodeURIComponent(key)}`;
            });

            const response = await axios.get(`${BASE_URL}?${query}`);
            return { items: response.data.items, page, filters }; // Return items, page, and filters
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch campers';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

// Thunk to fetch detailed information about a single camper
export const fetchCamperDetails = createAsyncThunk(
    'campers/fetchCamperDetails',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch camper details';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

const campersSlice = createSlice({
    name: 'campers',
    initialState,
    reducers: {
        loadMore: (state) => {
            state.page += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCampers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCampers.fulfilled, (state, action) => {
                const { items, page, filters } = action.payload;
                state.status = 'succeeded';
                // Set campers or append new campers if it's a "load more" request
                state.campers = page === 1 ? items : [...state.campers, ...items];
                state.savedFilters = filters; // Save current filters
            })
            .addCase(fetchCampers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchCamperDetails.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.selectedCamper = null; // Clear previous data
            })
            .addCase(fetchCamperDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Ensure features is an array if it's missing in the response
                state.selectedCamper = {
                    ...action.payload,
                    features: action.payload.features || [], // Default to an empty array if missing
                };
            })
            .addCase(fetchCamperDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

// Exporting the loadMore action and reducer
export const { loadMore } = campersSlice.actions;
export default campersSlice.reducer;
