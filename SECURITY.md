# Security Policy & Runbook — newmrnd

## Supported Versions

| Version | Supported |
| :--- | :--- |
| `main` (latest) | :white_check_mark: Active |
| `< 1.0` | :x: Not supported |

---

## Reporting a Vulnerability

**Please do NOT open public GitHub issues for security vulnerabilities.**

Instead, please report security concerns via:
1. **GitHub Private Vulnerability Reporting**: Navigate to the **Security** tab → **Report a vulnerability**.
2. **Email**: `security@newmrnd.dev`

### What to include in your report:
- Affected component, API endpoint, or file path
- Step-by-step reproduction steps (PoC, HTTP requests/responses, screenshots)
- Potential security impact assessment (CVSS rating)
- Suggested remediation or patch (optional)

---

## Response SLA & Incident Timeline

| Milestone | Target Response |
| :--- | :--- |
| **Acknowledgement of receipt** | $\le$ 48 hours |
| **Triage & severity rating (CVSS)** | $\le$ 5 business days |
| **Fix or mitigation for HIGH / CRITICAL** | $\le$ 30 days |
| **Fix or mitigation for MEDIUM / LOW** | $\le$ 90 days |
| **Coordinated public disclosure** | After patch release + 14-day grace period |

---

## Severity Ratings (CVSS v3.1)

| Severity | CVSS Score | Example Vulnerability Classes |
| :--- | :--- | :--- |
| **Critical** | `9.0 – 10.0` | Remote Code Execution (RCE), Authentication Bypass, SSRF leaking cloud credentials |
| **High** | `7.0 – 8.9` | SQL/NoSQL Injection, Insecure Direct Object References (IDOR) on private data |
| **Medium** | `4.0 – 6.9` | Stored XSS, CSRF resulting in state changes, Excessive data exposure |
| **Low** | `0.1 – 3.9` | Information disclosure, missing hardening headers |

---

## Scope

### In Scope:
- `newmrnd` production deployment at `https://newmrnd.dev`
- Source code in `brahimaann/newmrnd` (`main` branch)
- First-party API endpoints under `/api/*`

### Out of Scope:
- Third-party SaaS providers (Vercel, Sanity, Resend) — report directly to vendors
- Volumetric Denial-of-Service (DoS / DDoS) attacks
- Findings from purely automated scanners without demonstrable proof-of-concept
- Missing security headers on non-sensitive assets already addressed in repository baseline

---

## Disclosure Policy

- We follow **Coordinated Vulnerability Disclosure (CVD)**.
- We will not pursue legal action against researchers acting in good faith.
- Please do not compromise user data, disrupt system availability, or perform destructive testing.

---

## Security Controls Implemented

- **`src/middleware.ts`**: Strict Content Security Policy (CSP), HSTS preload, COOP/CORP isolation, anti-sniffing, framing restrictions.
- **`next.config.ts`**: Production HTTP response headers, disabled `x-powered-by`, strict React rendering, immutable static caching.
- **`.github/workflows/devsecops.yml`**: Automated CodeQL SAST, Semgrep rules, Gitleaks secret detection, Trivy vulnerability scanning, and license compliance review.
- **`.github/dependabot.yml`**: Automated weekly dependency vulnerability alerts and updates.
- **`public/.well-known/security.txt`**: RFC 9116 security contact declaration.

---

## Acknowledgments

We thank the following researchers who have responsibly disclosed vulnerabilities to us:
- *Be the first to be listed here!*
