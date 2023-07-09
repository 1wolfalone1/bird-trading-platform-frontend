import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { object } from "yup";
import { api } from "../../../../api/server/API";

const rateSlice = createSlice({
    name: 'rateSlice',
    initialState: {
        rate: {
            rateData: {
            },
            listImagesPreview: [],
            listReivew: [],
            numberRated: 0,
            validate: false,
        }
    },
    reducers: {
        addImagesPreview: (state, action) => {          
            const productId = action.payload.productId;
            const objectImage = action.payload.objectImage;
            console.log(objectImage, 'day la id object images');
            console.log(productId, 'day la prodcut id');

            const mapObjectImage = {
                [productId] : objectImage
            }
            console.log('xem coi co bi null khong ', state.rate.listImagesPreview[productId] === null);
           
            if (!state.rate.listImagesPreview[productId]) {
                console.log('Here is a mapped object image', state.rate.listImagesPreview[productId]);
                state.rate.listImagesPreview[productId] = [objectImage];
              } else {
                console.log('Product ID does not exist or is null');
                state.rate.listImagesPreview[productId].push(objectImage);
              }
            console.log('day ne ', current(state));
        },
        removeImagesPreview: (state, action) => {
            const removeId = action.payload.id;
            const productId = action.payload.productId;
            const updateListPreview = state.rate.listImagesPreview[productId].filter(obj => obj.imageId !== removeId)
            state.rate.listImagesPreview[productId] = updateListPreview;
        },
        resetImagesPreview: (state, action) => {
            state.rate.listImagesPreview = [];
        }
    },
    extraReducers: (builder) =>
        builder
        .addCase(getListReivewBaseOnOrderDetail.fulfilled, (state, action) => {
            state.rate.listReivew = action.payload;
        })
        .addCase(getListReivewBaseOnOrderDetail.rejected, (state, action) => {
            state.rate.listReivew = [];
            console.log(action);
        })
    
});

export default rateSlice;

export const getListReivewBaseOnOrderDetail = createAsyncThunk (
    "reivew/review-order",
    async(orderId, {getState}) => {
        try{
            const res = await api.get(`/users/orders/${orderId}/reviews`);
            const data = res.data;
            return data;
        }catch(error) {
            throw error;
        }
    }
)


export const rateSliceSelector = state => state.rateSlice.rate;