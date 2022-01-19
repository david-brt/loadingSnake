# Loading Snake

## Motivation

In 2016, Google introduced Material Design to Youtube. Though it made the website look cleaner, it also removed a feature. Pressing an arrow key while a video was loading let you play the classic Snake game. The aim of this  extension is to recreate this Easter egg as well as to add additional features.

## Features

- Replaces Youtube's Material Design loading spinner
- adds the ability to play Snake on top of Youtube videos

## Installation

> Clone this repository:

``` bash
git clone https://github.com/barthdavid/loadingSnake.git
```

> Install the dependencies:

``` bash
npm install
```

> Build the project:

``` bash
npm run build
```

> - Open Chrome and go to chrome://extensions/
> - Enable Developer mode in the top right corner
> - Click "Load unpacked" and select the build directory from the location of this repository
> - Go to https://www.youtube.com to start playing

## Controls

- Press an arrow key while your video is loading or press shift + arrow key to start a game at any point
- Use the arrow keys to control the snake
