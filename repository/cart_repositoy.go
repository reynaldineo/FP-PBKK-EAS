package repository

import (
	"context"

	"github.com/reynaldineo/FP-PBKK-Golang/entity"
	"gorm.io/gorm"
)

type (
	CartRepository interface {
		GetCardByUserId(ctx context.Context, userId string) (entity.Cart, error)
		CreateCart(ctx context.Context, cart entity.Cart) (entity.Cart, error)
		AddCartItem(ctx context.Context, cartItem []entity.CartItem) ([]entity.CartItem, error)
		GetCartItemByCardIdProductId(ctx context.Context, cartId string, productId string) (entity.CartItem, error)
		UpdateCartItem(ctx context.Context, cartItem entity.CartItem) (entity.CartItem, error)
		GetCartItemByCartId(ctx context.Context, cartId string) ([]entity.CartItem, error)
		GetCartItemById(ctx context.Context, cartItemId string) (entity.CartItem, error)
	}

	cartRepository struct {
		db *gorm.DB
	}
)

func NewCartRepository(db *gorm.DB) CartRepository {
	return &cartRepository{
		db: db,
	}
}

func (r *cartRepository) GetCardByUserId(ctx context.Context, userId string) (entity.Cart, error) {
	var cart entity.Cart
	err := r.db.WithContext(ctx).Where("user_id = ?", userId).Last(&cart).Error
	if err != nil {
		return entity.Cart{}, err
	}

	return cart, nil
}

func (r *cartRepository) CreateCart(ctx context.Context, cart entity.Cart) (entity.Cart, error) {
	err := r.db.WithContext(ctx).Create(&cart).Error
	if err != nil {
		return entity.Cart{}, err
	}

	return cart, nil
}

func (r *cartRepository) AddCartItem(ctx context.Context, cartItem []entity.CartItem) ([]entity.CartItem, error) {
	err := r.db.WithContext(ctx).Create(&cartItem).Error
	if err != nil {
		return []entity.CartItem{}, err
	}

	return cartItem, nil
}

func (r *cartRepository) GetCartItemByCardIdProductId(ctx context.Context, cartId string, productId string) (entity.CartItem, error) {
	var cartItem entity.CartItem
	err := r.db.WithContext(ctx).Where("cart_id = ? AND product_id = ?", cartId, productId).Last(&cartItem).Error
	if err != nil {
		return entity.CartItem{}, err
	}

	return cartItem, nil
}

func (r *cartRepository) UpdateCartItem(ctx context.Context, cartItem entity.CartItem) (entity.CartItem, error) {
	err := r.db.WithContext(ctx).Save(&cartItem).Error
	if err != nil {
		return entity.CartItem{}, err
	}

	return cartItem, nil
}

func (r *cartRepository) GetCartItemByCartId(ctx context.Context, cartId string) ([]entity.CartItem, error) {
	var cartItem []entity.CartItem

	err := r.db.WithContext(ctx).
		Where("cart_id = ?", cartId).
		Preload("Product").
		Find(&cartItem).Error

	if err != nil {
		return []entity.CartItem{}, err
	}

	return cartItem, nil
}

func (r *cartRepository) GetCartItemById(ctx context.Context, cartItemId string) (entity.CartItem, error) {
	var cartItem entity.CartItem
	err := r.db.WithContext(ctx).Where("id = ?", cartItemId).Last(&cartItem).Error
	if err != nil {
		return entity.CartItem{}, err
	}

	return cartItem, nil
}
