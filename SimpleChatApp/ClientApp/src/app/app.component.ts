import { Component } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'app';
    connection;
    username: string;
    message: string;

    sendMessage() {
        this.connection.invoke("SendMessage", this.username, this.message);
    }

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("/chatHub")
            .build();
        this.connection.on("ReceiveMessage", (username, message) => {
            console.log(username);
            console.log(message);
        });
       
       this.connection.start();
    }
}
