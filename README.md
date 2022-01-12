# Image Processing API

## Table of contents

* [General info](#general-info)
* [Dependencies](#dependencies)
* [API call](#api-call)
* [Available Scripts](#available-scripts)
---

## General info

|     Image processing API that creates thumb images by resizing an original image. Multiple image formats are processed such as "jpg", "png", "gif", "tiff"... After a first process, the thumb image is cached in the public directory of the server, accelerating the process of similar queries.       |
| :------------- |

---

## Dependencies

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

## API call

The API needs to proceeds three parameters: _filename_, _width_ and _height_. 
> Only filename is __mandatory__, both width and height are set by default to **200 px**.

If the filename is missing, or does not correspond to an existing file, a 500 status code is returned along with an error message,


### API path 

>`{current_IP}/api/image/`


### Parameters

|  Parameter  |  Required  |  Description  |
| ------------- |-------------| -----|
|   `filename`    | *required* | Filename of the original image. The filename must be present in the public directory of the server before process. The filename does not include the extension |
|   `width`      | *optional*      |   Width of the processed image in px. If no value is provided, the default value is 200 px |
| `height` | *optional*      |    Height of the processed image in px. If no value is provided, the default value is 200 px |


### Example of API calls:

>`{current_IP}/api/image?filename=aFilename`

>`{current_IP}/api/image?filename=aFilename&width=350`

>`{current_IP}/api/image?filename=aFilename&width=350&height=250`


### Available Filenames :

* encenadaport
* fjord
* icelandwaterfall
* palmtunnel
* santamonica
---

## Available Scripts

#### Run server
`npm run start`

#### Build application
`npm run build`

#### Build with TypeScript and run all Tests
`npm run test`

#### Run jasmine tests
`npm run jasmine --silent`

#### Run eslint
`npm run lint`

`npm run lint -- --fix to apply fixes`

#### Run prettier
`npm run prettier`
```




