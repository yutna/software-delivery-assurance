# 04 — AI/ML Extension

**Parent:** `README.md`  
**Version:** v0.1.0  
**Applies to:** products with AI/ML features, including generative AI, classifiers, recommendations, prediction, extraction, summarization, and automation

---

## 1. Scope

Use this module when AI/ML is **material** to the product: it influences a user decision, produces content that users may act on, automates a workflow, or processes data to generate an output that would otherwise require human judgement.

AI features range from low-risk assistance to consequential automation. The depth of evidence must match the risk.

### AI risk classification

| Class | Characteristics | Minimum expectation |
|---|---|---|
| **A1 — Assistive** | Suggests, drafts, summarizes, or ranks; a qualified human reviews before action; errors are reversible | AI checklist; human review; disclosure |
| **A2 — Consequential** | Influences decisions about people, money, access, safety, health, employment, or legal rights; human approval is expected | A1 plus stronger evaluation, audit, human oversight, incident response |
| **A3 — Autonomous / high-impact** | Takes action without meaningful human review, or operates at scale in a high-impact domain | A2 plus independent review, formal risk acceptance, enhanced monitoring, kill switch |

If the class is unclear, choose the higher class.

---

## 2. Checklist

| ID | Requirement | Criticality | Evidence examples |
|---|---|---|---|
| **AI-01** | The AI use case, intended users, affected people, decision boundary, and level of automation are documented and approved. | H; G if A2/A3 | Use-case register; risk classification; approval record; decision-boundary diagram |
| **AI-02** | A model card describes purpose, model type, version, training/fine-tuning data provenance, intended use, limitations, and out-of-scope use. | H | Model card; version record; limitations section |
| **AI-03** | Data used for training, fine-tuning, evaluation, or retrieval has documented provenance, licence, and permitted use. | H | Data inventory; licence records; consent or contract; dataset card |
| **AI-04** | An evaluation dataset and evaluation plan exist; metrics are appropriate to the task and reported with sample size and limitations. | G if accuracy or quality is claimed | Evaluation plan; dataset card; results; confidence intervals; error analysis |
| **AI-05** | Results are compared with an agreed baseline, and acceptance thresholds are defined before release. | H | Baseline report; threshold definition; sign-off |
| **AI-06** | Confidence, uncertainty, or limitations are communicated to users in a way that supports appropriate reliance. | H | UI copy; calibration report; user testing |
| **AI-07** | Guardrails validate inputs and outputs, prevent unsafe or invalid actions, and provide a safe fallback. | G | Guardrail configuration; validation tests; fallback test; red-team results |
| **AI-08** | Human-in-the-loop review, override, and escalation are defined for consequential outputs. | G if A2/A3; H otherwise | Workflow design; UI evidence; reviewer training; override log |
| **AI-09** | AI inputs, outputs, model version, prompt version, and user actions are auditable with appropriate retention. | G | Audit-log schema; sample event; retention policy; access control |
| **AI-10** | Prompts, models, configurations, and evaluation datasets are versioned and reproducible. | H | Version registry; prompt repository; configuration baseline; reproduction record |
| **AI-11** | Production quality, drift, abuse, latency, and cost are monitored with defined thresholds and owners. | H | Dashboard; drift metrics; alert rules; review record |
| **AI-12** | An AI-specific incident-response plan covers wrong output, harmful output, data leakage, model compromise, and service failure. | G | AI IR plan; scenarios; tabletop record; contact tree |
| **AI-13** | Privacy controls cover data minimization, retention, region/residency, and the use of customer data for training. | G | Data-flow map; configuration; contract terms; retention evidence |
| **AI-14** | Security controls address prompt injection, data exfiltration, model supply chain, adversarial input, and unauthorized tool use. | G | Threat model; test results; model provenance; tool permissions |
| **AI-15** | Latency, throughput, GPU/CPU capacity, and cost are measured against expected usage. | H | Benchmark report; capacity model; cost dashboard |
| **AI-16** | A kill switch or disable path allows the AI feature to be turned off without taking down the whole product. | G | Feature-flag configuration; test record; operating procedure |
| **AI-17** | Users are told when they are interacting with AI and what level of human review applies. | H | UI copy; help documentation; user testing |
| **AI-18** | Applicable AI regulation, ethics review, and impact assessment are completed for the target market and use case. | H | Legal/ethics review; impact assessment; approval record |

---

## 3. Benchmark and evaluation safety

AI quality claims require measurement. Measurement must not harm production users or customer operations.

### Mandatory rules

1. **Do not benchmark production without written approval** from the system owner and operations.
2. Prefer a **staging, isolated, or local environment** that mirrors the production model and configuration.
3. Use **synthetic or approved test data**. Do not use real personal or sensitive data unless explicitly authorized and controlled.
4. Run **sequentially** by default. Any concurrency above 1 requires separate approval and capacity evidence.
5. Define **stop conditions** before starting: error rate, latency, queue depth, GPU exhaustion, memory pressure, or any customer-impact signal.
6. The benchmark must be **read-only** with respect to business data. No database writes, no workflow side effects, no external actions.
7. Record the **model, version, prompt, parameters, hardware, environment, dataset, and date**.
8. Capture raw results and the evaluation script or procedure so the result is reproducible.
9. Have a **named operator** monitor the run and a **kill switch** available.
10. Separate the benchmark request from the assessment. Include endpoint, model, number of cases, concurrency, time window, owner, data handling, and stop conditions.

### What a benchmark report must contain

- purpose and scope;
- model and version;
- environment and hardware;
- dataset source, size, and representativeness;
- task definition and expected output;
- metrics and calculation method;
- sample size and confidence interval where applicable;
- error analysis, including false positives and false negatives;
- limitations and known failure modes;
- raw results location;
- operator, reviewer, and date.

---

## 4. Minimum evidence for AI claims

| Claim | Minimum evidence |
|---|---|
| “Accurate” | Evaluation dataset, sample size, metric definition, result, confidence interval, model version, date, and limitations |
| “Better than baseline” | Baseline definition, same dataset, same metric, comparison result, statistical or practical significance |
| “Works in Thai” | Thai evaluation set, language-specific error analysis, representative user scenarios |
| “Human-level” | Independent human baseline, same task and dataset, blinded comparison |
| “No data leaves the environment” | Data-flow diagram, network egress evidence, configuration, and contract terms |
| “Bias tested” | Test design, protected attributes or proxies, results, and mitigation plan |
| “Safe” | Specific guardrails, red-team results, fallback behaviour, incident plan, and residual-risk statement |

Avoid broad adjectives. State the measured result, the conditions, and the limitation.

---

## 5. What not to claim without evidence

Do not claim:

- “100% accurate” or “never hallucinates”;
- “fully compliant” with a law or certification without a formal opinion or certificate;
- “trained on customer data” unless the data provenance and permission are documented;
- “production-proven” without usage evidence and operational history;
- “bias-free” or “fair” without a defined fairness test and results;
- “safe for clinical, financial, legal, or safety-critical use” without domain-specific validation and approval.

Use precise language:

> “On the evaluation set dated 2026-10-01, the model achieved X% top-1 accuracy under condition Y. Performance on Z is not yet measured.”

That is more credible than a broad claim, and it is easier to defend.
