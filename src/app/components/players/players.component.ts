import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Player } from '../../interfaces/player';
import { Playerservice } from '../../services/player.service';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersComponent { 

  players: Player[] = [];
  searchTerm: string = '';

  constructor(private playerService: Playerservice) { }

  ngOnInit(): void {
    this.players = this.playerService.getAllPlayer();
  }

  search(term: string): void {
    // Si el término de búsqueda está vacío, mostrar todos los playeros
    if (!term.trim()) {
      this.players = this.playerService.getAllPlayer();
      return;
    }

    // Filtrar los playeros que coincidan con el término de búsqueda
    this.players = this.playerService.getAllPlayer().filter(player =>
      player.nombredejugador.toLowerCase().includes(term.toLowerCase())
    );
  }
}
