package repository

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/reynaldineo/FP-PBKK-Golang/entity"
	"gorm.io/gorm"
)

type (
	OrderRepository interface {
		CreateOrder(ctx *gin.Context, userId uuid.UUID) (entity.Order, error)
		CreateBatchOrderItem(ctx *gin.Context, orderItem []entity.OrderItem) ([]entity.OrderItem, error)
		GetAllOrderItemProductByUserId(ctx *gin.Context, userId uuid.UUID) ([]entity.Order, error)
		UpdateOrder(ctx *gin.Context, orderId string, order entity.Order) (entity.Order, error)
	}

	orderRepository struct {
		db *gorm.DB
	}
)

func NewOrderRepository(db *gorm.DB) OrderRepository {
	return &orderRepository{
		db: db,
	}
}

func (r *orderRepository) CreateOrder(ctx *gin.Context, userId uuid.UUID) (entity.Order, error) {
	var order entity.Order
	order.UserId = userId
	order.Status = "pending"

	err := r.db.WithContext(ctx).Create(&order).Error
	if err != nil {
		return entity.Order{}, err
	}

	return order, nil
}

func (r *orderRepository) CreateBatchOrderItem(ctx *gin.Context, orderItem []entity.OrderItem) ([]entity.OrderItem, error) {
	err := r.db.WithContext(ctx).Create(&orderItem).Error
	if err != nil {
		return []entity.OrderItem{}, err
	}

	return orderItem, nil
}

func (r *orderRepository) GetAllOrderItemProductByUserId(ctx *gin.Context, userId uuid.UUID) ([]entity.Order, error) {
	var orders []entity.Order

	err := r.db.WithContext(ctx).
		Where("orders.user_id = ?", userId).
		Preload("OrderItems").
		Preload("OrderItems.Product").
		Find(&orders).Error

	if err != nil {
		return []entity.Order{}, err
	}

	return orders, nil
}

func (r *orderRepository) UpdateOrder(ctx *gin.Context, orderId string, order entity.Order) (entity.Order, error) {
	err := r.db.WithContext(ctx).Model(&entity.Order{}).Where("id = ?", orderId).Updates(&order).Error
	if err != nil {
		return entity.Order{}, err
	}

	return order, nil
}
