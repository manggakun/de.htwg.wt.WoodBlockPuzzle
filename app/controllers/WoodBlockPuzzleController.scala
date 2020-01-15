package controllers

import javax.inject._
import de.htwg.se.woodblockpuzzle.controller.Controller
import de.htwg.se.woodblockpuzzle.WoodBlockPuzzle
import de.htwg.se.woodblockpuzzle.controller.FieldChanged

import scala.concurrent.{ ExecutionContext, Future }
import scala.swing.Reactor
import com.mohiva.play.silhouette.api.Silhouette
import com.mohiva.play.silhouette.api.actions.SecuredRequest

import scala.util.parsing.json.JSONArray
import org.webjars.play.WebJarsUtil

@Singleton //class WoodBlockPuzzleController @Inject() (cc: ControllerComponents) (implicit system: ActorSystem, mat: Materializer, ec: ExecutionContext) extends AbstractController(cc){
class WoodBlockPuzzleController @Inject() (components: ControllerComponents, silhouette: Silhouette[DefaultEnv])(implicit webJarsUtil: WebJarsUtil, assets: AssetsFinder, system: ActorSystem, mat: Materializer)
  extends AbstractController(components) with I18nSupport {
  val gameController = WoodBlockPuzzle.controller

  def getText(): String = {
    var woodBlockPuzzleastext = "COUNT: " + gameController.returnCount + "\t HIGHSCORE: " + gameController.returnHighscore +
      "\n" + gameController.showFieldWithCoordinates() + "\n" + gameController.showBlock(1) +
      "\n" + gameController.showBlock(2) + "\n" + gameController.showBlock(3) +
      "\n " + gameController.statusText
    woodBlockPuzzleastext
  }

  def about = Action {
    Ok(views.html.index())
  }

  //  def woodblock = Action {
  //    //  Ok(getText)
  //    Ok(views.html.woodBlockPuzzle(gameController))
  //  }

  def vueWoodblock = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
    Future.successful(Ok(views.html.vueWoodblock(gameController)))
  }

  def woodblock = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
    Future.successful(Ok(views.html.sudoku(gameController, message, request.identity)))
  }

  def reset = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
    gameController.reset
    Future.successful(Ok(views.html.woodBlockPuzzle(gameController)))
  }

  def reverse = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
    gameController.reverse()
    Future.successful(Ok(views.html.woodBlockPuzzle(gameController)))
  }
  def giveup = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
    gameController.giveup
    Future.successful(Ok(views.html.woodBlockPuzzle(gameController)))
  }

  def fieldToJson(controller: Controller): JsObject = {
    obj(
      "b1" -> toJson(controller.b1.toString()),
      "b2" -> toJson(controller.b2.toString()),
      "b3" -> toJson(controller.b3.toString()),
      "field" -> toJson(controller.field.toString()),
      "count" -> toJson(controller.returnCount.toString()),
      "highscore" -> toJson(controller.returnHighscore.toString()),
      "statusText" -> toJson(controller.statusText.toString())
    )
  }

  def actionJson = Action {
    Ok(fieldToJson(gameController))
  }

  def add(b: Int, x: Int, y: Int) = silhouette.SecuredAction.async { implicit request: SecuredRequest[DefaultEnv, AnyContent] =>
    gameController.addBlock(b, x, y)
    Future.successful(Ok(views.html.woodBlockPuzzle(gameController)))
  }

  def socket = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef { out =>
      println("Connect received")
      WoodblockWebSocketActorFactory.create(out)
    }
  }

  //  def woodblockPolymer = Action{
  //    Ok(views.html.woodBlockPuzzlePolymer(gameController))
  //  }

  object WoodblockWebSocketActorFactory {
    def create(out: ActorRef) = {
      Props(new WoodblockWebSocketActor(out))
    }
  }

  class WoodblockWebSocketActor(out: ActorRef) extends Actor with Reactor {
    listenTo(gameController)

    def receive = {
      case msg: String =>
        out ! (fieldToJson(gameController).toString())
        println("Sent Json to Client" + msg)
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