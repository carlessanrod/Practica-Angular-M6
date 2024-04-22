import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Player } from '../../interfaces/player';
import { Playerservice } from '../../services/player.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FormComponent {

  constructor(private playerService: Playerservice) { }

  nameExists: boolean = false;
  nacionalidadExists: boolean = false;

  categories: string[] = ['Derecha', 'Izquierda'];

  playerForm = new FormGroup({
    nombredejugador: new FormControl('', [Validators.required,]),
    numerodejugador: new FormControl('', [Validators.required, Validators.min(0), Validators.max(99)]),
    nacionalidad: new FormControl('', [Validators.maxLength(50), Validators.required]),
    piernabuena: new FormControl('', Validators.required),
    jugadorlibre: new FormControl(false),
    imagen: new FormControl(),
  });

  onSubmit() {
    const nombredejugador = this.playerForm.value.nombredejugador;

    if (nombredejugador) {
      const existingPlayer = this.playerService.getPlayer(nombredejugador);

      if (existingPlayer) {
        existingPlayer.nombredejugador = this.playerForm.value.nombredejugador ? this.playerForm.value.nombredejugador : ' ';
        existingPlayer.numerodejugador = parseFloat(!!this.playerForm.value.numerodejugador ? this.playerForm.value.numerodejugador.toString() : '0');
        existingPlayer.nacionalidad = this.playerForm.value.nacionalidad ? this.playerForm.value.nacionalidad : ' ';
        existingPlayer.piernabuena = this.playerForm.value.piernabuena ? this.playerForm.value.piernabuena : ' ';
        existingPlayer.jugadorlibre = typeof this.playerForm.value.jugadorlibre === 'string' ? (this.playerForm.value.jugadorlibre === 'true') : !!this.playerForm.value.jugadorlibre;
        existingPlayer.imagen = this.playerForm.value.imagen ? this.playerForm.value.imagen : ' ';

        this.playerService.updatePlayer(existingPlayer);
      } else {
        const newName = this.playerForm.value.nombredejugador ?? '';
        const newnacionalidad = this.playerForm.value.nacionalidad ?? '';

        if (this.playerService.PlayerNameExists(newName)) {
          this.nameExists = true;
          console.error('Error: nombredejugador already exists.');
          return;
        }
  
        if (this.playerService.PlayernacionalidadExists(newnacionalidad)) {
          this.nacionalidadExists = true;
          console.error('Error: nacionalidad already exists.');
          return;
        }

        const newPlayer: Player = {
          
          nombredejugador: newName ? newName : ' ',
          numerodejugador: parseFloat(!!this.playerForm.value.numerodejugador ? this.playerForm.value.numerodejugador.toString() : '0'),
          nacionalidad: newnacionalidad ? newnacionalidad : ' ',
          piernabuena: this.playerForm.value.piernabuena ? this.playerForm.value.piernabuena : ' ',
          jugadorlibre: typeof this.playerForm.value.jugadorlibre === 'string' ? (this.playerForm.value.jugadorlibre === 'true') : !!this.playerForm.value.jugadorlibre,
          imagen: this.playerForm.value.imagen ? this.playerForm.value.imagen : ' '
        };
        this.playerService.addPlayer(newPlayer);
      }
      this.playerForm.reset();
      this.nameExists = false;
      this.nacionalidadExists = false;
    }
  }
}