import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PriorityApi } from "../../../Apis/FoundationApiService";

const userDetail = JSON.parse(localStorage.getItem('user'));

export const fetchPriority = createAsyncThunk('priority/fetchPriority', async () => {
    const data = await PriorityApi?.get();
    return data;
})

export const createPriority = createAsyncThunk('priority/createPriority', async (payload) => {
    payload.created_by = userDetail?.id;
    const data = await PriorityApi.post(payload);
    return data;
})

export const editPriority = createAsyncThunk('priority/editPriority', async (payload) => {
    payload.updated_by = userDetail?.id;
    const data = await PriorityApi.put(payload);
    return data;
})

export const deletePriority = createAsyncThunk('priority/deletePriority', async (payload) => {
    const data = await PriorityApi.delete(payload);
    return data;
})

const initialState = {
    priority: [],
    loading: false,
    error: null
}
export const PrioritySlice = createSlice({
    name: 'priority',
    initialState,
    reducers: {},
    extraReducers: (boiler) => {
        boiler
            // get 
            .addCase(fetchPriority.pending, (state) => {
                state.loading = false;
            })
            .addCase(fetchPriority.fulfilled, (state, action) => {
                state.loading = false;
                state.priority = action?.payload?.data;
            })
            .addCase(fetchPriority.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error?.message;
            })
            // post 
            .addCase(createPriority.pending, (state) => {
                state.loading = false;
            })
            .addCase(createPriority.fulfilled, (state, action) => {
                state.loading = false;
                state.priority.push(action?.payload?.data);
            })
            .addCase(createPriority.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error?.message;
            })
            // put 
            .addCase(editPriority.pending, (state) => {
                state.loading = false;
            })
            .addCase(editPriority.fulfilled, (state, action) => {
                state.loading = false;
                const index = state?.priority?.findIndex((_p) => _p?.id === action?.payload?.data?.id);
                if (index !== -1) {
                    state.priority[index] = action?.payload?.data;
                }
            })
            .addCase(editPriority.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error?.message;
            })
            // delete 
            .addCase(deletePriority.pending, (state) => {
                state.loading = false;
            })
            .addCase(deletePriority.fulfilled, (state, action) => {
                state.loading = false;
                state.priority = state?.priority?.filter((_p) => _p?.id !== action?.payload?.data);
            })
            .addCase(deletePriority.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error?.message;
            })
    }
})

export default PrioritySlice.reducer;