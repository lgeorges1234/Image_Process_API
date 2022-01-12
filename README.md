Image Processing API

The Image Processing Api creates thumbs images by resizing an original image. Multiple image format are processed such as "jpg", "png", "gif", "tiff"... 

After a first process, the thumb image is cached in the public directory of the server, accelerating the process of a similar query.

URL
API path :

{current_IP}/api/image

API call:

The API needs to proceeds three parameters: a filename, a width and a height. 
Only the filename is mandatory, both width and height are set by default to 200 px. 
If the filename is missing, or does not correspond to an existing file, a 500 status code is returned along with an error message,

Parameters:

filename	required  	Filename of the original image. The filename must be present in the public directory of the server before process. The filename does not include the extension.

width  	optional	width of the processed image in px. If no value is provided, the default value is 200 px.

height  	optional	Height of the processed image in px. If no value is provided, the default value is 200 px.


Example of API calls:

{current_IP}/api/image?filename=aFilename

{current_IP}/api/image?filename=aFilename&width=350

{current_IP}/api/image?filename=aFilename&width=350&height= 250

Avalable Filenames :

encenadaport
fjord
icelandwaterfall
palmtunnel
santamonica





