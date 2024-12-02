package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/reynaldineo/FP-PBKK-Golang/controller"
	"github.com/reynaldineo/FP-PBKK-Golang/middleware"
	"github.com/reynaldineo/FP-PBKK-Golang/service"
)

func OrderRoute(route *gin.Engine, orderController controller.OrderController, jwtService service.JWTService) {
	routes := route.Group("/api/order")
	{
		routes.POST("", middleware.Authenticate(jwtService), orderController.CreateOrder)
		routes.GET("", middleware.Authenticate(jwtService), orderController.GetAllMyOrder)
		routes.PUT("/:id", middleware.Authenticate(jwtService), orderController.UpdateOrderStatus)
	}
}
