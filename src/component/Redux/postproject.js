

const instialState = {
step:0,
propertyId:null, // store created draft Id
isEditMode: false,
data: {
    propertyType: "",
    status:"",
    projectPurpose:"",
},
errors: {},
};


const projectSlice = createSlice({
    name: "project",
    instialState,
    reducers: {
        updateProjectFields: (state,action) => {
            state.data = { ...state.data, ...action.payload};
        },
        //  pending
    }
})