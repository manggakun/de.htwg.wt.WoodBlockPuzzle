package controllers

import javax.inject._
import play.api.mvc._
import de.htwg.se.woodblockpuzzle.controller.Controller
import de.htwg.se.woodblockpuzzle.WoodBlockPuzzle
import play.api.libs.json.{JsObject, JsValue, Json}
import play.api.libs.json.Json._
import play.api.libs.streams.ActorFlow
import akka.actor.ActorSystem
import akka.stream.Materializer
import akka.actor._
import de.htwg.se.woodblockpuzzle.controller.FieldChanged

import scala.swing.Reactor

import scala.util.parsing.json.JSONArray

@Singleton
class WoodBlockPuzzleController @Inject() (cc: ControllerComponents) (implicit system: ActorSystem, mat: Materializer) extends AbstractController(cc){
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
//  Ok(getText)
    Ok(views.html.woodBlockPuzzle(gameController))
  }

  def reset = Action {
    gameController.reset
    Ok(views.html.woodBlockPuzzle(gameController))
  }

  def addChosen(x:Int, y:Int)= Action{
   gameController.addBlock(gameController.getChosenBlock(),x,y)
   Ok(views.html.woodBlockPuzzle(gameController))
  }
  def setChosen(b:Int)= Action{
    gameController.setChosenBlock(b)
    Ok(views.html.woodBlockPuzzle(gameController))
  }

  def reverse = Action {
    gameController.reverse()
    Ok(views.html.woodBlockPuzzle(gameController))
  }
  def giveup = Action {
    gameController.giveup
    Ok(views.html.woodBlockPuzzle(gameController))
  }

  def fieldToJson(controller: Controller): JsObject = {
    obj(
      "b1" -> toJson(controller.b1.toString()),
      "b2" -> toJson(controller.b2.toString()),
      "b3" -> toJson(controller.b3.toString()),
      "field" -> toJson(controller.field.toString()),
      "count"-> toJson(controller.returnCount.toString()),
      "highscore" -> toJson(controller.returnHighscore.toString()),
      "statusText" -> toJson(controller.statusText.toString())
    )
  }

  def actionJson = Action {
    Ok(fieldToJson(gameController))
  }

  def add(b:Int, x:Int, y:Int) = Action{
    gameController.addBlock(b,x,y)
    Ok(views.html.woodBlockPuzzle(gameController))
  }

  def socket = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef { out =>
      println("Connect received")
      WoodblockWebSocketActorFactory.create(out)
    }
  }

  object WoodblockWebSocketActorFactory {
    def create(out: ActorRef) = {
      Props(new WoodblockWebSocketActor(out))
    }
  }

  class WoodblockWebSocketActor(out: ActorRef) extends Actor with Reactor{
    listenTo(gameController)

    def receive = {
      case msg: String =>
        out ! (fieldToJson(gameController).toString())
        println("Sent Json to Client"+ msg)
    }

    reactions += {
      case event: FieldChanged => sendJsonToClient
    }

    def sendJsonToClient = {
      println("Received event from Controller")
      out ! (fieldToJson(gameController).toString())
    }
  }


}