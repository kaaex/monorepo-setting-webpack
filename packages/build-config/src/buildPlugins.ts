import { Configuration, DefinePlugin } from "webpack";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
// import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export function buildPlugins(options: BuildOptions): Configuration["plugins"] {
  return [
    new HtmlWebpackPlugin({
      template: options.paths.html,
      favicon: path.resolve(options.paths.public, "favicon.ico"),
      publicPath: "/",
    }),
    new DefinePlugin({
      _PLATFORM_: JSON.stringify(options.platform),
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }),
    // new ForkTsCheckerWebpackPlugin(),
    new ReactRefreshPlugin(),
    // new BundleAnalyzerPlugin()
  ];
}

/* {

  TODO: `plugins` - {
    plugins: [плагины]
  }
  plugins: [
    TODO: `HtmlWebpackPlugin` - {
      HtmlWebpackPlugin - cамый важный плагин, который подставляет скрипты в нашу htmlku, скрипты которые получают
       в режиме сборки.
        Без передачи template webpack авт-ки настраивает index
    }
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"), 
    }),

    TODO: `DefinePlugin` - {
      DefinePlugin - вебпаковский плагин, задает глобальные переменные
    }
    new DefinePlugin({
      _PLATFORM_: options.platform,
    }),

    TODO: `webpack.ProgressPlugin()` - {
      webpack.ProgressPlugin() - плагин показывает проценты сборки 
       (в продакшн не рекомендуют, поскольку сильно замедляет сборку)
    }
    new webpack.ProgressPlugin(),

    TODO: `MiniCssExtractPlugin()` - {
      MiniCssExtractPlugin() - плагин билдит весь css в отдельный файл
    }
    new MiniCssExtractPlugin(),

    TODO: `ForkTsCheckerWebpackPlugin()` - {
      ForkTsCheckerWebpackPlugin() - выносит проверку типов в отдельный процесс: не нагружая сборку
    }
    new ForkTsCheckerWebpackPlugin(),
    
    TODO: `ReactRefreshPlugin()` - {
      ReactRefreshPlugin() - позволяет менять пользовательский интерфейс без перезагрузки страницы
    }
    new ReactRefreshPlugin(),

    TODO: `BundleAnalyzerPlugin()` - {
      BundleAnalyzerPlugin() - плагин который показывает размер бандла визуально
    }
    new BundleAnalyzerPlugin(),
  ],

} */
