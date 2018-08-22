[![Build Status](https://travis-ci.com/InkoSaga/blog.svg?branch=master)](https://travis-ci.com/InkoSaga/blog)
# Blog

Custom blog as playground for various stuff

## General framework

* Using [Caddy](https://github.com/mholt/caddy) as reverse proxy for serving frontend assets, and proxy to backend cms

* During development, use webpack-dev server as replacement for [Caddy](https://github.com/mholt/caddy)

## Frontend built With

* [React](https://github.com/facebook/react) - The UI framework used
* [Redux](https://github.com/reduxjs/redux) - State Management
* [Marked](https://github.com/markedjs/marked) - Markdown parser/compiler to render articles
* [Monaco Editor](https://github.com/Microsoft/monaco-editor) - Text Editor
* [Ace Editor](https://github.com/ajaxorg/ace) - Text Editor fallback for mobile

## Backend built With

* [Strapi](https://github.com/strapi/strapi) - Node.js Content Management Framework (headless-CMS) 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
