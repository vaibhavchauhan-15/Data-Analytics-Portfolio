# CONTENT.md — Portfolio Copy & Data

All text that appears on the site. Edit this file when updating content. Reference this in data files.

---

## 1. Personal Details

```
Name:       Vaibhav Chauhan
Email:      vaibhav1chauhan12353@gmail.com
Phone:      +91 9867732204
Location:   Delhi, India
LinkedIn:   https://linkedin.com/in/vaibhavchauhan-15
GitHub:     https://github.com/vaibhavchauhan-15
```

---

## 2. Hero Section

**Badge text:** `Open to Work · Delhi NCR / Remote`

**H1:**
```
Turning Raw Data
into Business Clarity.
```

**Subhead:**
```
Data Analyst · Python · Power BI · SQL
Building dashboards, pipelines, and decisions.
```

**CTA buttons:**
- Primary: `View My Work ↓`
- Secondary: `Download Resume`

**Scroll cue text:** (none — visual only)

---

## 3. About Section

**Eyebrow:** `// 02. ABOUT`

**H2:**
```
Data tells stories.
I write the narrative.
```

**Body paragraphs:**

P1:
```
B.Tech Computer Science (Data Science) graduate from Parul University, 2026.
I spent my internship at Coerror turning messy product data into Power BI dashboards
adopted across 3 teams — cutting report time by 40% and feeding production ML models.
```

P2:
```
I bridge raw datasets and the boardroom. Whether that's writing optimized MySQL queries,
building anomaly detection systems in Python, or telling a story through a dashboard —
I care about the outcome, not just the output.
```

P3:
```
Currently seeking Data Analyst / ML Engineer roles in Delhi NCR or remote.
If you're working on data problems that matter, let's talk.
```

**Chips:**
- `📍 Delhi, India`
- `🎓 Graduating 2026`
- `💼 Open to Work`
- `🏢 B.Tech · Data Science`

---

## 4. KPI Stats

| Prefix | Number | Suffix | Label | Sub-label |
|--------|--------|--------|-------|-----------|
| | 4 | | Power BI Dashboards | Shipped & adopted |
| ~ | 40 | % | Query Speed Improvement | MySQL optimization |
| | 30 | %+ | Data Quality Fix | Across 5+ datasets |
| | 3 | | Teams Impacted | Cross-functional |

---

## 5. Experience

### Coerror — Data Science Intern

**Period:** Jan 2026 – Apr 2026  
**Location:** Gurgaon, India  
**Type:** Internship

**Bullets (use exactly as written):**
1. Designed and delivered 4 Power BI dashboards tracking core product KPIs—adopted by 3 cross-functional teams, replacing weekly manual Excel reports and saving ~5 hrs/week of analyst time.
2. Wrote optimised MySQL queries for reporting workflows, cutting KPI dashboard refresh time by ~40% and enabling real-time business monitoring for the first time.
3. Resolved 30%+ missing-value rate across 5+ raw datasets via Python & Pandas data-cleaning pipelines—directly improving reliability of downstream ML model inputs.
4. Conducted deep-dive EDA across product and operations data, surfacing 3 actionable trends (seasonality, user drop-off, anomaly clusters) presented to senior leadership.
5. Automated weekly analytical reporting workflow, reducing ad-hoc data requests from stakeholders by standardising metrics definitions and delivery cadence.
6. Partnered with engineering to define data schemas and validate pipeline outputs, ensuring analytical accuracy for KPI tracking and business reviews.

**Tags:** `Power BI` · `MySQL` · `Python` · `Pandas` · `EDA` · `Reporting Automation`

---

## 6. Education

**University:** Parul University  
**Location:** Vadodara, Gujarat, India  
**Degree:** B.Tech in Computer Science & Engineering  
**Specialization:** Data Science  
**Period:** 2022 – 2026

---

## 7. Certifications

| Name | Issuer | Year |
|------|--------|------|
| Data Analytics and Visualization Job Simulation | Accenture | 2023 |
| Data Structures & Algorithms | CodeHelp | 2023 |
| Tableau Workshop | Parul University | 2025 |

---

## 8. Projects

### Featured: LogGuardian — Operational Anomaly Detection

**Category:** ML  
**Description:** Hybrid ML anomaly detection system (Isolation Forest + Autoencoder) on system logs with PostgreSQL backend and FastAPI endpoints.

**Outcomes:**
- Reduced false-positive alert rate by ~35%, improving signal quality for ops teams
- Built 5 REST APIs via FastAPI exposing anomaly scores and trend data
- Created auditable analytics layer in PostgreSQL with time-range filtering and trend aggregation

**Tech:** Python · Scikit-learn · TensorFlow/Keras · PostgreSQL · FastAPI · Pandas

---

### Featured: Sales & Operations Analytics Dashboard

