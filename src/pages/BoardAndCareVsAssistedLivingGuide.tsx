import { Link } from 'react-router-dom';
import GuideArticle from '../components/GuideArticle';
import type { FaqEntry } from '../lib/schema';

const PUBLISHED = '2026-05-22';
const MODIFIED = '2026-05-22';

const faqEntries: FaqEntry[] = [
  {
    question: 'What is the difference between a board and care home and assisted living?',
    answer:
      "A board and care home is a small Residential Care Facility for the Elderly (RCFE) — usually six residents living in a converted single-family house. An assisted living community is a larger RCFE, typically 40 to 150+ apartments with shared dining and amenities. Both hold the same California RCFE license; the day-to-day experience is very different.",
  },
  {
    question: 'Are board and care homes cheaper than assisted living?',
    answer:
      "Sometimes, but not always. Board and care homes often have a simpler base rate and can be a good value for residents who need a lot of hands-on help (because the staff-to-resident ratio is high). Larger assisted living communities advertise lower starting rates but add care-level fees on top. Always ask each option for a fully loaded monthly quote that includes care fees for your loved one's specific needs.",
  },
  {
    question: 'Which is better for someone with dementia?',
    answer:
      "It depends on the person. Some people with dementia do much better in a small, quiet, home-like setting with the same few caregivers every day — that's a board and care strength. Others do better in a purpose-built memory care neighborhood with dementia-trained staff and structured programming. The diagnosis alone doesn't decide it; the person's temperament and stage do.",
  },
  {
    question: 'Are board and care homes regulated the same way as assisted living?',
    answer:
      "Yes. Every California board and care home for older adults and every assisted living community holds the same RCFE license from the Department of Social Services, Community Care Licensing Division (CDSS/CCLD). Same regulations, same inspection process, same public citation record. The size of the building doesn't change the licensing standard.",
  },
  {
    question: 'How do I find good board and care homes in the Sacramento area?',
    answer:
      "Start by looking up RCFE-licensed homes through CDSS, then visit in person. Small homes don't market the way large communities do, so the best ones are often found via local placement advisors who know which homes are well run, which have openings, and which fit a specific care need. Sacramento Assisted Living Directory tracks license-verified board and care homes across the metro.",
  },
];

