import { createSlice } from "@reduxjs/toolkit";
const UserData = {
  id:'',
  first_name: "",
  last_name: "",
  email: "",
  contactNumber:"",
  wishlist:[],
  isSubscribe:false,
  role:""
};
const addUserSlices = createSlice({
  name: "User",
  initialState: UserData,
  reducers: {
    addUser: (state, action) => { 
      state.id = action.payload._id;
      state.email = action.payload.email;
      state.first_name = action.payload.firstName;
      state.last_name = action.payload.lastName;
      state.contactNumber = action.payload.contactNumber;
      state.wishlist = action.payload.wishlist;
      state.isSubscribe = action.payload.isSubscribe;
      state.role = action.payload.role
    },
    removeUser: (state, action) => {
      state.id = "";
      state.email = "";
      state.first_name = "";
      state.last_name = "";
      state.contactNumber = "";
      state.isSubscribe = false;
      state.role = ""
    },
  },
});

export default addUserSlices.reducer;
export const addUserActions = addUserSlices.actions;