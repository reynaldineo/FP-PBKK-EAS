package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"

	"github.com/reynaldineo/FP-PBKK-Golang/cmd"
	"github.com/reynaldineo/FP-PBKK-Golang/config"
	"github.com/reynaldineo/FP-PBKK-Golang/controller"
	"github.com/reynaldineo/FP-PBKK-Golang/middleware"
	"github.com/reynaldineo/FP-PBKK-Golang/repository"
	"github.com/reynaldineo/FP-PBKK-Golang/routes"
	"github.com/reynaldineo/FP-PBKK-Golang/service"
)

func main() {
	db := config.SetUpDatabaseConnection()
	defer config.CloseDatabaseConnection(db)

	if len(os.Args) > 1 {
		cmd.Commands(db)
		return
	}

	var (
		jwtService service.JWTService = service.NewJWTService()

		//* === Dependecy Injection Implementation ===

		//* == Repository ==
		userRepository    repository.UserRepository    = repository.NewUserRepository(db)
		productRepository repository.ProductRepository = repository.NewProductRepository(db)
		cartRepository    repository.CartRepository    = repository.NewCartRepository(db)

		//* == Service ==
		userService    service.UserService    = service.NewUserService(userRepository, jwtService)
		productService service.ProductService = service.NewProductService(productRepository)
		cartService    service.CartService    = service.NewCartService(cartRepository)

		//* == Controller ==
		userController    controller.UserController    = controller.NewUserController(userService)
		productController controller.ProductController = controller.NewProductController(productService)
		cartController    controller.CartController    = controller.NewCartController(cartService)
	)

	server := gin.Default()
	server.Use(middleware.CORSMiddleware())

	//* == routes ==
	routes.UserRoute(server, userController, jwtService)
	routes.ProductRoute(server, productController, jwtService)
	routes.CartRoute(server, cartController, jwtService)

	server.Static("/assets", "./assets")
	port := os.Getenv("PORT")
	if port == "" {
		port = "8888"
	}

	var serve string
	if os.Getenv("APP_ENV") == "development" {
		serve = "127.0.0.1:" + port
	} else {
		serve = ":" + port
	}

	if err := server.Run(serve); err != nil {
		log.Fatalf("error running server: %v", err)
	}

}
