import path from "path";
import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, paths } = options;
  return {
    mode: mode ?? "development",
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: "[name].[contenthash].js",
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: "inline-source-map",
    devServer: buildDevServer(options),
  };
}

/* {

  TODO: `mode` - {
    mode - Бывает production или development, в зависимости от двух значений код компилируется по разному
  }
  mode: env.mode ?? "development",

  TODO: `entry` - {
    entry - откуда мы забираем файл
  }
  entry: {
    hello_world: path.resolve(__dirname, "src", "index.js"), Точек входа может быть по разному
  },

  TODO: `output` - {
    output - то, где мы сохраняем файл
  }
  output: { 
    path: path.resolve(__dirname, "build"), - путь

    filename: "[name].[contenthash].js", - [name] - уникальное наименование, [contenthash] - добавляет хеш к названию файла

    TODO: `clean` - {
      clean: true - удаляет старый файл и заменяет его новым (браузер кэширует файлы)
      clean: false - не удаляет старый файл и заменяет его новым (браузер кэширует файлы)
    }
    clean: true, 
  },

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

    TODO: `webpack.ProgressPlugin()` - {
      webpack.ProgressPlugin() - плагин показывает проценты сборки 
       (в продакшн не рекомендуют, поскольку сильно замедляет сборку)
    }
    new webpack.ProgressPlugin(),

    TODO: `MiniCssExtractPlugin()` - {
      MiniCssExtractPlugin() - плагин билдит весь css в отдельный файл
    }
    new MiniCssExtractPlugin(),
  ],

  module: {
    TODO: `rules` - {
      rules: в массиве рулс, указываются те самые лоудеры в определенном порядке 
      ВАЖНО!!! ПОРЯДОК ВАЖЕН 
    }
    rules: [
      {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
      },
      {
        TODO: `test` - {
          test: указывается регулярка, название тех файлов которые мы хотим обрабатывать (обычно расширение)
        }
        test: /\.tsx?$/,
        TODO: `use` - {
          use: указывается название лоудера, можно передавать массив или одиночное название
           ts-loader умеет работать с JSX, если мы не использовали тайпскрипт: нужен был бы babel-loader
        }
        use: "ts-loader",
        TODO: `exclude` - {
          exclude: то, что мы не обрабатываем
        }
        exclude: /node_modules/,
      },
    ],
  },

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

  TODO: `devtool` - {
    devtool: Отлавливать и дебажить код становится легче 
  } 
  devtool: "inline-source-map",

  TODO: `devServer` - {
    devServer: помомогает кодить в лайв режиме, то есть не приходится билдить на каждое изменение
  } 
  devServer: {
    port: 5000,
    open: true,
  },

} */
