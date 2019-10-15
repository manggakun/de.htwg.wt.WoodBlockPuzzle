package controllers

import de.htwg.se.woodblockpuzzle.controller.Controller
import javax.inject._
import play.api.mvc._
import de.htwg.se.woodblockpuzzle.model
import de.htwg.se.woodblockpuzzle.controller.Controller
import de.htwg.se.woodblockpuzzle.aview.tui.Tui
import de.htwg.se.woodblockpuzzle.WoodBlockPuzzle

@Singleton
class WoodBlockPuzzleController @Inject() (cc: ControllerComponents) extends AbstractController(cc){
//class WoodBlockPuzzleController @Inject()(cc: ControllerComponents) {
//  val gameController = Sudoku.controller
//  def sudokuAsText =  gameController.gridToString + GameStatus.message(gameController.gameStatus)
//  val gameController = new Controller
//  def tui = new Tui(gameController)

  var woodBlockPuzzle = new WoodBlockPuzzle
  def about= Action {
    Ok(views.html.index())
  }

  def sudoku = Action {
    Ok(woodBlockPuzzle)
  }

}