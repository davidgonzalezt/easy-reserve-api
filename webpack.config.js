import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';

module.exports = {
  // Otras configuraciones de webpack aquí
  plugins: [
    // Otros plugins
    new CopyPlugin({
      patterns: [
        {
          from: 'src/mocks/data.json',
          to: path.resolve(__dirname, 'dist/mocks/data.json'),
        },
      ],
    }),
  ],
};
