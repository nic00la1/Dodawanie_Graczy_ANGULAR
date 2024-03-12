import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Player } from './player.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  csPlayers: Player[] = [];
  valorantPlayers: Player[] = [];
  lolPlayers: Player[] = [];

  addPlayer(game: string, firstName: string, lastName: string, nickName: string) {
    if (!game || !firstName || !lastName || !nickName) {
      console.log("Nie podano wszystkich danych!");
      return;
    } 

    let playerList;
    switch (game) {
      case 'CS':
        playerList = this.csPlayers;
        break;
      case 'Valorant':
        playerList = this.valorantPlayers;
        break;
      case 'LoL':
        playerList = this.lolPlayers;
        break;
      default:
        console.log("Nieznana gra!");
        return;
    }

    if (playerList.length >= 5) {
      console.log("Nie można dodać więcej graczy do tej gry!");
      return;
    }

    const id = playerList.length + 1;
    playerList.push(new Player(id, firstName, lastName, nickName));
    
    console.log(`Dodano gracza do ${game}`);

    this.displayPlayers(); // wyświetl listę graczy
    
  }

  displayPlayers() {
    console.log("Gracze CS:", this.csPlayers);
    console.log("Gracze Valorant:", this.valorantPlayers);
    console.log("Gracze LoL:", this.lolPlayers);
  }

}