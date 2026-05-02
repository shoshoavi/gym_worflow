"""Single-tenant gym profile for MVP. Replace with a `gyms` table when going multi-tenant."""

from typing import TypedDict


class GymProfile(TypedDict):
    name: str
    hours: str
    pricing_blurb: str
    address: str
    phone: str


GYM_PROFILE: GymProfile = {
    "name": "clever fit Berlin Mitte",
    "hours": "Mo–Fr 06:00–23:00, Sa–So 08:00–22:00",
    "pricing_blurb": "Mitgliedschaft ab 19,90 €/Monat. Im Aktionsmonat keine Aufnahmegebühr.",
    "address": "Friedrichstr. 100, 10117 Berlin",
    "phone": "+49 30 1234567",
}
