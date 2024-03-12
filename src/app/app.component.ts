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
      alert("Wszystkie pola muszą być wypełnione!");
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
        alert("Nieznana gra!");
        return;
    }

    if (playerList.length >= 5) {
      alert("Nie można dodać więcej graczy do tej gry!");
      return;
    }

     const id = playerList.length + 1;
    playerList.push(new Player(id, firstName, lastName, nickName));
    
    alert(`Dodano gracza do ${game}`);

    this.displayPlayers(); // wyświetl listę graczy
    
  }

  displayPlayers() {
    console.log("Gracze CS:", this.csPlayers);
    console.log("Gracze Valorant:", this.valorantPlayers);
    console.log("Gracze LoL:", this.lolPlayers);
  }

  deletePlayer(game: string, id: number) {
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
        alert("Nieznana gra!");
        return;
    }

    const index = playerList.findIndex(p => p.id === id);
    if (index === -1) {
      alert("Nie znaleziono gracza o podanym id!");
      return;
    }

    playerList.splice(index, 1);
    console.log(`Usunięto gracza z ${game}`);
    this.displayPlayers(); // wyświetl listę graczy
  }

  
}