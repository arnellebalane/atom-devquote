'use babel';

import AtomDevquoteView from './atom-devquote-view';
import { CompositeDisposable } from 'atom';

export default {

  atomDevquoteView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomDevquoteView = new AtomDevquoteView(state.atomDevquoteViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomDevquoteView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-devquote:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomDevquoteView.destroy();
  },

  serialize() {
    return {
      atomDevquoteViewState: this.atomDevquoteView.serialize()
    };
  },

  toggle() {
    console.log('AtomDevquote was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
