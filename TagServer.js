import Switchboard from './easel/Switchboard.js';

export default class TagServer {

    constructor() {
        
        this.switchboard = new Switchboard();

        this.switchboard.connectionHandler = this.sendPlayerJoin;
        this.switchboard.addHandler("moveLocation", this.moveLocation);
    }

    sendPlayerJoin = (sessionId) => {
        this.switchboard.sendMessageToAll({
            type: "playerJoin",
            id: sessionId
        });
    }

    chatMessage = (data) => {
        
        const validatedUsername = this.usernameIds.get(data.sessionId);
        if (data.username != validatedUsername) { return; }

        console.log(`<${data.username}>: ${data.chatContent}`);
        
        this.switchboard.sendMessageToAll({
            type: "chatMessage",
            username: data.username,
            chatContent: data.chatContent
        });
    }

}
