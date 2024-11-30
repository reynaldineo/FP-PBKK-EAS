package dto

import "errors"

const (
	// Failed
	MESSAGE_FAILED_ADD_CART_ITEM    = "failed add cart item"
	MESSAGE_FAILED_GET_CART_ITEM    = "failed get cart item"
	MESSAGE_FAILED_UPDATE_CART_ITEM = "failed update cart item"

	// Success
	MESSAGE_SUCCESS_ADD_CART_ITEM    = "success add cart item"
	MESSAGE_SUCCESS_GET_CART_ITEM    = "success get cart item"
	MESSAGE_SUCCESS_UPDATE_CART_ITEM = "success update cart item"
)

var (
	ErrQuantityBelowZero = errors.New("quantity cannot below zero")
)

type (
	AddCartItemRequest []struct {
		ProductID string `json:"product_id" binding:"required"`
		Quantity  int    `json:"quantity" binding:"required"`
	}

	AddCartItemResponse struct {
		ProductID int `json:"product_id"`
		Quantity  int `json:"quantity"`
	}

	UpdateCartItemRequest struct {
		Quantity int `json:"quantity" binding:"required"`
	}

	GetProductCartItemResponse struct {
		ID            string `json:"id"`
		Name          string `json:"name"`
		Description   string `json:"description"`
		Price         int    `json:"price"`
		StockQuantity int    `json:"stock_quantity"`
		Category      string `json:"category"`
		ImageUrl      string `json:"image_url"`
		BuyQuantity   int    `json:"buy_quantity"`
	}
)
