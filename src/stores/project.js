import { action, decorate, observable } from 'mobx';
import Store from 'electron-store';
import { treeBuilder } from 'utilities';
import { EXCLUDED_DIRECTORIES, EXCLUDED_FILES } from 'constants';

class Project {
  constructor() {
    this.tree = {};

    this.store = new Store({
      name: 'project',
      defaults: {
        directory: '',
        files: [],
        tabIndex: 0,
      },
    });

    this.directory = this.store.get('directory');
    this.files = this.store.get('files');
    this.tabIndex = this.store.get('tabIndex');

    if (this.directory) {
      this.walkDirectory();
    }
  }

  addFile(item) {
    const exists = this.files.find(file => file.path === item.path);
    if (exists) {
      return;
    }

    this.files.push(item);
    this.store.set('files', this.files);
  }

  removeFile(item) {
    this.files.remove(item);
    this.store.set('files', this.files);
  }

  setDirectory(folderPaths) {
    if (!folderPaths) {
      return;
    }

    const [folderPath] = folderPaths;

    this.directory = folderPath;
    this.files = [];
    this.tree = {};
    this.tabIndex = 0;

    this.store.set({
      directory: this.directory,
      files: this.files,
      tabIndex: this.tabIndex,
    });

    this.walkDirectory();
  }

  setTabIndex(tabIndex) {
    this.tabIndex = tabIndex;
    this.store.set({ tabIndex });
  }

  walkDirectory() {
    this.tree = treeBuilder(this.directory, {
      excludedDirectories: EXCLUDED_DIRECTORIES,
      excludedFiles: EXCLUDED_FILES,
    });
  }
}

decorate(Project, {
  directory: observable,
  tree: observable,
  files: observable,
  tabIndex: observable,
  addFile: action.bound,
  removeFile: action.bound,
  setDirectory: action.bound,
  setTabIndex: action.bound,
  walkDirectory: action.bound,
});

export default new Project();
