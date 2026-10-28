# MAP-ASVS — SRAS Core and Integration to OWASP ASVS 5.0

- Version: `0.1.0`
- Source standard: OWASP Application Security Verification Standard 5.0
- Source URL: [https://owasp.org/www-project-application-security-verification-standard/](https://owasp.org/www-project-application-security-verification-standard/)
- Status: `draft`
- Deprecated in: not deprecated
- Replaced by: none
- Review status: `unverified`
- Translation status: `partial`
- Source: `mappings/owasp-asvs.yaml`

## Description

Informative crosswalk from SRAS Core and integration requirements to OWASP Application Security Verification Standard 5.0 chapters and sections. It is not an equivalence or certification claim.

**Thai:** crosswalk เชิงข้อมูลจากข้อกำหนด SRAS Core และ integration ไปยังบทและหมวดของ OWASP Application Security Verification Standard 5.0 ไม่ใช่การอ้างความเท่าเทียมหรือการรับรอง

This crosswalk is informative. It is not an equivalence, a certification, or a compliance claim.

## Mappings

- `SRAS-INT-001` — `v5.0.0-4.1` (related) — Generic web service security is related; an API inventory is not an ASVS requirement.
- `SRAS-INT-002` — `v5.0.0-6.3` (supports) — General authentication security.
- `SRAS-INT-003` — `v5.0.0-8.3` (supports) — Operation-level authorization.
- `SRAS-INT-004` — `v5.0.0-4.1` (partial) — Generic web service security includes anti-automation controls; rate limits are an SRAS addition.
- `SRAS-INT-005` — `v5.0.0-2.2` (related) — Business logic security is related; idempotency is an API design concern.
- `SRAS-INT-006` — `v5.0.0-4.2` (partial) — HTTP message structure validation is covered; contract versioning is an SRAS addition.
- `SRAS-INT-007` — `v5.0.0-16.5` (supports) — Error handling.
- `SRAS-INT-008` — `v5.0.0-16.2` (supports) — General logging.
- `SRAS-INT-009` — `v5.0.0-4.1` (related) — Generic web service security is related; partner onboarding is not an ASVS requirement.
- `SRAS-INT-010` — `v5.0.0-4.2` (related) — HTTP message structure validation is related; deprecation practice is an SRAS addition.
- `SRAS-SEC-001` — `v5.0.0-6.3` (supports) — General authentication security.
- `SRAS-SEC-002` — `v5.0.0-8.3` (supports) — Operation-level authorization.
- `SRAS-SEC-003` — `v5.0.0-13.3` (supports) — Secret management.
- `SRAS-SEC-004` — `v5.0.0-11.3, v5.0.0-12.2` (supports) — Encryption algorithms and HTTPS communication.
- `SRAS-SEC-005` — `v5.0.0-6.3` (supports) — Multi-factor authentication requirements.
- `SRAS-SEC-006` — `v5.0.0-8.2` (supports) — General authorization design.
- `SRAS-SEC-007` — `v5.0.0-15.1, v5.0.0-15.2` (supports) — Secure coding documentation, architecture, and dependencies.
- `SRAS-SEC-008` — `v5.0.0-15.3` (supports) — Defensive coding.
- `SRAS-SEC-009` — `v5.0.0-15.2` (supports) — Security architecture and dependency management.
- `SRAS-SEC-010` — `v5.0.0-16.2, v5.0.0-16.3` (supports) — General logging and security events.
- `SRAS-SEC-011` — `v5.0.0-13.2` (partial) — Backend communication configuration is covered; network segmentation is an infrastructure control outside ASVS.
- `SRAS-SEC-012` — `v5.0.0-15.3` (partial) — Defensive coding supports testing; independent security testing is an SRAS addition.

## Review

- Reviewed by: not recorded

## Translation

- Machine translated: yes