const BoardAndCareVsAssistedLivingGuide = () => (
  <GuideArticle
    slug="board-and-care-vs-assisted-living"
    section="guides"
    title="Board and Care vs. Assisted Living: Which Is Right? (2026)"
    metaDescription="Board and care homes vs. larger assisted living communities — size, staffing, cost, and which suits your loved one. A clear guide for Sacramento families."
    h1="Board and Care vs. Assisted Living: Which Is Right for Your Loved One?"
    datePublished={PUBLISHED}
    dateModified={MODIFIED}
    faqEntries={faqEntries}
    primaryCta={{
      label: 'Compare Sacramento options',
      to: '/board-and-care-homes/sacramento',
    }}
    intro={
      <>
        <p>
          <strong>Board and care homes</strong> and <strong>assisted living
          communities</strong> are the same thing on paper — both are California
          Residential Care Facilities for the Elderly (RCFEs). In practice they are very
          different settings, and the choice between them is one of the most underrated
          decisions families make.
        </p>
        <p>
          The short version: board and care is a small, home-like setting with a handful
          of residents and high-touch caregiving. Assisted living is a larger, more
          social community with apartments, dining, and amenities. Neither is &quot;better&quot;
          in the abstract — they suit different people.
        </p>
      </>
    }
  >
    <h2 id="what-is-a-board-and-care">What is a board and care home?</h2>
    <p>
      A <strong>board and care home</strong> (sometimes called a senior care home, adult
      residential care home, or 6-bed RCFE) is a single-family house licensed by the
      state of California to provide non-medical residential care to a small number of
      older adults — typically <strong>six residents</strong>, the most common license
      capacity, with some up to ten.
    </p>
    <p>
      Picture a normal house on a normal residential street, with shared common rooms, a
      few bedrooms (some private, some shared), and live-in or shift caregivers. Meals
      are family-style. The same two or three caregivers know every resident by name.
      The license category is the same RCFE license held by larger assisted living
      buildings — see{' '}
      <Link to="/guides/what-is-an-rcfe">What is an RCFE?</Link> for the full
      explanation.
    </p>

    <h2 id="what-is-assisted-living">What is a larger assisted living community?</h2>
    <p>
      A <strong>larger assisted living community</strong> is a purpose-built apartment
      building, usually 40 to 150+ residents, with private studios or one-bedroom
      apartments, shared dining rooms, activity calendars, fitness rooms, beauty salons,
      and often a memory care neighborhood on the same campus. Caregivers work in
      shifts; departments handle activities, dining, nursing oversight, and
      housekeeping. For more on the broader category, see{' '}
      <Link to="/guides/assisted-living-vs-memory-care">
        Assisted living vs. memory care
      </Link>.
    </p>

    <h2 id="side-by-side">Side-by-side comparison</h2>
    <table>
      <thead>
        <tr>
          <th>Feature</th>
          <th>Board and care home</th>
          <th>Larger assisted living</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Size</td>
          <td>~6 residents (most common); some up to 10</td>
          <td>40–150+ residents</td>
        </tr>
        <tr>
          <td>Setting</td>
          <td>Single-family house in a residential neighborhood</td>
          <td>Purpose-built apartment community</td>
        </tr>
        <tr>
          <td>Room type</td>
          <td>Bedroom in the home; some private, some shared</td>
          <td>Private studio or 1BR apartment with full bathroom</td>
        </tr>
        <tr>
          <td>Caregiver-to-resident ratio</td>
          <td>Often higher (1:3 to 1:6)</td>
          <td>Lower; varies by community and shift</td>
        </tr>
        <tr>
          <td>Caregiver continuity</td>
          <td>Same few caregivers every day</td>
          <td>Rotating staff across multiple departments</td>
        </tr>
        <tr>
          <td>Meals</td>
          <td>Family-style, cooked in the home</td>
          <td>Restaurant-style dining room, multiple seatings</td>
        </tr>
        <tr>
          <td>Activities</td>
          <td>Informal: TV, walks, music, simple outings</td>
          <td>Full calendar: classes, outings, fitness, entertainment</td>
        </tr>
        <tr>
          <td>Social scene</td>
          <td>Quiet, family-like</td>
          <td>Active community of dozens of peers</td>
        </tr>
        <tr>
          <td>License</td>
          <td>RCFE</td>
          <td>RCFE</td>
        </tr>
        <tr>
          <td>Typical cost</td>
          <td>Often all-inclusive base rate; can be a good value at higher care levels</td>
          <td>Lower base rate plus care-level fees that can add up</td>
        </tr>
      </tbody>
    </table>

    <h2 id="strengths-board-and-care">Where board and care shines</h2>
    <ul>
      <li>
        <strong>High-need residents.</strong> When a person needs a lot of hands-on
        help, a higher caregiver ratio and consistent staff usually translate to better
        day-to-day care.
      </li>
      <li>
        <strong>Introverts and quiet personalities.</strong> A large community can be
        overwhelming. A house with five other residents feels more like home for
        someone who never enjoyed crowds.
      </li>
      <li>
        <strong>Dementia residents who do better in small settings.</strong> Some people
        with dementia are calmer with a familiar small group than in a 100-resident
        building, even with memory care training.
      </li>
      <li>
        <strong>Cost predictability at higher care levels.</strong> Many board and care
        homes quote a single monthly rate that already includes the help your loved
        one needs.
      </li>
      <li>
        <strong>End-of-life continuity.</strong> Many small homes are willing to keep a
        resident on hospice through end of life so they don't have to move.
      </li>
    </ul>

    <h2 id="strengths-assisted-living">Where larger assisted living shines</h2>
    <ul>
      <li>
        <strong>Active, social seniors.</strong> If your loved one will use the dining
        room, the activities, the salon, and the outings, the experience is fuller in a
        larger community.
      </li>
      <li>
        <strong>Couples needing different levels of care.</strong> Larger communities
        often have independent living, assisted living, and memory care on one campus, so
        spouses can be steps apart even when one needs more help.
      </li>
      <li>
        <strong>Private apartments matter.</strong> If your loved one wants their own
        kitchenette and their own front door — and most do — a purpose-built apartment
        is hard to beat.
      </li>
      <li>
        <strong>On-site amenities and programming.</strong> Fitness instructors, music
        events, chaplains, beauty salons, and resident-led clubs are standard in larger
        communities, rare in 6-bed homes.
      </li>
    </ul>

    <h2 id="cost-realities">Cost realities</h2>
    <p>
      A common misconception: &quot;board and care is the cheap option.&quot; Sometimes,
      yes. But the honest answer is that for residents with significant care needs,
      board and care can come out at or above the all-in cost of larger assisted living
      because the small home already builds heavy care into the base rate.
    </p>
    <p>
      Larger communities almost always quote a base rate (the apartment + standard
      services) plus a <strong>care-level fee</strong> determined by an assessment.
      The advertised &quot;starts at&quot; price you see in marketing is rarely what
      your family will pay. Ask both kinds of community for a written, fully loaded
      monthly quote that reflects your loved one's actual needs before comparing.
    </p>
    <p>
      Neither Medicare nor (in most cases) Medi-Cal pays for assisted living room and
      board. California's <strong>Assisted Living Waiver</strong> can help with care
      services in some participating larger communities for eligible residents — see{' '}
      <Link to="/resources/medi-cal-and-assisted-living">
        Does Medi-Cal pay for assisted living?
      </Link>{' '}
      for the details. Board and care homes generally are not part of the ALW program.
    </p>

    <h2 id="how-to-decide">How to decide which fits</h2>
    <p>Three questions sort most families:</p>
    <ol>
      <li>
        <strong>What does your loved one's day actually look like?</strong> If they were
        social before and want to stay social — group meals, classes, a calendar of
        things to do — go larger. If they prefer quiet and a small, predictable group,
        go smaller.
      </li>
      <li>
        <strong>How much help do they need today, and how much next year?</strong> If
        care needs are high and rising fast, a small home with a high caregiver ratio
        often delivers better care per dollar. If care needs are light, a larger
        community's base rate may be the better value.
      </li>
      <li>
        <strong>Do they need (or insist on) a private apartment with their own
        bathroom and kitchenette?</strong> If yes, that points to a larger community.
        Some board and care homes offer private rooms but few offer apartment-style
        living.
      </li>
    </ol>

    <div className="guide-callout">
      <p>
        <strong>The reality:</strong> the &quot;right&quot; answer often becomes obvious
        only after you've toured a few of each. A good placement advisor will deliberately
        send you to one of each kind so you can feel the difference before deciding.
      </p>
    </div>

    <h2 id="sacramento">How this applies in Sacramento</h2>
    <p>
      The Sacramento metro is unusually rich in <strong>both</strong> options. There are
      large modern assisted living communities in Roseville, Folsom, Elk Grove, and
      central Sacramento, and hundreds of small RCFE board and care homes scattered
      across Sacramento, Carmichael, Citrus Heights, Fair Oaks, Antelope, and other
      neighborhoods.
    </p>
    <p>
      Start your research here:
    </p>
    <ul>
      <li>
        <Link to="/board-and-care-homes/sacramento">
          Board &amp; care homes in Sacramento
        </Link>{' '}
        — small license-verified RCFEs in the city
      </li>
      <li>
        <Link to="/assisted-living/sacramento">Assisted living in Sacramento</Link> —
        the larger-community side of the same market
      </li>
      <li>
        <Link to="/assisted-living/elk-grove">Elk Grove</Link>,{' '}
        <Link to="/assisted-living/roseville">Roseville</Link>,{' '}
        <Link to="/assisted-living/folsom">Folsom</Link>,{' '}
        <Link to="/assisted-living/carmichael">Carmichael</Link> — suburban options
      </li>
    </ul>
    <p>
      Need help comparing? A Sacramento-based advisor can tour with you and translate
      what you see.{' '}
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
          CA Department of Social Services — Community Care Licensing
        </a>{' '}
        (RCFE rules and license verification)
      </li>
      <li>
        <a
          href="https://canhr.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          California Advocates for Nursing Home Reform (CANHR)
        </a>{' '}
        (resident rights, complaint history, advocacy)
      </li>
      <li>
        <a
          href="https://www.aarp.org/caregiving/basics/info-2017/types-of-care-housing-options.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          AARP — Senior housing options overview
        </a>
      </li>
    </ul>
  </GuideArticle>
);

export default BoardAndCareVsAssistedLivingGuide;
