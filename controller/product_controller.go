package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/reynaldineo/FP-PBKK-Golang/dto"
	"github.com/reynaldineo/FP-PBKK-Golang/service"
	"github.com/reynaldineo/FP-PBKK-Golang/utils"
)

type (
	ProductController interface {
		AddProduct(ctx *gin.Context)
		GetAllProduct(ctx *gin.Context)
		GetProductByID(ctx *gin.Context)
		UpdateProduct(ctx *gin.Context)
		DeleteProduct(ctx *gin.Context)
	}

	productController struct {
		productService service.ProductService
	}
)

func NewProductController(productService service.ProductService) ProductController {
	return &productController{
		productService: productService,
	}
}

func (c *productController) AddProduct(ctx *gin.Context) {
	var req dto.ProductRequest
	if err := ctx.ShouldBind(&req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res, err := c.productService.AddProduct(ctx, req)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAFE_FAILED_ADD_PRODUCT, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, res)
		return
	}

	resp := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_ADD_PRODUCT, res)
	ctx.JSON(http.StatusOK, resp)
}

func (c *productController) GetAllProduct(ctx *gin.Context) {
	res, err := c.productService.GetAllProduct(ctx)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_ALL_PRODUCT, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, res)
		return
	}

	resp := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_ALL_PRODUCT, res)
	ctx.JSON(http.StatusOK, resp)
}

func (c *productController) GetProductByID(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_PARAM, dto.ErrGetDataParam.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res, err := c.productService.GetProductByID(ctx, id)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DETAIL_PRODUCT, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, res)
		return
	}

	resp := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_GET_DETAIL_PRODUCT, res)
	ctx.JSON(http.StatusOK, resp)
}

func (c *productController) UpdateProduct(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_PARAM, dto.ErrGetDataParam.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	var req dto.ProductRequest
	if err := ctx.ShouldBind(&req); err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res, err := c.productService.UpdateProduct(ctx, id, req)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_UPDATE_PRODUCT, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, res)
		return
	}

	resp := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_UPDATE_PRODUCT, res)
	ctx.JSON(http.StatusOK, resp)
}

func (c *productController) DeleteProduct(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_GET_DATA_FROM_PARAM, dto.ErrGetDataParam.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	err := c.productService.DeleteProduct(ctx, id)
	if err != nil {
		res := utils.BuildResponseFailed(dto.MESSAGE_FAILED_DELETE_PRODUCT, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, res)
		return
	}

	resp := utils.BuildResponseSuccess(dto.MESSAGE_SUCCESS_DELETE_PRODUCT, nil)
	ctx.JSON(http.StatusOK, resp)
}
