package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/reynaldineo/FP-PBKK-Golang/constant"
	"github.com/reynaldineo/FP-PBKK-Golang/controller"
	"github.com/reynaldineo/FP-PBKK-Golang/middleware"
	"github.com/reynaldineo/FP-PBKK-Golang/service"
)

func ProductRoute(route *gin.Engine, productController controller.ProductController, jwtService service.JWTService) {
	routes := route.Group("/api/product")
	{
		routes.GET("", middleware.Authenticate(jwtService), productController.GetAllProduct)
		routes.GET("/:id", middleware.Authenticate(jwtService), productController.GetProductByID)
		routes.POST("", middleware.Authenticate(jwtService), middleware.OnlyAllow(constant.ENUM_ROLE_ADMIN), productController.AddProduct)
		routes.PUT("/:id", middleware.Authenticate(jwtService), middleware.OnlyAllow(constant.ENUM_ROLE_ADMIN), productController.UpdateProduct)
		routes.DELETE("/:id", middleware.Authenticate(jwtService), middleware.OnlyAllow(constant.ENUM_ROLE_ADMIN), productController.DeleteProduct)
	}
}
