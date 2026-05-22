import { Link } from 'react-router-dom';
import GuideArticle from '../components/GuideArticle';
import type { FaqEntry } from '../lib/schema';

const PUBLISHED = '2026-05-22';
const MODIFIED = '2026-05-22';

const faqEntries: FaqEntry[] = [
  {
    question: 'What is the main difference between assisted living and memory care?',
    answer:
      "Assisted living supports older adults who need help with daily tasks (bathing, dressing, medications, meals) but are largely cognitively intact. Memory care is a specialized, secured environment for people living with Alzheimer's or another form of dementia, with staff trained in dementia care and a building designed to prevent wandering.",
  },
  {
    question: 'Is memory care more expensive than assisted living?',
    answer:
      'Yes, memory care almost always costs more than assisted living at the same community — typically several hundred to a few thousand dollars more per month — because staffing ratios are higher, the building has security features, and residents need more hands-on care. Exact pricing varies by community and care level; ask each one for a written quote.',
  },
  {
    question: 'Can someone move from assisted living to memory care later?',
    answer:
      "Often yes, if the community has both on one campus. Many Sacramento-area communities offer assisted living and memory care side by side so a resident can transition without leaving the building when their needs change. Ask each community about its policy for transferring between levels of care.",
  },
  {
    question: 'Does my parent need memory care if they have early-stage dementia?',
    answer:
      "Not always. People in early-stage dementia can sometimes do well in assisted living, especially if the community has a dementia-aware staff and the resident is not at risk of wandering. As the disease progresses, most families eventually need memory care. A geriatric care manager, the diagnosing physician, or a placement advisor can help you read the timing.",
  },
  {
    question: 'Is memory care the same as a nursing home?',
    answer:
      'No. Memory care in California is typically a Residential Care Facility for the Elderly (RCFE) — non-medical care licensed by the CA Department of Social Services. A nursing home (skilled nursing facility, or SNF) provides 24-hour licensed nursing care for medically complex needs and is regulated separately. Most people with dementia who are otherwise medically stable live in RCFE memory care, not a nursing home.',
  },
];

