/* eslint-disable no-undef */
import 'jasmine';

import { readDirectory } from '../../utilities/functions';
import { inputImageDirectory } from '../../utilities/variables';

describe('The filename is present in the public image directory', () => {
  it('the readDirectory function return the image file name and extension', async () => {
    const directory = inputImageDirectory;
    const filename = 'aFileName';
    const dirFile = await readDirectory(`${directory}`, `${filename}`);
    expect(dirFile).toBe('aFileName.jpg');
  });
  it('the readDirectory function return a null result', async () => {
    const directory = inputImageDirectory;
    const filename = 'notaFileName';
    const dirFile = await readDirectory(`${directory}`, `${filename}`);
    expect(dirFile).toBeFalsy();
  });
});
