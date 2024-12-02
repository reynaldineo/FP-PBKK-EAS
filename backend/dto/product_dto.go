package dto

const (
	// Failed
	MESSAFE_FAILED_ADD_PRODUCT        = "failed to add product"
	MESSAGE_FAILED_GET_ALL_PRODUCT    = "failed to get all product"
	MESSAGE_FAILED_GET_DETAIL_PRODUCT = "failed to get detail product"
	MESSAGE_FAILED_UPDATE_PRODUCT     = "failed to update product"
	MESSAGE_FAILED_DELETE_PRODUCT     = "failed to delete product"

	// Success
	MESSAGE_SUCCESS_ADD_PRODUCT        = "success to add product"
	MESSAGE_SUCCESS_GET_ALL_PRODUCT    = "success to get all product"
	MESSAGE_SUCCESS_GET_DETAIL_PRODUCT = "success to get detail product"
	MESSAGE_SUCCESS_UPDATE_PRODUCT     = "success to update product"
	MESSAGE_SUCCESS_DELETE_PRODUCT     = "success to delete product"
)

type (
	ProductRequest struct {
		Name          string `json:"name" binding:"required"`
		Description   string `json:"description" binding:"required"`
		Price         int    `json:"price" binding:"required"`
		StockQuantity int    `json:"stock_quantity" binding:"required"`
		Category      string `json:"category" binding:"required"`
		ImageUrl      string `json:"image_url" binding:"required"`
	}

	ProductResponse struct {
		ID            string `json:"id"`
		Name          string `json:"name"`
		Description   string `json:"description"`
		Price         int    `json:"price"`
		StockQuantity int    `json:"stock_quantity"`
		Category      string `json:"category"`
		ImageUrl      string `json:"image_url"`
	}
)
