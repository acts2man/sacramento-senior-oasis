import { Link } from 'react-router-dom';
import GuideArticle from '../components/GuideArticle';
import type { FaqEntry } from '../lib/schema';

const PUBLISHED = '2026-05-22';
const MODIFIED = '2026-05-22';

const faqEntries: FaqEntry[] = [
  {
    question: 'Does Medi-Cal pay for assisted living in California?',
    answer:
      "Not directly, in most cases. Medi-Cal does not pay for the room and board portion of assisted living. California's Assisted Living Waiver (ALW) is a separate Medi-Cal program that can cover care services in participating assisted living communities for eligible residents, but participation is limited and rules change. Verify current eligibility and availability with DHCS or a benefits counselor.",
  },
  {
    question: 'What is the Assisted Living Waiver (ALW)?',
    answer:
      "The Assisted Living Waiver is a California Medi-Cal program administered by the Department of Health Care Services (DHCS). It provides care services in participating Residential Care Facilities for the Elderly (RCFEs) and Publicly Subsidized Housing for residents who would otherwise need a nursing home level of care. The resident is still responsible for room and board out of pocket (often funded by SSI or other income).",
  },
  {
    question: 'Will Medicare pay for assisted living?',
    answer:
      "No. Medicare does not cover assisted living or memory care room and board, and it does not cover the day-to-day custodial care provided in those settings. Medicare can cover short-term skilled nursing or rehab after a qualifying hospital stay, and some home health services — but not ongoing assisted living. This is a frequent and costly misunderstanding.",
  },
  {
    question: 'What other ways can families pay for assisted living?',
    answer:
      "Most families combine sources: personal savings and Social Security, long-term care insurance, proceeds from selling a home, family contributions, the VA's Aid and Attendance benefit for eligible veterans and surviving spouses, and life insurance conversions. For Medi-Cal-eligible Californians, the Assisted Living Waiver can help in participating communities.",
  },
  {
    question: 'Are board and care homes covered by Medi-Cal?',
    answer:
      "Generally not. The Assisted Living Waiver focuses on larger participating RCFEs and certain Publicly Subsidized Housing settings; small 6-bed board and care homes are typically not part of the program. Some board and care homes accept SSI-only residents privately, but availability varies. Ask any specific home directly what payment sources they accept.",
  },
];

