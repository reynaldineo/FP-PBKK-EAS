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
	OrderController interface {
		CreateOrder(ctx *gin.Context)
		GetAllMyOrder(ctx *gin.Context)
		UpdateOrderStatus(ctx *gin.Context)
	}

	orderController struct {
		orderService service.OrderService
	}
)

func NewOrderController(orderService service.OrderService) OrderController {
	return &orderController{
		orderService: orderService,
	}
}

func (c *orderController) CreateOrder(ctx *gin.Context) {
	var req dto.CreateOrderRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	userId := ctx.MustGet(constant.CTX_KEY_USER_ID).(string)

	res, err := c.orderService.CreateOrder(ctx, req, userId)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_CREATE_ORDER, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, res)
		return
	}

	resp := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_CREATE_ORDER, res)
	ctx.JSON(http.StatusOK, resp)
}

func (c *orderController) GetAllMyOrder(ctx *gin.Context) {
	userId := ctx.MustGet(constant.CTX_KEY_USER_ID).(string)

	res, err := c.orderService.GetAllMyOrder(ctx, userId)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_ALL_ORDER, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, res)
		return
	}

	resp := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_ALL_ORDER, res)
	ctx.JSON(http.StatusOK, resp)
}

func (c *orderController) UpdateOrderStatus(ctx *gin.Context) {
	var req dto.UpdateOrderRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	orderId := ctx.Param("id")

	res, err := c.orderService.UpdateOrderStatus(ctx, req, orderId)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_ORDER, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, res)
		return
	}

	resp := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_UPDATE_ORDER, res)
	ctx.JSON(http.StatusOK, resp)
}
