# Image Processing API

## Table of contents

* [General info](#general-info)
* [Technologies](#technologies)
* [API](#api)
* [Setup](#setup)
---

## General info

|     Image processing API that creates thumb images by resizing an original image. Multiple image formats are processed such as "jpg", "png", "gif", "tiff"... After a first process, the thumb image is cached in the public directory of the server, accelerating the process of similar queries.       |
| :------------- |

---

## Technologies

Project is created with:
* node: 16.13.0
* express: 4.17.2
* jasmine: 4.0.0
* jasmine-spec-reporter: 7.0.0
* node-cache: 5.1.2
* sharp: 0.29.3
* supertest: 6.1.6
* jasmine-core: 4.0.0
* nodemon: 2.0.15
* prettier: 2.5.1
* ts-node: 10.4.0
* typescript: 4.5.4
* eslint: 8.6.0
---

## API

The API needs to proceeds three parameters: _filename_, _width_ and _height_. 
> Only filename is *mandatory*, both width and height are set by default to **200 px**.

If the filename is missing, or does not correspond to an existing file, a 500 status code is returned along with an error message,


### API path 

{current_IP}/api/image/


### Parameters

|  Parameter  |  Required  |  Description  |
| ------------- |-------------| -----|
|   `filename`    | required | Filename of the original image. The filename must be present in the public directory of the server before process. The filename does not include the extension |
|   `width`      | optional      |   optional	width of the processed image in px. If no value is provided, the default value is 200 px |
| `height` | optional      |    Height of the processed image in px. If no value is provided, the default value is 200 px |


### Example of API calls:

{current_IP}/api/image?filename=aFilename

{current_IP}/api/image?filename=aFilename&width=350

{current_IP}/api/image?filename=aFilename&width=350&height= 250


### Available Filenames :

* encenadaport
* fjord
* icelandwaterfall
* palmtunnel
* santamonica
---

## Setup
To run this project, install it locally using npm:

```
$ cd ../lorem
$ npm install
$ npm start
```




