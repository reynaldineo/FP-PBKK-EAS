package service

import (
	"context"

	"github.com/google/uuid"
	"github.com/reynaldineo/FP-PBKK-Golang/dto"
	"github.com/reynaldineo/FP-PBKK-Golang/entity"
	"github.com/reynaldineo/FP-PBKK-Golang/repository"
	"gorm.io/gorm"
)

type (
	CartService interface {
		AddCartItem(ctx context.Context, req dto.AddCartItemRequest, userId string) (dto.AddCartItemResponse, error)
		CreateCart(ctx context.Context, userId uuid.UUID) (entity.Cart, error)
		GetMyCartItem(ctx context.Context, userId string) ([]dto.GetProductCartItemResponse, error)
		UpdateCartItem(ctx context.Context, req dto.UpdateCartItemRequest, userId string, cartItemId string) (dto.AddCartItemResponse, error)
	}

	cartService struct {
		cartRepo repository.CartRepository
	}
)

func NewCartService(cartRepo repository.CartRepository) CartService {
	return &cartService{
		cartRepo: cartRepo,
	}
}

func (s *cartService) AddCartItem(ctx context.Context, req dto.AddCartItemRequest, userId string) (dto.AddCartItemResponse, error) {
	userIdUUID, err := uuid.Parse(userId)
	if err != nil {
		return dto.AddCartItemResponse{}, err
	}

	// get card to check the status
	cart, err := s.cartRepo.GetCardByUserId(ctx, userId)
	if err != nil && err != gorm.ErrRecordNotFound {
		return dto.AddCartItemResponse{}, err
	}

	cartId := cart.ID

	// create new cart if not found or the cart is already checkout
	if err == gorm.ErrRecordNotFound || cart.IsCheckout {
		newCart, err := s.CreateCart(ctx, userIdUUID)
		if err != nil {
			return dto.AddCartItemResponse{}, err
		}
		cartId = newCart.ID
	}

	// insert cart item and link it with the cart
	var cartItem []entity.CartItem
	for _, item := range req {
		productUUID, err := uuid.Parse(item.ProductID)
		if err != nil {
			return dto.AddCartItemResponse{}, err
		}

		// check if the cart item already exist
		existCartItem, err := s.cartRepo.GetCartItemByCardIdProductId(ctx, cartId.String(), item.ProductID)
		if err != nil && err != gorm.ErrRecordNotFound {
			return dto.AddCartItemResponse{}, err
		}

		if err == gorm.ErrRecordNotFound {
			// Item not exist in cart, so add new item
			cartItem = append(cartItem, entity.CartItem{
				CartId:    cartId,
				Quantity:  item.Quantity,
				ProductId: productUUID,
			})
		} else {
			// Item already exist in cart, so only update the quantity
			existCartItem.Quantity += item.Quantity

			_, err = s.cartRepo.UpdateCartItem(ctx, existCartItem)
			if err != nil {
				return dto.AddCartItemResponse{}, err
			}
		}
	}

	// if new item only
	if len(cartItem) > 0 {
		_, err = s.cartRepo.AddCartItem(ctx, cartItem)
		if err != nil {
			return dto.AddCartItemResponse{}, err
		}
	}

	return dto.AddCartItemResponse{}, nil
}

/**
 * CreateCart is a function to create a cart with status isCheckout False
 */
func (s *cartService) CreateCart(ctx context.Context, userId uuid.UUID) (entity.Cart, error) {
	cart := entity.Cart{
		IsCheckout: false,
		UserId:     userId,
	}

	resCart, err := s.cartRepo.CreateCart(ctx, cart)
	if err != nil {
		return entity.Cart{}, err
	}

	return resCart, nil
}

func (s *cartService) GetMyCartItem(ctx context.Context, userId string) ([]dto.GetProductCartItemResponse, error) {
	cart, err := s.cartRepo.GetCardByUserId(ctx, userId)
	if err != nil {
		return []dto.GetProductCartItemResponse{}, err
	}

	cartItems, err := s.cartRepo.GetCartItemByCartId(ctx, cart.ID.String())
	if err != nil {
		return []dto.GetProductCartItemResponse{}, err
	}

	var allProductResp []dto.GetProductCartItemResponse
	for _, item := range cartItems {
		if item.Quantity == 0 {
			continue
		}

		allProductResp = append(allProductResp, dto.GetProductCartItemResponse{
			ID:            item.Product.ID.String(),
			Name:          item.Product.Name,
			Price:         item.Product.Price,
			Description:   item.Product.Description,
			StockQuantity: item.Product.StockQuantity,
			Category:      item.Product.Category,
			ImageUrl:      item.Product.ImageUrl,
			BuyQuantity:   item.Quantity,
		})
	}

	return allProductResp, nil
}

func (s *cartService) UpdateCartItem(ctx context.Context, req dto.UpdateCartItemRequest, userId string, cartItemId string) (dto.AddCartItemResponse, error) {
	if req.Quantity < 0 {
		return dto.AddCartItemResponse{}, dto.ErrQuantityBelowZero
	}

	cartItem, err := s.cartRepo.GetCartItemById(ctx, cartItemId)
	if err != nil {
		return dto.AddCartItemResponse{}, err
	}

	cartItem.Quantity = req.Quantity

	_, err = s.cartRepo.UpdateCartItem(ctx, cartItem)
	if err != nil {
		return dto.AddCartItemResponse{}, err
	}

	return dto.AddCartItemResponse{}, nil
}
