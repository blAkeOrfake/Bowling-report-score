import { Component } from '@angular/core';
import { FileService } from './file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eplan-zadanie-rekrutacyjne';
  columns = ['Zawodnik', 'Wynik', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'];
  file;
  players = [];
  throws = [];
  scores = [];

  constructor(){}


  public uploadFile(files: FileList) {

    if (files && files.length > 0) {
      const file: File = files.item(0);
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        const fileContent: string = reader.result as string;
        this.file = fileContent;
        this.readFile();
      };
    }

  }
  readFile(){

    let result = this.file.split('\n');
    for (let i = 0; i < result.length; i++) {
      if (i % 2 === 0) {
        this.players.push(result[i]);
      } else {
        this.throws.push(result[i].trim().split(', ').map(Number));
      }
    }
    this.getSum();
  }

  getSum(){
    let players = this.throws.map(arr => {
      return arr.slice();
    });

    for (let i = 0; i < players.length; i++){
      let result = 0;
      let frameScores = [];

      while(players[i].length) {
        frameScores.push(players[i].splice(0,2))
      };

      if (frameScores[10]) {
        frameScores[9].push(frameScores[10][0]);
        frameScores.pop();
      }
  
      for(let currentRound = 0; currentRound < 10; currentRound++){

          if(frameScores[currentRound][0] === 10) { // STRIKE
            if( currentRound === 9) {
              result += (10 + frameScores[currentRound][1] + frameScores[currentRound][2]);
            } else {
              result += (10 + (frameScores[currentRound + 1][0] + frameScores[currentRound + 1][1]));
            }
  
          } else if (frameScores[currentRound][0] + frameScores[currentRound][1] === 10) { // SPARE
            if ( currentRound === 9) {
              result += (10 + frameScores[currentRound][2]);
            } else {
              result += (10 + frameScores[currentRound + 1][0]);
            }
            
          } else {
            result += (frameScores[currentRound][0] + frameScores[currentRound][1]);
          }
        }

      this.scores.push(result);
    }
  }
}
