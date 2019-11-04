# Rotator for JavaScript
![npm](https://img.shields.io/npm/v/rotator-js)

A simple plugin to manage element rotations.

## Installation
### <img src="https://avatars1.githubusercontent.com/u/22247014?s=200&v=4" width="20" height="20"> Yarn
```bash
$ yarn add rotator-js
```

### <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/npm/npm.png" width="20" height="20"> NPM
```bash
$ npm install rotator-js
```

## Usage
1. Say you have the `<img>` that you want to rotate
    ```html
    <img href="cat.png" id="my-image">
    ```
    _<small>You can use any HTML tag element that can accept the `style` attribute, not just the `<img>`s!</small>_

1. In order to rotate it, you'll need 2 buttons (clockwise & anticlockwise) with ids prepended with the same `id` as your `<img>` element
    ```html
    <button id="my-image-anticlockwise-button">Anticlockwise Button</button>
    <button id="my-image-clockwise-button">Clockwise Button</button>
    ```

1. After the page loads, require and create a new ImageRotator instance while passing your image's `id`
    ```javascript
    var Rotator = require("rotator-js");
    var rotator = new Rotator(["my-image"]);
    ```
    _<small>You can also setup multiple elements to be rotated at once by passing multiple element `id`s!</small>_

1. Call `configure()` to configure the buttons to rotate the given elements.
    ```javascript
    rotator.configure();
    ```

1. That's all!

Now, the HTML element(s) whose `id`(s) was passed to Rotator, will be rotated clockwise/counter-clockwise when their corresponding buttons are clicked, respectively.

## Limitations
Rotations are currently limited to 90° (clockwise) or -90° (counter-clockwise) per rotation.

## Contributing
We'd love to accept your patches and contributions to this project! Checkout [contributing](CONTRIBUTING.md) and [code of conduct](CODE_OF_CONDUCT.md) to learn more.

## License
Refer to the license file.
