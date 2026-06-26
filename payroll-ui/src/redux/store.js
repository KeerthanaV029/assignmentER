import { configureStore }
from "@reduxjs/toolkit";

import { leaveReducer }
from "./reducer/leaveReducer";

export const store =
    configureStore({

        reducer: {

            leaves:
                leaveReducer

        }

    });