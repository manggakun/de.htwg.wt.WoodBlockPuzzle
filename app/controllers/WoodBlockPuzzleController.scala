package controllers

import de.htwg.se.woodblockpuzzle.controller.Controller
import javax.inject._
import play.api.mvc._
import de.htwg.se.woodblockpuzzle.controller.Controller
//import de.htwg.se.woodblockpuzzle.aview.tui.Tui
import de.htwg.se.woodblockpuzzle.WoodBlockPuzzle

@Singleton
class WoodBlockPuzzleController @Inject() (cc: ControllerComponents) extends AbstractController(cc){
  val gameController = WoodBlockPuzzle.controller
//  var woodBlockPuzzleastext = ""

  def getText(): String ={
    var woodBlockPuzzleastext = "COUNT: "+ gameController.returnCount + "\t HIGHSCORE: "+ gameController.returnHighscore +
      "\n" + gameController.showFieldWithCoordinates() + "\n" + gameController.showBlock(1) +
      "\n" + gameController.showBlock(2) + "\n" + gameController.showBlock(3)+
      "\n " + gameController.statusText
    woodBlockPuzzleastext
  }

  def about= Action {
    Ok(views.html.index())
  }

  def woodblock = Action {
    Ok(getText)
  }

  def reset = Action {
    gameController.reset
    Ok(getText)
  }
  def add(b:Int, x:Int, y:Int) = Action{
    gameController.addBlock(b,x,y)
    Ok(getText)
  }

  def reverse = Action {
    gameController.reverse()
    Ok(getText)
  }
  def giveup = Action {
    gameController.giveup
    Ok(getText)
  }
}