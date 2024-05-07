import { Configuration } from "webpack";
import { BuildOptions } from "./types/types";

export function buildResolvers(
  options: BuildOptions
): Configuration["resolve"] {
  return {
    extensions: [".tsx", ".ts", ".js"],
  };
}

/* {
  
  TODO: `resolve` - {
    resolve: благодаря ресолву файлы импортятся без расширение, 
     например - вместо ... from "index.js" > ... from "index" 
  }
  resolve: {
    TODO: `extensions` - {
      extensions: указываем массив расширений, которые необходимо обрабатывать 
    }
    extensions: [".tsx", ".ts", ".js"],
  },

} */
