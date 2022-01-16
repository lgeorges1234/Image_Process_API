/* eslint-disable no-undef */
import 'jasmine';
import fs, { promises as fsPromises } from 'fs';

import { readDirectory, resize, makeOuputDir } from '../../utilities/functions';
import {
  inputImageDirectory,
  outputImageDirectory,
} from '../../utilities/variables';
import { queryParams } from '../../utilities/interfaces';

describe('The filename exists in the public image directory', () => {
  it('the readDirectory function returns the image file name and extension when given an existing filename', async () => {
    const filename = 'aFileName';
    const dirFile = await readDirectory(
      `${inputImageDirectory}`,
      `${filename}`
    );
    expect(dirFile).toBe('aFileName.jpg');
  });
  it('the readDirectory function return a null result when given a false filename', async () => {
    const directory = inputImageDirectory;
    const filename = 'notaFileName';
    const dirFile = await readDirectory(`${directory}`, `${filename}`);
    expect(dirFile).toBeFalsy();
  });
});

describe('The resize function provides an ouput path in the thumb/ directory', () => {
  it('providing width and height', async () => {
    const reqParams: queryParams = {
      filename: 'aFileName',
      width: 300,
      height: 400,
    };
    const outputPath = await resize(
      reqParams,
      inputImageDirectory,
      outputImageDirectory
    );
    expect(outputPath).toBe('public/img/thumb/aFileName_300_400_thumb.jpg');
  });
});

describe('The makeOutputDir function create an output thumb image', () => {
  beforeAll(async () => {
    try {
      if (fs.existsSync(outputImageDirectory)) {
        const files = fs.readdirSync(outputImageDirectory);
        files.forEach((file) => {
          fs.unlinkSync(`${outputImageDirectory}/${file}`);
        });
      }
      await fsPromises.rmdir(`${outputImageDirectory}`);
    } catch (err) {
      console.log(err);
    }
  });
  it('return true if the thumb/ does not exist ', async () => {
    const isThumbDirNotPresent = await makeOuputDir(outputImageDirectory);
    expect(isThumbDirNotPresent).toBeTrue();
    expect(fs.existsSync(outputImageDirectory)).toBeTrue();
  });
  it('return false if the thumb/ already exists', async () => {
    const isThumbDirNotPresent = await makeOuputDir(outputImageDirectory);
    expect(isThumbDirNotPresent).toBeFalse();
    expect(fs.existsSync(outputImageDirectory)).toBeTrue();
  });
});
