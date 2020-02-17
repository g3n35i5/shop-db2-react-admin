import {environment as devENV} from "./environment.dev";
import {environment as prodENV} from "./environment.prod";

export const environment = process.env.NODE_ENV === 'development' ? devENV : prodENV;
