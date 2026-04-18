"""Inbound routing: member CS vs sales (LLM/RAG hooks later)."""

from app.models import Lead


def playbook_for_lead(lead: Lead | None) -> str:
    if lead is None:
        return "sales"
    if lead.member_status == "churned":
        return "sales"
    if lead.payment_status == "paid" and lead.member_status in ("active", "none", "paused"):
        return "member_cs"
    return "sales"


def draft_reply_stub(playbook: str, body: str) -> str:
    """Replace with OpenAI + RAG; stub for MVP."""
    if playbook == "member_cs":
        return (
            "Danke für deine Nachricht. Ein Teammitglied hilft dir gleich weiter. "
            f"(Stub — du schriebst: {body[:80]!r})"
        )
    return (
        "Hallo! Wenn du möchtest, buchen wir gern ein Probetraining. "
        f"(Stub — du schriebst: {body[:80]!r})"
    )
