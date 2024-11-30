package repository

import (
	"context"

	"github.com/reynaldineo/FP-PBKK-Golang/entity"
	"gorm.io/gorm"
)

type (
	ProductRepository interface {
		AddProduct(ctx context.Context, product entity.Product) (entity.Product, error)
		GetAllProduct(ctx context.Context) ([]entity.Product, error)
		GetProductByID(ctx context.Context, id string) (entity.Product, error)
		UpdateProduct(ctx context.Context, id string, product entity.Product) (entity.Product, error)
		DeleteProduct(ctx context.Context, id string) error
	}

	productRepository struct {
		db *gorm.DB
	}
)

func NewProductRepository(db *gorm.DB) ProductRepository {
	return &productRepository{
		db: db,
	}
}

func (r *productRepository) AddProduct(ctx context.Context, product entity.Product) (entity.Product, error) {
	err := r.db.WithContext(ctx).Create(&product).Error
	if err != nil {
		return entity.Product{}, err
	}

	return product, nil
}

func (r *productRepository) GetAllProduct(ctx context.Context) ([]entity.Product, error) {
	var products []entity.Product
	err := r.db.WithContext(ctx).Find(&products).Error
	if err != nil {
		return nil, err
	}

	return products, nil
}

func (r *productRepository) GetProductByID(ctx context.Context, id string) (entity.Product, error) {
	var product entity.Product
	err := r.db.WithContext(ctx).Where("id = ?", id).Take(&product).Error
	if err != nil {
		return entity.Product{}, err
	}

	return product, nil
}

func (r *productRepository) UpdateProduct(ctx context.Context, id string, product entity.Product) (entity.Product, error) {
	err := r.db.WithContext(ctx).Model(&entity.Product{}).Where("id = ?", id).Updates(&product).Error
	if err != nil {
		return entity.Product{}, err
	}

	return product, nil
}

func (r *productRepository) DeleteProduct(ctx context.Context, id string) error {
	result := r.db.WithContext(ctx).Where("id = ?", id).Delete(&entity.Product{})
	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}

	return nil
}
