//redux/features/GeneralDataReducer.ts
import {createSlice} from "@reduxjs/toolkit";

/**
 * Auth Sate For Buttons
 * @type {{SIGNIN: string, SIGNUP: string}}
 */
const AuthStateButtonEnum = {
    SIGNIN:"signin",
    SIGNUP:"signup"
}

const initialState= {
    authStateButton: AuthStateButtonEnum.SIGNIN // Set default value
}

const GeneralDataSlice = createSlice({
    name: "generalDataReducer",
    initialState: initialState,
    reducers: {
        setAuthStateButton: (state, action) => {
            state.authStateButton = action.payload;
        }
    }
})

// Export actions
export const { setAuthStateButton } = GeneralDataSlice.actions;

// Export the reducer
export default GeneralDataSlice.reducer;
