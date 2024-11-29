package middleware

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/reynaldineo/FP-PBKK-Golang/constant"
	"github.com/reynaldineo/FP-PBKK-Golang/dto"
	"github.com/reynaldineo/FP-PBKK-Golang/utils"
)

func OnlyAllow(roles ...string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userRole := ctx.GetString(constant.CTX_KEY_ROLE_NAME)

		for _, role := range roles {
			if userRole == role {
				ctx.Next()
				return
			}
		}

		err := fmt.Sprintf(dto.ErrRoleNotAllowed.Error(), userRole)
		response := utils.BuildResponseFailed(dto.MESSAGE_FAILED_VERIFY_TOKEN, err, nil)
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, response)
		return
	}
}
