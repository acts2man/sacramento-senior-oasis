import { Link } from 'react-router-dom';
import GuideArticle from '../components/GuideArticle';
import type { FaqEntry } from '../lib/schema';

const PUBLISHED = '2026-05-22';
const MODIFIED = '2026-05-22';

const faqEntries: FaqEntry[] = [
  {
    question: 'What does RCFE stand for?',
    answer:
      'RCFE stands for Residential Care Facility for the Elderly. It is California\'s licensing category for non-medical residential senior care, regulated by the Department of Social Services\' Community Care Licensing Division (CDSS/CCLD).',
  },
  {
    question: 'Is RCFE the same as assisted living?',
    answer:
      'In California, yes — what most people call assisted living or memory care is, on paper, an RCFE. The license category covers both large communities (50+ apartments) and small board and care homes (typically six residents in a private house). Skilled nursing facilities are licensed separately by the California Department of Public Health.',
  },
  {
    question: 'How do I verify a facility\'s RCFE license?',
    answer:
      "Use the CDSS Community Care Licensing facility search at cdss.ca.gov/inforesources/community-care-licensing. You can look up any California RCFE by name or license number and see its current license status, capacity, and inspection/citation history. Verifying the license is a basic step before touring or moving in.",
  },
  {
    question: 'What does an RCFE license actually cover?',
    answer:
      "An RCFE license authorizes the facility to provide non-medical care: help with daily living tasks, medication assistance, meals, housekeeping, and social activities. RCFEs do not provide skilled medical care — those services come from outside healthcare providers (a primary doctor, a home health agency, hospice) when needed.",
  },
  {
    question: 'What does it mean if an RCFE is "on probation"?',
    answer:
      "It means CDSS has placed conditions on the facility's license because of significant compliance issues. The facility can still operate, but is being monitored. Probation is a meaningful flag — read the public citation record before considering a community with that status, and ask the administrator directly what changed and what's been done to fix it.",
  },
];

