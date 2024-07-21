class Message {
    constructor(name, command) {
        this.name = name;
        if (!name) {
            throw Error("Message name required.");
        }
        this.command = command;
    }
}

module.exports = Message;
