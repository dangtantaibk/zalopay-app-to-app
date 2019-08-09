import {IActions, IState, Types} from "./types";


export const initState: IState = {
    changeFontSizeHasError: false,
    changeFontSizeLoading: false,
    fontSizeForDisplay: 14,
};

export default function (state: IState = initState, action: IActions): IState {
    switch (action.type) {

        case Types.ON_CHANGE_FONT_SIZE_REQUEST: {
            return {
                ...state,
                changeFontSizeHasError: false,
                changeFontSizeLoading: true
            };
        }

        case Types.ON_CHANGE_FONT_SIZE_SUCCESS: {
            return {
                ...state,
                fontSizeForDisplay: action.payload,
            }
        }

        case Types.ON_CHANGE_FONT_SIZE_FAILURE: {
            return {
                ...state,
                changeFontSizeHasError: true,
                changeFontSizeLoading: false,
            };
        }

        case Types.RESET_STATE: {
            return initState;
        }

        default: return {
                ...state
            };
    }
}
