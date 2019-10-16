package controllers

import de.htwg.se.woodblockpuzzle.controller.Controller
import javax.inject._
import play.api.mvc._
import de.htwg.se.woodblockpuzzle.controller.Controller
import de.htwg.se.woodblockpuzzle.aview.tui.Tui
import de.htwg.se.woodblockpuzzle.WoodBlockPuzzle

@Singleton
class WoodBlockPuzzleController @Inject() (cc: ControllerComponents) extends AbstractController(cc){

  var woodBlockPuzzleastext = WoodBlockPuzzle.controller.showFieldWithCoordinates()
  def about= Action {
    Ok(views.html.index())
  }

  def woodblock = Action {
    Ok(woodBlockPuzzleastext)
  }


}