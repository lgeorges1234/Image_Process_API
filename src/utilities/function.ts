import { readdir } from 'fs/promises';

import Extensions from './enum';

// list the files of a directory and compare it to filename
const readDirectory = async (
  path: string,
  filename: string
): Promise<string> => {
  let name = '';
  try {
    // transform the enum extension in an iterable array
    const fileExtensions = Object.values(Extensions);
    // list all files from the given path
    const files = await readdir(path);
    for (const file of files) {
      for (const extension of fileExtensions) {
        if (file === filename + extension) {
          name = file;
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
  // return the file if exists or ''
  return name;
};

export default readDirectory;
