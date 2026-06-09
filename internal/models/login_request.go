package models

// email is case sensitive it shouldnt be
// everyone is getting wallet id as 0, i.e singular wallet must be a relation ship issue

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}
