from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "gym-whatsapp-api"
    debug: bool = False

    database_url: str = "postgresql://gym:gym@localhost:5432/gymbot"

    cors_origins: str = "http://localhost:3000"

    # Optional: verify CRM webhook HMAC (shared secret per env; production: per gym)
    crm_webhook_secret: str | None = None

    # Twilio (optional for MVP)
    twilio_account_sid: str | None = None
    twilio_auth_token: str | None = None
    twilio_whatsapp_from: str | None = None

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()
