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
  styleUrl: './app.component.css',
})
export class AppComponent {
  csPlayers: Player[] = [];
  valorantPlayers: Player[] = [];
  lolPlayers: Player[] = [];

  addPlayer(
    game: string,
    firstName: string,
    lastName: string,
    nickName: string
  ) {
    if (!game || !firstName || !lastName || !nickName) {
      alert('Wszystkie pola muszą być wypełnione!');
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
        alert('Nieznana gra!');
        return;
    }

    if (playerList.length >= 5) {
      alert('Nie można dodać więcej graczy do tej gry!');
      return;
    }


    const id = playerList.length > 0 ? playerList[playerList.length - 1].id + 1 : 1; // jeśli lista nie jest pusta, to id = ostatni id + 1, w przeciwnym wypadku id = 1
    playerList.push(new Player(id, firstName, lastName, nickName));

    alert(`Dodano gracza do ${game}`);

    this.displayPlayers(); // wyświetl listę graczy
  }

  displayPlayers() {
    console.log('Gracze CS:', this.csPlayers);
    console.log('Gracze Valorant:', this.valorantPlayers);
    console.log('Gracze LoL:', this.lolPlayers);
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
        alert('Nieznana gra!');
        return;
    }

    const index = playerList.findIndex((p) => p.id === id);
    if (index === -1) {
      alert('Nie znaleziono gracza o podanym id!');
      return;
    }

    playerList.splice(index, 1);
    console.log(`Usunięto gracza z ${game}`);
    this.displayPlayers(); // wyświetl listę graczy
  }

  // TODO: dodać metodę do edycji gracza (zmiany imienia, nazwiska, nicku)
  // za pomocą prompt

  editPlayer(game: string, id: number) {
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
        alert('Nieznana gra!');
        return;
    }

    const index = playerList.findIndex((p) => p.id === id);
    if (index === -1) {
      alert('Nie znaleziono gracza o podanym id!');
      return;
    }

    const newFirstName = prompt('Podaj nowe imię:');
    const newLastName = prompt('Podaj nowe nazwisko:');
    const newNickName = prompt('Podaj nowy nick:');

    if (!newFirstName || !newLastName || !newNickName) {
      alert('Wszystkie pola muszą być wypełnione!');
      return;
    }

    playerList[index].name = newFirstName;
    playerList[index].surname = newLastName;
    playerList[index].nickname = newNickName;

    console.log(`Zmieniono gracza z ${game}`);
    this.displayPlayers(); // wyświetl listę graczy
  }
}
