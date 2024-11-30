package dto

import "errors"

const (
	// Failed
	MESSAGE_FAILED_CREATE_ORDER  = "failed create order"
	MESSAGE_FAILED_GET_ALL_ORDER = "failed get all order"
	MESSAGE_FAILED_UPDATE_ORDER  = "failed update order"

	// Success
	MESSAGE_SUCCESS_CREATE_ORDER  = "success create order"
	MESSAGE_SUCCESS_GET_ALL_ORDER = "success get all order"
	MESSAGE_SUCCESS_UPDATE_ORDER  = "success update order"
)

var (
	ErrCartIsCheckout = errors.New("cart is already checkout/converted to order")
)

type (
	CreateOrderRequest struct {
		CartId string `json:"cart_id" binding:"required"`
	}

	CreateOrderResponse struct {
	}

	GetAllMyOrderResponse struct {
		Orders []OrderResponse `json:"orders"`
	}

	OrderResponse struct {
		ID           string                     `json:"id"`
		Status       string                     `json:"status"`
		OrderProduct []ProductOrderItemResponse `json:"order_product"`
	}

	ProductOrderItemResponse struct {
		ProductResponse
		BuyQuantity int    `json:"buy_quantity"`
		OrderStatus string `json:"order_status"`
	}

	UpdateOrderRequest struct {
		Status string `json:"status" binding:"required"`
	}

	UpdateOrderResponse struct {
		OrderId string `json:"order_id"`
		Status  string `json:"status"`
	}
)
