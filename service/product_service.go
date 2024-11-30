package service

import (
	"context"

	"github.com/reynaldineo/FP-PBKK-Golang/dto"
	"github.com/reynaldineo/FP-PBKK-Golang/entity"
	"github.com/reynaldineo/FP-PBKK-Golang/repository"
)

type (
	ProductService interface {
		AddProduct(ctx context.Context, req dto.ProductRequest) (dto.ProductResponse, error)
		GetAllProduct(ctx context.Context) ([]dto.ProductResponse, error)
		GetProductByID(ctx context.Context, id string) (dto.ProductResponse, error)
		UpdateProduct(ctx context.Context, id string, req dto.ProductRequest) (dto.ProductResponse, error)
		DeleteProduct(ctx context.Context, id string) error
	}

	productService struct {
		productRepo repository.ProductRepository
	}
)

func NewProductService(productRepo repository.ProductRepository) ProductService {
	return &productService{
		productRepo: productRepo,
	}
}

func (s *productService) AddProduct(ctx context.Context, req dto.ProductRequest) (dto.ProductResponse, error) {
	product := entity.Product{
		Name:          req.Name,
		Description:   req.Description,
		Price:         req.Price,
		StockQuantity: req.StockQuantity,
		Category:      req.Category,
	}

	res, err := s.productRepo.AddProduct(ctx, product)
	if err != nil {
		return dto.ProductResponse{}, err
	}

	return dto.ProductResponse{
		ID:            res.ID.String(),
		Name:          res.Name,
		Description:   res.Description,
		Price:         res.Price,
		StockQuantity: res.StockQuantity,
		Category:      res.Category,
	}, nil
}

func (s *productService) GetAllProduct(ctx context.Context) ([]dto.ProductResponse, error) {
	products, err := s.productRepo.GetAllProduct(ctx)
	if err != nil {
		return nil, err
	}

	var res []dto.ProductResponse
	for _, product := range products {
		res = append(res, dto.ProductResponse{
			ID:            product.ID.String(),
			Name:          product.Name,
			Description:   product.Description,
			Price:         product.Price,
			StockQuantity: product.StockQuantity,
			Category:      product.Category,
		})
	}

	return res, nil
}

func (s *productService) GetProductByID(ctx context.Context, id string) (dto.ProductResponse, error) {
	product, err := s.productRepo.GetProductByID(ctx, id)
	if err != nil {
		return dto.ProductResponse{}, err
	}

	return dto.ProductResponse{
		ID:            product.ID.String(),
		Name:          product.Name,
		Description:   product.Description,
		Price:         product.Price,
		StockQuantity: product.StockQuantity,
		Category:      product.Category,
	}, nil
}

func (s *productService) UpdateProduct(ctx context.Context, id string, req dto.ProductRequest) (dto.ProductResponse, error) {
	product := entity.Product{
		Name:          req.Name,
		Description:   req.Description,
		Price:         req.Price,
		StockQuantity: req.StockQuantity,
		Category:      req.Category,
	}

	res, err := s.productRepo.UpdateProduct(ctx, id, product)
	if err != nil {
		return dto.ProductResponse{}, err
	}

	return dto.ProductResponse{
		ID:            res.ID.String(),
		Name:          res.Name,
		Description:   res.Description,
		Price:         res.Price,
		StockQuantity: res.StockQuantity,
		Category:      res.Category,
	}, nil
}

func (s *productService) DeleteProduct(ctx context.Context, id string) error {
	err := s.productRepo.DeleteProduct(ctx, id)
	if err != nil {
		return err
	}

	return nil
}