const WhatIsAnRcfeGuide = () => (
  <GuideArticle
    slug="what-is-an-rcfe"
    section="guides"
    title="What Is an RCFE? California's Senior Care License Explained"
    metaDescription="An RCFE is a California-licensed senior care home. Learn what RCFE means, what the license covers, and how to verify any community's current license status."
    h1="What Is an RCFE? California's Senior Care License Explained"
    datePublished={PUBLISHED}
    dateModified={MODIFIED}
    faqEntries={faqEntries}
    primaryCta={{
      label: 'See license-verified communities',
      to: '/locations',
    }}
    intro={
      <>
        <p>
          <strong>RCFE stands for Residential Care Facility for the Elderly.</strong>{' '}
          It is California's licensing category for non-medical senior care homes — what
          most families call assisted living, memory care, or board and care. Every
          legitimate community of that type in California holds an RCFE license issued
          by the state.
        </p>
        <p>
          If you are choosing a community for a parent or relative, the RCFE license
          status is one of the most useful facts you can know about it. This guide
          explains what the license means, what it covers, and how to verify any
          community in California in a few minutes.
        </p>
      </>
    }
  >
    <h2 id="what-it-stands-for">What RCFE stands for</h2>
    <p>
      RCFE is the acronym for <strong>Residential Care Facility for the Elderly</strong>.
      It is the formal name used in California's Health and Safety Code for a
      non-medical residential setting that provides care and supervision to adults age 60
      and over (with limited exceptions for younger adults with similar care needs).
    </p>
    <p>
      The license is issued by the{' '}
      <a
        href="https://www.cdss.ca.gov/inforesources/community-care-licensing"
        target="_blank"
        rel="noopener noreferrer"
      >
        California Department of Social Services, Community Care Licensing Division
      </a>{' '}
      (CDSS/CCLD). CDSS sets the regulations, processes the license, conducts
      inspections, investigates complaints, and posts the facility's record publicly.
    </p>

    <h2 id="what-it-covers">What an RCFE license covers</h2>
    <p>
      An RCFE is authorized to provide <em>care and supervision</em> — non-medical
      assistance for older adults. In day-to-day terms that means:
    </p>
    <ul>
      <li>Help with bathing, dressing, grooming, and toileting</li>
      <li>Medication assistance (storage, reminders, and supervised self-administration)</li>
      <li>Meals and snacks, usually three meals a day plus snacks</li>
      <li>Housekeeping, laundry, and basic maintenance</li>
      <li>Activities, social engagement, and transportation to appointments</li>
      <li>24-hour staff presence and supervision</li>
    </ul>
    <p>
      RCFEs <strong>do not</strong> provide skilled medical care. They are not nursing
      homes. Wound care, IV therapy, ventilator care, and similar medical services come
      from outside providers — a visiting home-health agency, a hospice agency, or the
      resident's own doctor — when needed.
    </p>
    <p>
      Some RCFEs hold additional <strong>waivers or approvals</strong> from CDSS that let
      them care for residents with specific needs:
    </p>
    <ul>
      <li>
        <strong>Dementia Care Waiver</strong> — authorizes the facility to accept and
        retain residents with cognitive impairment. Almost every California memory care
        community operates under this waiver.
      </li>
      <li>
        <strong>Hospice Waiver</strong> — authorizes the facility to retain a resident
        who has elected hospice care, so they can remain at the community at end of life
        rather than transfer to a nursing facility.
      </li>
      <li>
        <strong>Restricted health condition</strong> approvals — for residents needing
        certain non-skilled procedures that would otherwise be outside RCFE scope.
      </li>
    </ul>

    <h2 id="sizes">RCFEs come in two very different sizes</h2>
    <p>
      The license category covers buildings that look almost nothing like each other:
    </p>
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Typical size</th>
          <th>What it feels like</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Board and care home (small RCFE)</td>
          <td>6 residents (most common); some up to 10</td>
          <td>A converted single-family house in a residential neighborhood</td>
        </tr>
        <tr>
          <td>Assisted living community (large RCFE)</td>
          <td>40–150+ residents</td>
          <td>Apartment-style building with shared dining and amenities</td>
        </tr>
      </tbody>
    </table>
    <p>
      Both hold the same RCFE license; the experience is very different. For families
      weighing the trade-offs, see our guide to{' '}
      <Link to="/guides/board-and-care-vs-assisted-living">
        board and care vs. assisted living
      </Link>.
    </p>

    <h2 id="how-to-verify">How to verify any RCFE license</h2>
    <p>
      Anyone can verify a California RCFE in a few minutes. The CDSS Community Care
      Licensing search is public and free.
    </p>
    <ol>
      <li>
        Go to the{' '}
        <a
          href="https://www.cdss.ca.gov/inforesources/community-care-licensing"
          target="_blank"
          rel="noopener noreferrer"
        >
          CDSS Community Care Licensing
        </a>{' '}
        site and find the facility search.
      </li>
      <li>
        Search by facility name, license number, or address. Each RCFE has a 9-digit
        license number (e.g., 347xxxxxx).
      </li>
      <li>
        Review the facility's <strong>license status</strong> (current, on probation,
        closed, pending), capacity, capacity-vs-occupancy, and the public{' '}
        <strong>inspection and citation history</strong>.
      </li>
    </ol>
    <p>
      Every facility listed on Sacramento ElderCare Directory shows the CDSS license
      number and status on its detail page so you can verify it without leaving the
      site, but it's still worth confirming directly with the state before signing a
      residency agreement.
    </p>

    <div className="guide-callout">
      <p>
        <strong>Red flag to watch for:</strong> a community that won't share its license
        number, or whose license status is anything other than &quot;current.&quot;
        Active probation or unresolved serious citations are reasons to ask hard
        questions or move on.
      </p>
    </div>

    <h2 id="how-this-applies-in-sacramento">How this applies in Sacramento</h2>
    <p>
      The Sacramento metro has hundreds of RCFE-licensed senior care homes, from large
      assisted living communities to small 6-bed board and care houses. Every community
      listed on this directory is RCFE-licensed and verified against the current CDSS
      record — that's the directory's editorial bar.
    </p>
    <p>
      To browse by city: {' '}
      <Link to="/assisted-living/sacramento">Sacramento</Link>,{' '}
      <Link to="/assisted-living/elk-grove">Elk Grove</Link>,{' '}
      <Link to="/assisted-living/roseville">Roseville</Link>,{' '}
      <Link to="/assisted-living/folsom">Folsom</Link>,{' '}
      <Link to="/assisted-living/carmichael">Carmichael</Link>,{' '}
      <Link to="/assisted-living/citrus-heights">Citrus Heights</Link>,{' '}
      <Link to="/assisted-living/rancho-cordova">Rancho Cordova</Link>, or see the{' '}
      <Link to="/board-and-care-homes/sacramento">small board and care homes in
      Sacramento</Link>.
    </p>
    <p>
      If you're new to all of this and want to talk it through, our placement advisors
      are based in Sacramento and the service is free to families.{' '}
      <Link to="/contact">Request a callback</Link>.
    </p>

    <h2 id="sources">Authoritative sources</h2>
    <ul>
      <li>
        <a
          href="https://www.cdss.ca.gov/inforesources/community-care-licensing"
          target="_blank"
          rel="noopener noreferrer"
        >
          CA Department of Social Services — Community Care Licensing Division
        </a>{' '}
        (regulations, license verification, citation history)
      </li>
      <li>
        <a
          href="https://www.cdss.ca.gov/inforesources/community-care-licensing/policies-and-regulations/laws-and-regulations"
          target="_blank"
          rel="noopener noreferrer"
        >
          Title 22 Regulations — RCFE rules
        </a>{' '}
        (the full text of what RCFEs are legally required to do)
      </li>
      <li>
        <a
          href="https://canhr.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          California Advocates for Nursing Home Reform (CANHR)
        </a>{' '}
        (resident rights and complaint resources)
      </li>
    </ul>
  </GuideArticle>
);

export default WhatIsAnRcfeGuide;
