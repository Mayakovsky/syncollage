# Syncollage
Rebuild AsyncArt Works as Interactive Browser Apps

If you are one of the artists who hosted work at Async.art, you can take your original png files and create a simple interactive display of the work, hosted inside a minimal html shell any browser can display for interactive viewing.


## Table of Contents
- [Background](#background)
- [Application](#application)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Background

 
The global cryptoartist network became real for me when I met Alotta Money through Async Art.

Early 2020 connections between artists were spreading like mycelium. Phillipe recruited me to his team for the first Kitty Bungalow Cat Rescue Charity Auction, a mega-collaboration with 34 artists to stress-test the platform.  Our concept was martial arts so I created the Shaolin Sphynx character and wrote the lore of the project - [Big Trouble in Māo Māo City](https://beta.cent.co/asyncart/+e5fa33). The auction raised over $30,000 usd. Made a true friend.

Once an Async artist, it felt time to remind artists of one of the greatest act of creative censorship of the twentieth century.  Diego Rivera's classic struggle to create the great mural [Man at the Crossroads](https://en.wikipedia.org/wiki/Man_at_the_Crossroads) after the work's destruction by the Rockefeller family and its rebirth as **El Hombre Controlador del Universo** in the Palacio de Bellas Artes in Mexico City.

Like Rivera's original work, my piece "Who's the Controller Now?" disappeared with the demise of the Async platform.

I'm sure many Async artists would like to see those pieces live again.  Any artist who still has their files should be able to quickly arrange the images, auto-generate the app, and load it up for viewing/displaying/minting.


## Application

Syncollage is a lightweight interactive display solution powered by standard browser code. Turn PNG images and their folders into a visual stack drawn in a browser window.  Clicking the visible region of any layer in any group will cycle through images in that group. Layers are randomized at load.


## Features

- Lightweight HTML, functionality in Javascript
- Collage from a stack of PNG images organized into interaction groups
- User clicks to cycle through layers in each group
- HTML5 canvas element handles interactivity
- PNG per-pixel alpha channel limits to visible pixels in each layer
- Separate script scans image folder/filenames to generate a visual stack array
- Randomized initial state
- Serve images from a Node server to overcome CORS while testing
 

## Installation

To run Syncollage locally, you need to have Node.js and npm (or a similar Node.js package manager) installed on your system.

1.  **Clone the Repository (if applicable):** If you have the project files in a repository, clone it to your local machine using your preferred method or a command like:

    ```powershell
    # Example if using Git
    git clone https://github.com/Mayakovsky/Syncollage.git
    cd Syncollage
    ```

2.  **Install `http-server` Globally:** Syncollage uses a simple HTTP server for local development. If you don't have it installed, open PowerShell as an administrator and run:

    ```powershell
    npm install -g http-server
    ```

## Usage

1.  **Organize Your Images:**
    * Create a folder named `imageStack` within your Syncollage project directory.
    
    * Inside `imageStack`, create subfolders for each `change_group`.  A `change_group` holds the image layers for each visual change. Folder names become `change_group` identifiers in the visual stack, so users should number or order the folders by desired stack position, with 01 being the base or background image folder.
    
    * Place the PNG image layers for each `change_group` inside their respective subfolders. Ensure that images intended to be part of an interactive group have more than one layer. Single-image groups will be treated as static.
    * The names of the image files within each group will determine their order for cycling.

2.  **Generate `count_stackula.json`:**
    * Navigate to your Syncollage project directory in PowerShell.
    * Run the `generate_json.js` script using Node.js:

        ```powershell
        node generate_json.js
        ```

    * This script will analyze your `imageStack` folder structure and create (or update) the `count_stackula.json` file. An example of the generated `count_stackula.json` might look like this:

        ```json
        {
          "visual_stack": [
            {
              "filename": "base_image.png",
              "change_layer": "base_image.png",
              "change_group": "base",
              "opacity": 1,
              "filePath": "base/base_image.png",
              "clickability": false
            },
            {
              "filename": "layer_a1.png",
              "change_layer": "layer_a1.png",
              "change_group": "group_a",
              "opacity": 0,
              "filePath": "group_a/layer_a1.png",
              "clickability": true
            },
            {
              "filename": "layer_a2.png",
              "change_layer": "layer_a2.png",
              "change_group": "group_a",
              "opacity": 1,
              "filePath": "group_a/layer_a2.png",
              "clickability": true
            },
            {
              "filename": "single_layer.png",
              "change_layer": "single_layer.png",
              "change_group": "static_element",
              "opacity": 1,
              "filePath": "static_element/single_layer.png",
              "clickability": false
            },
            {
              "filename": "layer_b1.png",
              "change_layer": "layer_b1.png",
              "change_group": "group_b",
              "opacity": 1,
              "filePath": "group_b/layer_b1.png",
              "clickability": true
            },
            {
              "filename": "layer_b2.png",
              "change_layer": "layer_b2.png",
              "change_group": "group_b",
              "opacity": 0,
              "filePath": "group_b/layer_b2.png",
              "clickability": true
            }
          ]
        }
        ```

3.  **Run the Development Server:**
    * Navigate to your Syncollage project directory in PowerShell.
    * Start the `http-server`:

        ```powershell
        http-server -p 8084
        ```

    * This will start a local web server, typically accessible at `http://localhost:8084/index.html` or a similar address provided in the PowerShell output.

4.  **Open in Your Browser:**
    * Open your web browser and navigate to the address provided by `http-server` (e.g., `http://localhost:8084`).
    * The `index.html` file should load, displaying your visual collage.

5.  **Interact with the Collage:**
    * Click on the visible, non-transparent areas of image groups that contain multiple layers. This will cycle through the different layers within that group.
    * Groups with a single image will be static and non-clickable.

## Contributing

We welcome contributions to Syncollage! If you'd like to contribute, please follow these steps:

1.  Fork the repository on GitHub.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear and concise messages.
4.  Push your changes to your fork on GitHub.
5.  Submit a pull request to the main repository.

**Contributors:**

* Hidden Forces
* Conlan


Copyright (c) 2025 Hidden Forces

