package migration

import "gorm.io/gorm"

type Enum struct {
	Name   string
	Values []string
}

func EnumMigration(db *gorm.DB) error {
	enums := []Enum{
		{"role_enum", []string{"admin", "user"}},
		{"status_order_enum", []string{"pending", "paid", "sent", "done"}},
	}

	for _, enum := range enums {
		command := `
        DO $$ 
        BEGIN	
            -- Check if the enum type already exists
            IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = '` + enum.Name + `') THEN
                CREATE TYPE ` + enum.Name + ` AS ENUM (` + formatEnumValues(enum.Values) + `);
            END IF;
        END $$;`

		if err := db.Exec(command).Error; err != nil {
			return err
		}
	}

	return nil
}

func formatEnumValues(values []string) string {
	result := ""
	for _, value := range values {
		if result != "" {
			result += ", "
		}
		result += "'" + value + "'"
	}
	return result
}
