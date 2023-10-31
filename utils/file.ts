import { readdirSync } from 'fs';
import type { Dirent } from 'fs';
import { join } from 'path';

export const getDirectories = (path: string): string[] =>
  [ path
    , ...readdirSync(path, { withFileTypes: true })
      .flatMap((dirent: Dirent) =>
        dirent
          .isDirectory()
          ? getDirectories(join(path, dirent.name))
          : [],
      ),
  ];
