import { IAction } from "../";

export enum Types {
    ON_CHANGE_FONT_SIZE_REQUEST = "@@user/ON_CHANGE_FONT_SIZE_REQUEST",
    ON_CHANGE_FONT_SIZE_SUCCESS = "@@user/ON_CHANGE_FONT_SIZE_SUCCESS",
    ON_CHANGE_FONT_SIZE_FAILURE = "@@user/ON_CHANGE_FONT_SIZE_FAILURE",

    RESET_STATE = "@@user/RESET_STATE"
}

export interface IState {
    changeFontSizeLoading: boolean;
    changeFontSizeHasError: boolean;
    changeFontSizeError?: Error;
    fontSizeForDisplay: number;
}

export interface IOnChangeFontSizeRequestAction extends IAction<Types.ON_CHANGE_FONT_SIZE_REQUEST> { }

export interface IOnChangeFontSizeSuccessAction extends IAction<Types.ON_CHANGE_FONT_SIZE_SUCCESS, number> {
    payload: number;
}
export interface IOnChangeFontSizeFailureAction extends IAction<Types.ON_CHANGE_FONT_SIZE_FAILURE, Error> { }

export interface IResetStateAction extends IAction<Types.RESET_STATE> {
    type: Types.RESET_STATE
}



export type IActions =
    IOnChangeFontSizeRequestAction
    | IOnChangeFontSizeFailureAction
    | IOnChangeFontSizeSuccessAction
    | IResetStateAction;
