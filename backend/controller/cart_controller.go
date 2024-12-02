package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/reynaldineo/FP-PBKK-Golang/constant"
	"github.com/reynaldineo/FP-PBKK-Golang/dto"
	"github.com/reynaldineo/FP-PBKK-Golang/service"
	"github.com/reynaldineo/FP-PBKK-Golang/utils"
)

type (
	CartController interface {
		AddCartItem(ctx *gin.Context)
		GetMyCartItem(ctx *gin.Context)
		UpdateCartItem(ctx *gin.Context)
	}

	cartController struct {
		cartService service.CartService
	}
)

func NewCartController(cartSerivce service.CartService) CartController {
	return &cartController{
		cartService: cartSerivce,
	}
}

func (c *cartController) AddCartItem(ctx *gin.Context) {
	var req dto.AddCartItemRequest
	if err := ctx.ShouldBind(&req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	userId := ctx.MustGet(constant.CTX_KEY_USER_ID).(string)

	resp, err := c.cartService.AddCartItem(ctx, req, userId)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_ADD_CART_ITEM, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_ADD_CART_ITEM, resp)
	ctx.JSON(http.StatusOK, res)
}

func (c *cartController) GetMyCartItem(ctx *gin.Context) {
	userId := ctx.MustGet(constant.CTX_KEY_USER_ID).(string)

	resp, err := c.cartService.GetMyCartItem(ctx, userId)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_CART_ITEM, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_CART_ITEM, resp)
	ctx.JSON(http.StatusOK, res)
}

func (c *cartController) UpdateCartItem(ctx *gin.Context) {
	var req dto.UpdateCartItemRequest
	if err := ctx.ShouldBind(&req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	userId := ctx.MustGet(constant.CTX_KEY_USER_ID).(string)
	cartItemId := ctx.Param("id")

	resp, err := c.cartService.UpdateCartItem(ctx, req, userId, cartItemId)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_CART_ITEM, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, res)
		return
	}

	res := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_UPDATE_CART_ITEM, resp)
	ctx.JSON(http.StatusOK, res)
}
