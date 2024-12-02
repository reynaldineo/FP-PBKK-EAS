package service

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/reynaldineo/FP-PBKK-Golang/dto"
	"github.com/reynaldineo/FP-PBKK-Golang/entity"
	"github.com/reynaldineo/FP-PBKK-Golang/repository"
)

type (
	OrderService interface {
		CreateOrder(ctx *gin.Context, req dto.CreateOrderRequest, userId string) ([]entity.OrderItem, error)
		GetAllMyOrder(ctx *gin.Context, userId string) (dto.GetAllMyOrderResponse, error)
		UpdateOrderStatus(ctx *gin.Context, req dto.UpdateOrderRequest, orderId string) (dto.UpdateOrderResponse, error)
	}

	orderService struct {
		orderRepo   repository.OrderRepository
		cartRepo    repository.CartRepository
		productRepo repository.ProductRepository
	}
)

func NewOrderService(orderRepo repository.OrderRepository, cartRepo repository.CartRepository, productRepo repository.ProductRepository) OrderService {
	return &orderService{
		orderRepo:   orderRepo,
		cartRepo:    cartRepo,
		productRepo: productRepo,
	}
}

func (s *orderService) CreateOrder(ctx *gin.Context, req dto.CreateOrderRequest, userId string) ([]entity.OrderItem, error) {
	userUUID, err := uuid.Parse(userId)
	if err != nil {
		return []entity.OrderItem{}, err
	}

	checkoutCart, err := s.cartRepo.GetCartById(ctx, req.CartId)
	if err != nil {
		return []entity.OrderItem{}, err
	}

	// check if cart is already checkout
	if checkoutCart.IsCheckout {
		return []entity.OrderItem{}, dto.ErrCartIsCheckout
	}

	// create order, default status is PENDING
	order, err := s.orderRepo.CreateOrder(ctx, userUUID)
	if err != nil {
		return []entity.OrderItem{}, err
	}

	cartItem, err := s.cartRepo.GetAllProductCartItemByCartId(ctx, req.CartId)
	if err != nil {
		return []entity.OrderItem{}, err
	}

	var orderItem []entity.OrderItem
	for _, item := range cartItem {
		// insert order item
		orderItem = append(orderItem, entity.OrderItem{
			OrderId:   order.ID,
			ProductId: item.ProductId,
			Quantity:  item.Quantity,
		})

		// update product stock
		item.Product.StockQuantity -= item.Quantity

		_, err := s.productRepo.UpdateProduct(ctx, item.ProductId.String(), *item.Product)
		if err != nil {
			return []entity.OrderItem{}, err
		}
	}

	resOrderItem, err := s.orderRepo.CreateBatchOrderItem(ctx, orderItem)
	if err != nil {
		return []entity.OrderItem{}, err
	}

	checkoutCart.IsCheckout = true
	_, err = s.cartRepo.UpdateCartById(ctx, req.CartId, checkoutCart)
	if err != nil {
		return []entity.OrderItem{}, err
	}

	return resOrderItem, nil
}

func (s *orderService) GetAllMyOrder(ctx *gin.Context, userId string) (dto.GetAllMyOrderResponse, error) {
	userUUID, err := uuid.Parse(userId)
	if err != nil {
		return dto.GetAllMyOrderResponse{}, err
	}

	orders, err := s.orderRepo.GetAllOrderItemProductByUserId(ctx, userUUID)
	if err != nil {
		return dto.GetAllMyOrderResponse{}, err
	}

	var orderResp []dto.OrderResponse
	for _, order := range orders {
		var orderProductResp []dto.ProductOrderItemResponse
		for _, orderItem := range order.OrderItems {

			orderProductResp = append(orderProductResp, dto.ProductOrderItemResponse{
				ProductResponse: dto.ProductResponse{
					ID:          orderItem.Product.ID.String(),
					Name:        orderItem.Product.Name,
					Description: orderItem.Product.Description,
					Price:       orderItem.Product.Price,
				},
				BuyQuantity: orderItem.Quantity,
				OrderStatus: order.Status,
			})
		}

		orderResp = append(orderResp, dto.OrderResponse{
			ID:           order.ID.String(),
			Status:       order.Status,
			OrderProduct: orderProductResp,
		})
	}

	return dto.GetAllMyOrderResponse{
		Orders: orderResp,
	}, nil
}

func (s *orderService) UpdateOrderStatus(ctx *gin.Context, req dto.UpdateOrderRequest, orderId string) (dto.UpdateOrderResponse, error) {
	var order entity.Order
	order.Status = req.Status

	updatedOrder, err := s.orderRepo.UpdateOrder(ctx, orderId, order)
	if err != nil {
		return dto.UpdateOrderResponse{}, err
	}

	return dto.UpdateOrderResponse{
		OrderId: orderId,
		Status:  updatedOrder.Status,
	}, nil
}