const MediCalAndAssistedLivingGuide = () => (
  <GuideArticle
    slug="medi-cal-and-assisted-living"
    section="resources"
    title="Does Medi-Cal Pay for Assisted Living? (2026 Guide)"
    metaDescription="Medi-Cal generally won't pay assisted living room and board, but California's Assisted Living Waiver can cover care services. Here's how the ALW actually works."
    h1="Does Medi-Cal Pay for Assisted Living in California?"
    datePublished={PUBLISHED}
    dateModified={MODIFIED}
    faqEntries={faqEntries}
    primaryCta={{
      label: 'Talk to a Sacramento advisor',
      to: '/contact',
    }}
    intro={
      <>
        <p>
          <strong>Mostly, no — but with one important exception.</strong> Medi-Cal does
          not pay for the room and board portion of assisted living in California. It is
          not designed to. But a separate Medi-Cal program called the{' '}
          <strong>Assisted Living Waiver (ALW)</strong> can pay for care services in
          participating assisted living communities for eligible residents who would
          otherwise need nursing-home-level care.
        </p>
        <p>
          The ALW is real, it works, and it has helped many Californians stay out of a
          nursing home. It is also limited, oversubscribed in many counties, and not
          accepted at every community. This page explains what's actually possible — and
          how to verify it for your situation.
        </p>
      </>
    }
  >
    <h2 id="quick-answer">The short answer</h2>
    <div className="guide-callout">
      <p>
        <strong>Medi-Cal does not pay for assisted living room and board.</strong> The
        Assisted Living Waiver (ALW) — a specific Medi-Cal program run by the California
        Department of Health Care Services — can pay for the <em>care services</em>{' '}
        portion in participating communities for eligible residents. The resident still
        has to fund room and board, usually out of SSI or other income. Eligibility,
        capacity, and county participation all change over time, so verify your
        situation with{' '}
        <a
          href="https://www.dhcs.ca.gov/services/ltc/Pages/AssistedLivingWaiver.aspx"
          target="_blank"
          rel="noopener noreferrer"
        >
          DHCS
        </a>{' '}
        directly.
      </p>
    </div>

    <h2 id="what-medi-cal-doesnt-do">What Medi-Cal does not cover</h2>
    <p>
      Regular Medi-Cal does <strong>not</strong> pay for:
    </p>
    <ul>
      <li>The room and board cost of a Residential Care Facility for the Elderly (RCFE)</li>
      <li>The base monthly rate at an assisted living or memory care community</li>
      <li>Care fees at a community that does not participate in the ALW program</li>
      <li>Most board and care (small 6-bed RCFE) settings</li>
    </ul>
    <p>
      This is the part that surprises families. Medi-Cal will pay for a nursing home
      stay if a resident qualifies medically and financially, but assisted living and
      memory care are a different category — non-medical residential care — and the
      basic Medi-Cal program isn't built for it. The ALW exists specifically to bridge
      that gap for a defined slice of eligible residents.
    </p>

    <h2 id="what-is-alw">What is the Assisted Living Waiver?</h2>
    <p>
      The <strong>Assisted Living Waiver (ALW)</strong> is a Home and Community-Based
      Services (HCBS) waiver under Medi-Cal, administered by the{' '}
      <a
        href="https://www.dhcs.ca.gov/services/ltc/Pages/AssistedLivingWaiver.aspx"
        target="_blank"
        rel="noopener noreferrer"
      >
        California Department of Health Care Services
      </a>{' '}
      (DHCS). It is designed to let people who would otherwise need nursing home care
      live in a less institutional setting — typically a participating RCFE — and have
      Medi-Cal pay for the care portion of that stay.
    </p>
    <p>
      What the ALW does and doesn't pay for:
    </p>
    <ul>
      <li>
        <strong>Covers (for eligible residents in participating settings):</strong> care
        coordination, personal care assistance, nursing services, medication oversight,
        and other waiver services delivered in the community.
      </li>
      <li>
        <strong>Does not cover:</strong> room and board. The resident pays that
        themselves — most often from Supplemental Security Income (SSI) or other
        income. The state sets a specific room and board contribution amount; check
        DHCS for the current figure.
      </li>
    </ul>

    <h2 id="who-is-eligible">Who is eligible</h2>
    <p>
      To qualify for the ALW, a person generally needs to:
    </p>
    <ul>
      <li>
        Be enrolled in <strong>full-scope Medi-Cal</strong> (not a limited or
        share-of-cost plan)
      </li>
      <li>Be at least 21 years old</li>
      <li>
        Have care needs at a <strong>nursing facility level of care</strong> — meaning
        without the ALW services they would need nursing home placement
      </li>
      <li>
        Live in (or be ready to move to) a participating ALW facility located in a
        participating county
      </li>
      <li>Be willing to live in the community setting and have it meet their needs safely</li>
    </ul>
    <p>
      The official eligibility criteria, financial limits, and application process are
      maintained by DHCS. Rules change, so do not rely on any third-party summary
      (including this one) for final answers — confirm with DHCS or a benefits
      counselor before making decisions.
    </p>
    {/* TODO[verify]: confirm the exact list of ALW-participating counties as of the
        current year directly with DHCS before publishing county-specific claims. */}

    <h2 id="how-to-apply">How families apply</h2>
    <ol>
      <li>
        <strong>Confirm full-scope Medi-Cal eligibility.</strong> If your loved one
        isn't already on Medi-Cal, that's the first step. The local county Medi-Cal
        office handles enrollment.
      </li>
      <li>
        <strong>Contact a Care Coordination Agency (CCA).</strong> DHCS contracts with
        regional CCAs that handle ALW assessments, enrollments, and ongoing case
        management. DHCS publishes the current CCA list.
      </li>
      <li>
        <strong>Find a participating community with an open ALW slot.</strong> Not every
        assisted living community accepts ALW residents, and capacity is limited even at
        participating communities. Waitlists are common.
      </li>
      <li>
        <strong>Complete the assessment and enrollment.</strong> The CCA confirms
        medical and financial eligibility, sets up the care plan, and coordinates the
        move.
      </li>
    </ol>
    <p>
      This isn't a one-week process. Families often work on the ALW path in parallel
      with self-pay options so a parent isn't stuck waiting in an unsafe situation.
    </p>

    <h2 id="other-options">If Medi-Cal isn't a fit, what else?</h2>
    <p>
      Most families end up combining several funding sources. The realistic mix:
    </p>
    <ul>
      <li>
        <strong>Personal income and savings.</strong> Social Security, pensions, and
        retirement accounts.
      </li>
      <li>
        <strong>Long-term care insurance.</strong> If your loved one bought a policy
        years ago, read it carefully — many cover assisted living but with elimination
        periods, daily caps, and ADL triggers that need documenting.
      </li>
      <li>
        <strong>Proceeds from selling a home.</strong> Often the largest single source.
        Reverse mortgages and bridge loans are sometimes used while a home is on the
        market.
      </li>
      <li>
        <strong>VA Aid and Attendance.</strong> A monthly benefit for eligible wartime
        veterans and surviving spouses who need help with daily activities. See the{' '}
        <a
          href="https://www.va.gov/pension/aid-attendance-housebound/"
          target="_blank"
          rel="noopener noreferrer"
        >
          VA's Aid &amp; Attendance page
        </a>{' '}
        for details.
      </li>
      <li>
        <strong>Family contribution.</strong> Adult children pooling resources is more
        common than people admit.
      </li>
      <li>
        <strong>Life insurance conversions.</strong> Some whole-life policies can be
        converted into a long-term care benefit (a &quot;life settlement&quot; or
        &quot;long-term care benefit plan&quot;).
      </li>
    </ul>

    <h2 id="sacramento">How this applies in Sacramento</h2>
    <p>
      The Sacramento metro spans several counties — Sacramento, Placer, Yolo, El Dorado —
      and ALW availability historically varies by county and by community. Even within a
      county that participates, only certain RCFEs accept ALW residents and slots open
      and close as residents come and go.
    </p>
    <p>
      A few practical notes for Sacramento-area families:
    </p>
    <ul>
      <li>
        Larger assisted living communities are more likely than small board and care
        homes to be ALW-participating, because the program is structured around them.
        For most ALW seekers, the starting point is the larger-community side of the
        market — see{' '}
        <Link to="/assisted-living/sacramento">assisted living in Sacramento</Link>,{' '}
        <Link to="/assisted-living/elk-grove">Elk Grove</Link>,{' '}
        <Link to="/assisted-living/roseville">Roseville</Link>, and{' '}
        <Link to="/assisted-living/folsom">Folsom</Link>.
      </li>
      <li>
        If memory care is part of the picture, the same waiver mechanics apply, but
        memory care neighborhoods in participating communities are often the tightest
        on availability. See{' '}
        <Link to="/guides/assisted-living-vs-memory-care">
          assisted living vs. memory care
        </Link>{' '}
        for the underlying difference.
      </li>
      <li>
        For families that aren't Medi-Cal eligible but are still cost-constrained,
        small board and care homes can sometimes deliver a better all-in monthly cost
        than a larger community for higher-acuity residents — see{' '}
        <Link to="/guides/board-and-care-vs-assisted-living">
          board and care vs. assisted living
        </Link>.
      </li>
    </ul>
    <p>
      A Sacramento-based advisor can help you sort which communities are currently
      ALW-participating and have openings — that picture changes month to month.{' '}
      <Link to="/contact">Request a callback</Link>; the service is free for families.
    </p>

    <h2 id="sources">Authoritative sources</h2>
    <ul>
      <li>
        <a
          href="https://www.dhcs.ca.gov/services/ltc/Pages/AssistedLivingWaiver.aspx"
          target="_blank"
          rel="noopener noreferrer"
        >
          California DHCS — Assisted Living Waiver program
        </a>{' '}
        (eligibility, application, current participating counties)
      </li>
      <li>
        <a
          href="https://www.dhcs.ca.gov/services/medi-cal"
          target="_blank"
          rel="noopener noreferrer"
        >
          California DHCS — Medi-Cal
        </a>
      </li>
      <li>
        <a
          href="https://www.medicare.gov/coverage/long-term-care"
          target="_blank"
          rel="noopener noreferrer"
        >
          Medicare.gov — Long-term care coverage
        </a>
      </li>
      <li>
        <a
          href="https://www.va.gov/pension/aid-attendance-housebound/"
          target="_blank"
          rel="noopener noreferrer"
        >
          VA — Aid &amp; Attendance and Housebound benefits
        </a>
      </li>
      <li>
        <a
          href="https://canhr.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          California Advocates for Nursing Home Reform (CANHR)
        </a>
      </li>
    </ul>
  </GuideArticle>
);

export default MediCalAndAssistedLivingGuide;