**Category:** Power BI  
**Description:** End-to-end analytics pipeline from raw transactional data to multi-page interactive Power BI dashboard.

**Outcomes:**
- Designed DAX measures for revenue trends, MoM growth, product performance, customer segmentation
- Identified 22% revenue concentration in one product category via cohort analysis — informed pricing strategy
- Enabled self-serve analytics for non-technical stakeholders via clean dashboard UX

**Tech:** Power BI · DAX · MySQL · Python · Pandas · Excel

---

### Additional Projects (add to projects.ts)

| Title | Category | Short Description |
|-------|----------|-------------------|
| IndicLaw AI | ML / Python | Multilingual legal assistant; hackathon finalist |
| Chulbuli Jewels | Full-stack | Live e-commerce platform |
| TrackZen | Full-stack / SaaS | AI-powered study planner SaaS |

---

## 9. Case Studies

### Case Study 1: Cutting Dashboard Refresh Time 40%

**Problem:** KPI dashboard ran slow MySQL queries — took 3+ minutes per refresh, blocking business reviews.

**Approach:** Profiled slow queries with `EXPLAIN`. Replaced correlated subqueries with CTEs. Added composite indexes on join columns. Rewrote aggregation using window functions.

**Tools:** MySQL · EXPLAIN · CTEs · Window Functions

**Outcome:** Dashboard refresh dropped from 3+ min → under 2 min. ~40% improvement. Enabled real-time monitoring for the first time.

---

### Case Study 2: Rescuing 30%+ Missing Data

**Problem:** Raw product datasets had 30%+ missing values across 5+ tables — downstream ML models were unreliable.

**Approach:** Built Python/Pandas pipeline: profiled missing patterns (MCAR vs MAR), applied median imputation for numerical cols, mode for categorical, flagged high-null rows for manual review.

**Tools:** Python · Pandas · NumPy · Matplotlib

**Outcome:** Data quality improved to <5% missing values. ML model input reliability significantly increased.

---

### Case Study 3: Reducing ML False Positives 35%

**Problem:** Single-model anomaly detection (Isolation Forest only) produced too many false positive alerts — ops team was ignoring them.

**Approach:** Added Autoencoder as second-pass filter. Only flagged anomalies where both models agreed. Tuned thresholds on labeled historical data.

**Tools:** Python · Scikit-learn · TensorFlow/Keras · PostgreSQL

**Outcome:** False-positive rate dropped ~35%. Alert signal quality improved — ops team started acting on alerts again.

---

## 10. Tech Stack (Icon Wall)

Full list for TechStack section:

```
Python · MySQL · PostgreSQL · Power BI · Tableau · Excel
Pandas · NumPy · Matplotlib · Seaborn · Scikit-learn
FastAPI · Next.js · TypeScript · Tailwind CSS · Git · GitHub
C++ · Google Sheets · Jupyter · VS Code
```

---

## 11. Achievements

| Achievement | Context | Metric |
|-------------|---------|--------|
| Hackathon Finalist | IndicLaw AI — multilingual legal assistant | Top teams |
| Dashboard adoption | 3 cross-functional teams adopted Power BI dashboards | 4 dashboards |
| Query optimization | MySQL KPI refresh | ~40% faster |
| Data quality improvement | 5+ raw datasets cleaned | 30%+ missing → <5% |
| ML system shipped | LogGuardian anomaly detection | 35% false-positive reduction |

---

## 12. FAQ

**Q1: Are you open to relocation?**  
Currently based in Delhi. Open to remote roles or relocation for the right opportunity — especially within India (Bangalore, Hyderabad, Mumbai) or hybrid in Delhi NCR.

**Q2: What roles are you targeting?**  
Data Analyst, Business Analyst, BI Analyst, ML Engineer (junior), and Data Science roles. Open to both product and consulting contexts.

**Q3: Can I see your actual dashboards or code?**  
Yes — all project GitHub links are live. For Power BI dashboards, I have screenshots and a PDF walkthrough available on request.

**Q4: Are you available for freelance or contract work?**  
Yes, selectively. I'm open to short-term data analysis, dashboard builds (Power BI / Excel), or ML prototyping projects alongside full-time job search.

**Q5: What is your expected joining timeline?**  
Available immediately or within 2–4 weeks notice depending on the role.

---

## 13. Contact Section

**H2:** `Let's Build Something with Data`

**Sub-copy:**
```
Whether it's a job opportunity, freelance project, or just a conversation
about data — I'm reachable below.
```

**Form subject options:**
- `job` → "Job Opportunity"
- `freelance` → "Freelance / Contract"
- `collab` → "Collaboration"
- `other` → "Other"

**Success message:**
```
Message sent! I'll reply within 24 hours.
```

---

## 14. Footer

**Line 1:** `Built with Next.js, GSAP, and Three.js`  
**Line 2:** `© 2026 Vaibhav Chauhan — Data Analyst · Delhi, India`