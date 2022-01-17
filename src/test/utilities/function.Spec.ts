/* eslint-disable no-undef */
import 'jasmine';
import fs, { promises as fsPromises } from 'fs';

import {
  readDirectory,
  resize,
  makeOuputDir,
  isInCache,
} from '../../utilities/functions';
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
    const filename = 'notaFileName';
    const dirFile = await readDirectory(
      `${inputImageDirectory}`,
      `${filename}`
    );
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
    expect(outputPath).toBe(
      `${outputImageDirectory}${reqParams.filename}_${reqParams.width}_${reqParams.height}_thumb.jpg`
    );
    expect(
      fs.existsSync(
        `${outputImageDirectory}${reqParams.filename}_${reqParams.width}_${reqParams.height}_thumb.jpg`
      )
    ).toBeTrue();
  });
  it('providing no conform width or height', async () => {
    const reqParams: queryParams = {
      filename: 'aFileName',
      width: -1,
      height: 400,
    };
    // const outputPath = await resize(
    //   reqParams,
    //   inputImageDirectory,
    //   outputImageDirectory
    // );
    expect(
      await resize(reqParams, inputImageDirectory, outputImageDirectory)
    ).toThrow('Wrong parameters fot the resize function');
    expect(
      fs.existsSync(
        `${outputImageDirectory}${reqParams.filename}_${reqParams.width}_${reqParams.height}_thumb.jpg`
      )
    ).toBeFalse();
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

describe('The isInCache function check if the thumb image has already been processed', () => {
  beforeEach(async () => {
    try {
      const reqParams: queryParams = {
        filename: 'aFileName',
        width: 50,
        height: 50,
      };
      if (
        fs.existsSync(
          `${outputImageDirectory}${reqParams.filename}_${reqParams.width}_${reqParams.height}_thumb.jpg`
        )
      ) {
        fs.unlinkSync(
          `${outputImageDirectory}${reqParams.filename}_${reqParams.width}_${reqParams.height}_thumb.jpg`
        );
      }
    } catch (err) {
      console.log(err);
    }
  });
  it('return false if the thumb image is not in cache', async () => {
    const reqParams: queryParams = {
      filename: 'aFileName',
      width: 50,
      height: 50,
    };
    await resize(reqParams, inputImageDirectory, outputImageDirectory);
    const inCache = isInCache(reqParams, outputImageDirectory);
    expect(inCache).toBeFalse();
  });
  it('return true if the thumb image is now in cache and is present in the folder', async () => {
    const reqParams: queryParams = {
      filename: 'aFileName',
      width: 50,
      height: 50,
    };
    await resize(reqParams, inputImageDirectory, outputImageDirectory);
    const inCache = isInCache(reqParams, outputImageDirectory);
    expect(inCache).toBeTrue();
    expect(
      fs.existsSync(
        `${outputImageDirectory}${reqParams.filename}_${reqParams.width}_${reqParams.height}_thumb.jpg`
      )
    ).toBeTrue();
  });
  it('return false if the thumb image is in cache but is not present in the folder', async () => {
    const reqParams: queryParams = {
      filename: 'aFileName',
      width: 50,
      height: 50,
    };
    const inCache = isInCache(reqParams, outputImageDirectory);
    expect(inCache).toBeFalse();
    expect(
      fs.existsSync(
        `${outputImageDirectory}${reqParams.filename}_${reqParams.width}_${reqParams.height}_thumb.jpg`
      )
    ).toBeFalse();
  });
});
