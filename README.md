# Electron Code Browser

Quickly thrown together to take [Electron](https://electronjs.org) for a spin. The Electron aspects were
 created and are managed by [electron-forge](https://electronforge.io/). The front end is built with 
 [react](https://reactjs.org/), [material-ui](http://www.material-ui.com) and the excellent [mobx](https://mobx.js.org/).

### Features

* Open a folder to browse files using [CodeMirror](https://codemirror.net/)
* Local storage for selected folder and open files
* Supports `CSS`, `SCSS`, `LESS`, `JSX`, `Markdown`, `HTML`, `JSON`, and `JS`.

### Usage

1. Install `electron-forge`

    ```shell
    npm install -g electron-forge
    ```

2. Install dependencies:

    ```shell
    yarn
    ```

3. Run the App:

    ```shell
    electron-forge start
    ```

### License

The MIT License
