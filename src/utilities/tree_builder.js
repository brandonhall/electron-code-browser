import fs from 'fs';
import path from 'path';
import { sortBy } from 'lodash';

const canRead = (currentPath) => {
  let stats;
  try {
    stats = fs.statSync(currentPath);
  } catch (e) {
    stats = null;
  }
  return stats;
};

const isExcluded = (name, options) => {
  const {
    excludedDirectories = [],
    excludedFiles = [],
  } = options;

  const skipDirectory = excludedDirectories.includes(name);
  const skipFile = excludedFiles.includes(name);

  return skipDirectory || skipFile;
};

const treeBuilder = (currentPath, options = {}) => {
  const name = path.basename(currentPath);
  const item = { name, path: currentPath };

  const stats = canRead(currentPath);
  const excluded = isExcluded(name, options);

  if (!stats) {
    return null;
  }

  if (excluded) {
    return null;
  }

  if (stats.isFile()) {
    const extension = path.extname(currentPath).toLowerCase();
    const mode = extension.split('.')[1] || 'shell';

    Object.assign(item, {
      extension,
      mode,
      type: 'file',
    });

    return item;
  }

  if (stats.isDirectory()) {
    const directoryData = fs.readdirSync(currentPath);
    const directoryChildren = directoryData
      .map(child => treeBuilder(path.join(currentPath, child), options))
      .filter(fileItem => !!fileItem);

    Object.assign(item, {
      children: sortBy(directoryChildren, ['type', 'name']),
      type: 'directory',
    });

    return item;
  }

  return null;
};

export default treeBuilder;
