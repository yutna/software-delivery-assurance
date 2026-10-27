# 08 — On-Premises Extension

**Parent:** `README.md`  
**Version:** v0.1.0  
**Applies to:** software installed and operated on customer-controlled infrastructure, including data centres, private clouds, branch sites, and air-gapped environments

---

## 1. Scope

On-premises delivery shifts part of the operational burden to the customer or a shared support model. The product must be installable, upgradeable, recoverable, and supportable in an environment the vendor does not fully control.

### Deployment models

| Model | Description | Typical responsibility |
|---|---|---|
| **Customer-managed** | Customer installs, operates, patches, and backs up the product | Customer operations; vendor provides packages, documentation, and support |
| **Vendor-managed** | Vendor operates the product on customer infrastructure under a support agreement | Shared; access, security, and change controls must be explicit |
| **Hybrid** | Some components on-premises, some in a vendor cloud | Shared-responsibility matrix and network design are essential |
| **Air-gapped** | No internet connectivity; updates and support are offline | Offline package verification, update process, and support logistics |

---

## 2. Checklist

| ID | Requirement | Criticality | Evidence examples |
|---|---|---|---|
| **ONP-01** | Hardware, operating system, database, network, and storage requirements are documented and sized for the expected workload. | H | Sizing guide; reference architecture; capacity calculation |
| **ONP-02** | Installation, upgrade, rollback, and uninstall procedures are documented and tested on a clean environment. | G | Installation guide; test record; rollback evidence |
| **ONP-03** | Required network ports, firewall rules, DNS, certificates, and outbound access are documented and minimized. | G | Network requirements; firewall matrix; connectivity test |
| **ONP-04** | Offline or air-gapped operation is supported where required, including package verification and update procedures. | H if air-gapped | Offline bundle; checksum verification; update runbook |
| **ONP-05** | Backup, restore, and disaster recovery are documented and tested for the customer-managed components. | G | Backup guide; restore test; DR runbook |
| **ONP-06** | Remote support access is controlled, time-bound, auditable, and approved by the customer. | G if remote access | Access procedure; approval record; session log; revocation evidence |
| **ONP-07** | Certificates, keys, and service credentials are managed with documented ownership and rotation. | G | Certificate inventory; rotation procedure; ownership matrix |
| **ONP-08** | Customer handover includes installation validation, administrator training, support contacts, and acceptance criteria. | H | Handover checklist; training record; acceptance sign-off |
| **ONP-09** | Security patches and product updates have a delivery, verification, and rollback process suitable for the customer environment. | G | Patch policy; package verification; rollback test; advisory process |

---

## 3. Installation and upgrade quality

An on-premises release is not ready until it has been tested on a **clean environment** that matches the supported baseline. Test at least:

- fresh installation;
- upgrade from the previous supported version;
- rollback after a failed upgrade;
- restore from backup;
- certificate renewal;
- service restart and host reboot;
- low-disk, low-memory, and dependency-failure conditions;
- operation with the documented network restrictions.

Document the supported versions and the upgrade path. “Upgrade from any version” is not a support statement unless it has been tested.

---

## 4. Air-gapped and restricted environments

For environments without internet access, provide:

- an offline installation bundle;
- checksums and signature verification;
- a documented dependency manifest;
- an offline update process;
- a way to export logs and diagnostics without exposing sensitive data;
- a support process that does not require inbound internet access;
- a plan for certificate and licence renewal.

Do not assume the customer can download packages, call a cloud API, or open a remote-support tunnel.

---

## 5. Remote support

Remote support is a high-trust activity. It should be:

- requested and approved per session or per time window;
- limited to the minimum access required;
- logged with who, when, what, and why;
- supervised or observable by the customer where required;
- automatically expired;
- revocable immediately;
- covered by a security addendum.

A standing administrator account with permanent remote access is a Gate failure for T2/T3 products.

---

## 6. Handover evidence

A handover package should include:

- reference architecture and sizing;
- installation and upgrade guide;
- configuration baseline;
- backup and restore procedure;
- monitoring and alerting setup;
- certificate and secret ownership;
- support model and escalation path;
- known limitations and open risks;
- acceptance test results;
- training record and attendance;
- customer sign-off.

The handover is complete only when the customer can operate the documented baseline without undocumented vendor intervention.
