package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/reynaldineo/FP-PBKK-Golang/constant"
	"github.com/reynaldineo/FP-PBKK-Golang/controller"
	"github.com/reynaldineo/FP-PBKK-Golang/middleware"
	"github.com/reynaldineo/FP-PBKK-Golang/service"
)

func UserRoute(route *gin.Engine, userController controller.UserController, jwtService service.JWTService) {
	routes := route.Group("/api/user")
	{
		routes.POST("/register", userController.Register)
		routes.POST("/login", userController.Login)
		routes.GET("/me", middleware.Authenticate(jwtService), userController.GetMe)
		routes.DELETE("/delete/:userId", middleware.Authenticate(jwtService), middleware.OnlyAllow(constant.ENUM_ROLE_ADMIN), userController.DeleteByUserId)
	}
}
