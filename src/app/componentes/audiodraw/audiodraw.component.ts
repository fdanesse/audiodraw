import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
// npm install angular-audio-context
import { AudioContext } from 'angular-audio-context';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-audiodraw',
  template: `
    <div class='contenedor'>
    <div class='base'>
    <div class='barra' *ngFor='let x of cantidad'></div>
    </div>
    <h5>{{audio.src}}</h5>
    <audio id='audioplayer' controls='true'></audio>
    </div>
    `,
  styleUrls: ['./audiodraw.component.css']
})
export class AudiodrawComponent implements OnInit, OnDestroy {

  // REPRODUCTOR
  url = '';
  vol = 0.05;
  cantidad = Array(32);
  color;

  audio = undefined;

  // ANALIZADOR
  src = undefined;
  analyser = undefined;
  data = undefined;

  constructor(private _audioContext: AudioContext) {}

  redraw(self) {
    if (self.data !== undefined) {
      self.analyser.getByteFrequencyData(self.data);
      // self.analyser.getByteTimeDomainData(self.data); // osciloscopio
      const barras = document.getElementsByClassName('barra');
      const lado = 320;
      for (let i = 0; i < barras.length; i++) {
        const barra = barras[i] as HTMLDivElement;
        const altura = (self.data[i] / 256) * lado;
        barra.style.height = altura + 'px';
        barra.style.backgroundColor = self.color;
      }
    }
  }

  ngOnInit() {
    /* Crea un nuevo objeto audio con posibilidad de dibujarse */
    this.audio = document.getElementById('audioplayer') as HTMLAudioElement; // new Audio();
    this.audio.preload = 'none';
    this.audio.volume = this.vol;
    this.audio.autoplay = false;
    this.audio.crossOrigin = 'anonymous';

    // ANALIZADOR
    this.src = this._audioContext.createMediaElementSource(this.audio);
    this.analyser = this._audioContext.createAnalyser();
    this.analyser.fftSize = 128;
    this.src.connect(this.analyser);
    this.src.connect(this._audioContext.destination);
    this.data = new Uint8Array(this.analyser.fftSize);

    const url = 'http://media-ice.musicradio.com/CapitalUKMP3';
    this.url = url;
    this.audio.src = this.url;

    setInterval(this.redraw, 10, this);
  }

  ngOnDestroy() {
  }
}
