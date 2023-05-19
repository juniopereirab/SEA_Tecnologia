import { createAction } from "@reduxjs/toolkit";

import * as TYPES from "../types";

export const setLogged = createAction<UserAction>(TYPES.SET_LOGGED);
export const setUnlogged = createAction<UserAction>(TYPES.SET_UNLOGGED);
