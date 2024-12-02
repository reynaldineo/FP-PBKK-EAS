package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/reynaldineo/FP-PBKK-Golang/controller"
	"github.com/reynaldineo/FP-PBKK-Golang/middleware"
	"github.com/reynaldineo/FP-PBKK-Golang/service"
)

func CartRoute(route *gin.Engine, cartController controller.CartController, jwtService service.JWTService) {
	routes := route.Group("/api/cart")
	{
		routes.GET("", middleware.Authenticate(jwtService), cartController.GetMyCartItem)
		routes.POST("", middleware.Authenticate(jwtService), cartController.AddCartItem)
		routes.PUT("/:id", middleware.Authenticate(jwtService), cartController.UpdateCartItem)
	}
}
