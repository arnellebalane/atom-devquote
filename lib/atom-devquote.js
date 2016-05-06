'use babel';

import { CompositeDisposable } from 'atom';
import devquote from 'devquote';

export default {

    subscriptions: null,

    activate(state) {
        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'atom-devquote:show-random-quote': () => this.showRandomQuote()
        }));
    },

    deactivate() {
        this.subscriptions.dispose();
    },

    showRandomQuote() {
        var quote = devquote();
        atom.notifications.addInfo(`<b>${quote.text}</b>\n\n-- ${quote.author}`, {
            icon: "quote"
        });
    }

};
