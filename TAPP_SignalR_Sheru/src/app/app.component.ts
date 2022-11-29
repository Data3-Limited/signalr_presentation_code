import { Component, OnInit } from '@angular/core';
import { Observable, pipe, pluck, take } from 'rxjs';
import { BoardState, GameState, PlayerType, WhichBoard } from './game/GameVariables';
import { GameService } from './services/game.service';
import { SignalRService } from './services/signalr.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
   title = 'app';
   connId = '';

   //gameState$?: Observable<GameState>;
   boardLeft$?: Observable<BoardState>;
   boardRight$?: Observable<BoardState>;
   player$?: Observable<PlayerType>;

   constructor(
      private signalRService: SignalRService,
      private gameService: GameService
   ) {

   }

   ngOnInit() {

      this.signalRService.startConnection();
      this.getBoardState();

   }

   getBoardState() {
      this.player$ = this.gameService.getPlayer();
      this.boardLeft$ = this.gameService.getLeftBoardState();
      this.boardRight$ = this.gameService.getRightBoardState();
   }
}