const AssistedLivingVsMemoryCareGuide = () => (
  <GuideArticle
    slug="assisted-living-vs-memory-care"
    section="guides"
    title="Assisted Living vs. Memory Care: How to Choose (2026 Guide)"
    metaDescription="Compare assisted living vs. memory care — services, cost, who needs which, and how to choose. A plain-language family guide for Sacramento-area decisions."
    h1="Assisted Living vs. Memory Care: How to Choose"
    datePublished={PUBLISHED}
    dateModified={MODIFIED}
    faqEntries={faqEntries}
    primaryCta={{
      label: 'Compare Sacramento communities',
      to: '/locations',
    }}
    intro={
      <>
        <p>
          <strong>Assisted living</strong> is for older adults who need help with everyday
          tasks but are largely cognitively intact. <strong>Memory care</strong> is a
          specialized, secured form of assisted living for people living with Alzheimer's
          or another form of dementia, with extra staffing, dementia-trained caregivers,
          and a building designed to prevent wandering.
        </p>
        <p>
          The right choice usually comes down to one question: is your loved one safe in
          an environment where the front door isn't locked? If yes, assisted living is
          usually a fit. If no — or if their care needs are dominated by memory loss —
          memory care is the safer setting.
        </p>
      </>
    }
  >
    <h2 id="what-is-assisted-living">What assisted living is (and isn't)</h2>
    <p>
      Assisted living is residential housing for older adults who don't need full-time
      medical care but do need help with what care professionals call{' '}
      <em>activities of daily living</em> (ADLs) — bathing, dressing, grooming, walking,
      getting to and from the bathroom — or instrumental tasks like managing medications,
      preparing meals, and getting to appointments.
    </p>
    <p>
      In California, the licensing category is <strong>Residential Care Facility for the
      Elderly (RCFE)</strong>, regulated by the{' '}
      <a
        href="https://www.cdss.ca.gov/inforesources/community-care-licensing"
        target="_blank"
        rel="noopener noreferrer"
      >
        CA Department of Social Services, Community Care Licensing Division
      </a>{' '}
      (CDSS/CCLD). RCFE is non-medical care: caregivers help with day-to-day living, and
      outside healthcare providers (a primary doctor, home-health agency, hospice) come
      in as needed. If you want a deeper explainer, see{' '}
      <Link to="/guides/what-is-an-rcfe">What is an RCFE?</Link>
    </p>
    <p>
      Assisted living comes in two main physical forms: <strong>larger communities</strong>{' '}
      (anywhere from a few dozen to 150+ apartments, with shared dining and amenities)
      and <strong>board and care homes</strong> (small RCFEs, usually 6 residents, in a
      single-family house). For a side-by-side, see{' '}
      <Link to="/guides/board-and-care-vs-assisted-living">
        Board and care vs. assisted living
      </Link>.
    </p>

    <h2 id="what-is-memory-care">What memory care is</h2>
    <p>
      Memory care is a specialized form of assisted living for people with{' '}
      <strong>Alzheimer's disease, vascular dementia, Lewy body dementia, frontotemporal
      dementia,</strong> or another progressive cognitive impairment. The physical building
      and the staffing model are both different from general assisted living.
    </p>
    <p>What you typically find in a memory care setting:</p>
    <ul>
      <li>
        A <strong>secured environment</strong> — doors that don't open from the inside
        without a code, enclosed outdoor courtyards, alarm systems on exits — so
        residents at risk of wandering stay safe.
      </li>
      <li>
        <strong>Higher staffing ratios</strong> and caregivers trained specifically in
        dementia behaviors (sundowning, repetitive questions, agitation, refusal of care).
      </li>
      <li>
        <strong>Simplified, calming spaces</strong> with clear sightlines, visual cues,
        and consistent routines.
      </li>
      <li>
        <strong>Activities designed for cognitive ability</strong> — music, reminiscence
        work, sensory activities, light movement — rather than the bingo-and-bus-trip
        calendar of general assisted living.
      </li>
    </ul>
    <p>
      Many California memory care neighborhoods are licensed under the RCFE category with
      a <strong>Dementia Care Waiver</strong> from CDSS that authorizes the community to
      accept residents with cognitive impairment. The Alzheimer's Association maintains a{' '}
      <a
        href="https://www.alz.org/help-support/caregiving/care-options"
        target="_blank"
        rel="noopener noreferrer"
      >
        useful overview of memory care
      </a>{' '}
      that's worth a read if you're new to this.
    </p>

    <h2 id="side-by-side">Side-by-side comparison</h2>
    <p>
      The differences look subtle on paper but matter a lot day-to-day:
    </p>
    <table>
      <thead>
        <tr>
          <th>Feature</th>
          <th>Assisted living</th>
          <th>Memory care</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Who it's for</td>
          <td>Older adults needing help with daily tasks; cognition largely intact</td>
          <td>Adults with diagnosed dementia or significant cognitive impairment</td>
        </tr>
        <tr>
          <td>Security</td>
          <td>Open building; residents come and go freely</td>
          <td>Secured doors, enclosed courtyards, alarmed exits</td>
        </tr>
        <tr>
          <td>Staff training</td>
          <td>General caregiver training</td>
          <td>Dementia-specific training (behaviors, communication, redirection)</td>
        </tr>
        <tr>
          <td>Staff-to-resident ratio</td>
          <td>Lower (residents are more independent)</td>
          <td>Higher (residents need more cueing and direct help)</td>
        </tr>
        <tr>
          <td>Programming</td>
          <td>Outings, classes, fitness, hobbies</td>
          <td>Sensory, music, reminiscence, calming routines</td>
        </tr>
        <tr>
          <td>Typical cost</td>
          <td>Lower</td>
          <td>Higher — usually several hundred to a few thousand more per month</td>
        </tr>
        <tr>
          <td>California license</td>
          <td>RCFE</td>
          <td>RCFE, typically with a Dementia Care Waiver</td>
        </tr>
      </tbody>
    </table>

    <h2 id="how-to-choose">How to decide which one fits</h2>
    <p>
      Three questions sort most families quickly:
    </p>
    <ol>
      <li>
        <strong>Is there a dementia diagnosis?</strong> If a doctor has diagnosed
        Alzheimer's or another dementia, that's a strong signal toward memory care — at
        least eventually. People in early stages sometimes do well in assisted living
        with a dementia-aware staff; people in middle and later stages almost always need
        memory care.
      </li>
      <li>
        <strong>Is wandering a risk?</strong> If your loved one has left home and gotten
        lost, opened the door at night, or left the stove on, an unsecured assisted
        living building is not a safe setting. Memory care exists because of exactly this
        risk.
      </li>
      <li>
        <strong>What's the resistance to care like?</strong> If a parent refuses showers,
        argues about medications, or becomes agitated when redirected, dementia-trained
        staff in memory care will handle it better than general assisted living
        caregivers — and your loved one will get more dignified care.
      </li>
    </ol>
    <p>
      If you're between the two, ask the community whether their assisted living side
      can accept a resident with mild cognitive impairment, and what the criteria are
      for moving to memory care. Many Sacramento-area communities run both on one
      campus so a future move means walking down the hall, not packing the apartment.
    </p>

    <h2 id="cost">What it costs (and who pays)</h2>
    <p>
      Memory care costs more than assisted living at the same community — typically
      several hundred to a few thousand dollars more per month — because of higher
      staffing, training, and the building's security features. Exact pricing varies a
      lot by community, region, room type (shared vs. private), and care level.
    </p>
    <p>
      Most families pay out of pocket from savings, a long-term care insurance policy,
      proceeds from selling a home, or family contribution. <strong>Medicare does not
      pay</strong> for assisted living or memory care room and board.{' '}
      <strong>Medi-Cal</strong> generally doesn't either, but California's{' '}
      <strong>Assisted Living Waiver (ALW)</strong> can cover care services in
      participating communities for eligible residents. For a fuller breakdown, see{' '}
      <Link to="/resources/medi-cal-and-assisted-living">
        Does Medi-Cal pay for assisted living?
      </Link>{' '}
      Veterans may qualify for the VA's <strong>Aid and Attendance</strong> benefit, which
      can offset cost.
    </p>

    <h2 id="sacramento">How this applies in Sacramento</h2>
    <p>
      In the Sacramento metro, families generally have three structural choices:
    </p>
    <ul>
      <li>
        <strong>Larger assisted living communities</strong> with a separate memory care
        neighborhood on the same campus — common in Roseville, Folsom, Elk Grove, and
        parts of Sacramento. Good for families who want a single setting that can adapt
        as their loved one's needs change.
      </li>
      <li>
        <strong>Stand-alone memory care communities</strong> — purpose-built for
        dementia. Often a strong fit when memory loss is the dominant need from day one.
      </li>
      <li>
        <strong>Board and care homes (small 6-bed RCFEs)</strong> — a quieter,
        home-like alternative. Some are dementia-licensed and excellent for residents who
        do better in a small environment than a 100-resident building. See{' '}
        <Link to="/board-and-care-homes/sacramento">
          board &amp; care homes in Sacramento
        </Link>{' '}
        for what's currently available.
      </li>
    </ul>
    <p>
      Browse current options by city:{' '}
      <Link to="/assisted-living/sacramento">assisted living in Sacramento</Link>,{' '}
      <Link to="/assisted-living/elk-grove">Elk Grove</Link>,{' '}
      <Link to="/assisted-living/roseville">Roseville</Link>,{' '}
      <Link to="/assisted-living/folsom">Folsom</Link>,{' '}
      <Link to="/assisted-living/carmichael">Carmichael</Link>, or see the full{' '}
      <Link to="/memory-care">Sacramento memory care</Link> overview.
    </p>

    <div className="guide-callout">
      <p>
        <strong>If you're not sure which level your loved one needs:</strong>{' '}
        a Sacramento-based placement advisor can do a free phone assessment, listen to
        the situation, and shortlist communities at the right level of care.{' '}
        <Link to="/contact">Request a callback</Link>.
      </p>
    </div>

    <h2 id="sources">Authoritative sources</h2>
    <ul>
      <li>
        <a
          href="https://www.cdss.ca.gov/inforesources/community-care-licensing"
          target="_blank"
          rel="noopener noreferrer"
        >
          California Department of Social Services — Community Care Licensing
        </a>{' '}
        (RCFE regulations and license verification)
      </li>
      <li>
        <a href="https://www.alz.org/" target="_blank" rel="noopener noreferrer">
          Alzheimer's Association
        </a>{' '}
        (dementia stages, care options, family support)
      </li>
      <li>
        <a href="https://www.medicare.gov/" target="_blank" rel="noopener noreferrer">
          Medicare.gov
        </a>{' '}
        (what Medicare covers and doesn't)
      </li>
    </ul>
  </GuideArticle>
);

export default AssistedLivingVsMemoryCareGuide;
