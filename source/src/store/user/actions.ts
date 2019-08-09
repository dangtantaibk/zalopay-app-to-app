import { IDispatch, IThunkFunction } from "../index";
import {
    IOnChangeFontSizeFailureAction, IOnChangeFontSizeRequestAction,
    IOnChangeFontSizeSuccessAction,
    Types
} from "./types";

function changeFontSize(fontSize: number): IThunkFunction {
    return async (dispatch: IDispatch) => {
        try {
            dispatch(OnChangeFontSizeRequest());
            dispatch(OnChangeFontSizeSuccess(fontSize));
        } catch (error) {
            dispatch(OnChangeFontSizeFailure(error));
        }
    };
}

function OnChangeFontSizeRequest(): IOnChangeFontSizeRequestAction {
    return {
        payload: undefined,
        type: Types.ON_CHANGE_FONT_SIZE_REQUEST
    };
}

function OnChangeFontSizeSuccess(fontSize: number): IOnChangeFontSizeSuccessAction {
    return {
        payload: fontSize,
        type: Types.ON_CHANGE_FONT_SIZE_SUCCESS
    };
}

function OnChangeFontSizeFailure(error: Error): IOnChangeFontSizeFailureAction {
    return {
        payload: error,
        type: Types.ON_CHANGE_FONT_SIZE_FAILURE
    };
}

export {
    changeFontSize,
}
