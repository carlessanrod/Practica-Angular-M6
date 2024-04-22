import { Injectable } from '@angular/core';
import { Player } from '../interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class Playerservice {

  private Player: Player[] = [];

  constructor() { }

  getAllPlayer(): Player[] {
    return this.Player;
  }

  getPlayer(nombredejugador: string): Player {
    return this.Player.find(Player => Player.nombredejugador === nombredejugador) as Player;
  }

  addPlayer(Player: Player): void {
    this.Player.push(Player);
  }

  updatePlayer(Player: Player): void {
    const index = this.Player.findIndex(p => p.nombredejugador === Player.nombredejugador);
    this.Player[index] = Player;
  }

  deletePlayer(nombredejugador: string): void {
    this.Player = this.Player.filter(Player => Player.nombredejugador !== nombredejugador);
  }

  PlayerNameExists(nombredejugador: string): boolean {
    return this.Player.some(Player => Player.nombredejugador === nombredejugador);
  }

  PlayernacionalidadExists(nacionalidad: string): boolean {
    return this.Player.some(Player => Player.nacionalidad === nacionalidad);
  }
}
