/**
 * Regression tests for the CCLD curated-record matcher.
 *
 * Run: npm run test:matcher   (node --test, built in — no test-runner dependency)
 *
 * Every case below is a real row from assisted-living-sacramento-area.csv and a
 * real record from src/data/curated.ts. The false-positive cases are the two
 * that shipped wrong licence numbers to live community pages in August 2026,
 * one of them masking an ON PROBATION licence behind a green verified badge.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { matchesCurated, nameTokensJaccard, MIN_NAME_TOKENS, NAME_SCORE_FLOOR } from './import-cdss.mjs';

const csv = (facilityName, streetAddress) => ({ facilityName, streetAddress });
const cur = (name, street_address) => ({ name, street_address });

/* ------------------------------- the scorer ------------------------------- */

test('Jaccard divides by union, not by the smaller set', () => {
  // The exact pair that produced a false positive: a one-token name used to
  // score a perfect 1.0 against anything containing that token.
  const grove = ['GROVE'];
  const serenity = ['LOVE', 'SERENITY', 'ELK', 'GROVE', 'III'];
  assert.equal(nameTokensJaccard(grove, serenity), 1 / 5);
  assert.ok(nameTokensJaccard(grove, serenity) < NAME_SCORE_FLOOR);
});

test('identical token sets score 1', () => {
  assert.equal(nameTokensJaccard(['VITA', 'BELLA'], ['VITA', 'BELLA']), 1);
});

test('empty token sets score 0 rather than dividing by zero', () => {
  assert.equal(nameTokensJaccard([], ['VITA']), 0);
  assert.equal(nameTokensJaccard(['VITA'], []), 0);
  assert.equal(nameTokensJaccard([], []), 0);
});

/* --------------------------- the false positives -------------------------- */

test('REGRESSION: GROVE HOME CARE does not match Love and Serenity of Elk Grove III', () => {
  // Same ZIP (95624), different building. Shipped #342700018 onto the wrong
  // page and printed a licence date three and a half years off.
  assert.equal(
    matchesCurated(
      csv('Grove Home Care', '8410 Terracotta Circle'),
      cur('Love and Serenity of Elk Grove III', '9442 Mazatlan Way'),
    ),
    false,
  );
});

test('REGRESSION: ABOUNDING LOVE III does not match Abounding Love Home Care', () => {
  // Same ZIP (95823), different building. Shipped #342700730 onto a facility
  // whose real licence is ON PROBATION, so the page showed a green verified
  // shield instead of the amber warning panel.
  assert.equal(
    matchesCurated(
      csv('Abounding Love III', '5105 Village Wood Drive'),
      cur('Abounding Love - Assisted Living Care Home', '27 Tristan Cir'),
    ),
    false,
  );
});

test('a different operator at the same address is rejected on name score', () => {
  // 3612 Eastern Ave is now licensed to a different operator. The address
  // agrees, so address-agreement alone must not be sufficient to match.
  assert.equal(
    matchesCurated(
      csv('Golden Heritage Senior Care II', '3612 Eastern Ave'),
      cur('Bella Villa Elderly Care II Assisted Living', '3612 Eastern Ave'),
    ),
    false,
  );
  assert.equal(
    matchesCurated(
      csv('Sacramento Senior Living III', '8901 Sonoma Valley Way'),
      cur('Love and Serenity of Vintage Park - Senior Care Home', '8901 Sonoma Valley Way'),
    ),
    false,
  );
});

test('a name that reduces below the token floor never matches', () => {
  assert.ok(MIN_NAME_TOKENS >= 2);
  // "Senior Care Home" reduces to {} — every token is a stopword.
  assert.equal(
    matchesCurated(csv('Senior Care Home', '27 Tristan Cir'), cur('Abounding Love', '27 Tristan Cir')),
    false,
  );
});

/* ---------------------------- the true positives -------------------------- */

test('correct pairs still match across trade-name differences', () => {
  const pairs = [
    [csv('Abounding Love Home Care', '27 Tristan Cir'), cur('Abounding Love - Assisted Living Care Home', '27 Tristan Cir')],
    [csv('Abounding Love III', '5105 Village Wood Drive'), cur('Abounding Love III - Assisted Living Senior Care', '5105 Village Wood Drive')],
    [csv('Love and Serenity of Elk Grove III', '9442 Mazatlan Way'), cur('Love and Serenity of Elk Grove III', '9442 Mazatlan Way')],
    [csv('Love and Serenity of Elk Grove II', '9279 Orange Crest Court'), cur('Love and Serenity of Elk Grove II - Senior Care', '9279 Orange Crest Ct')],
    [csv('Vita Bella Elderly Care', '4082 73rd Street'), cur('Vita Bella Elderly Care - Assisted Living Facility', '4082 73rd St')],
    [csv('Villa Natomas Elderly Care LLC', '540 Alcantar Cir'), cur('Villa Natomas Elderly Care', '540 Alcantar Circle')],
    [csv('Golden Legacy Elderly Care III', '7695 River Village Dr'), cur('Golden Legacy Elderly Care III - Greenhaven Assisted Senior Living', '7695 River Village Dr')],
    [csv('Abounding Peace Elderly Care', '7124 Hayward Dr'), cur('Abounding Peace Elderly Care - Assisted Living', '7124 Hayward Drive')],
  ];
  for (const [row, curated] of pairs) {
    assert.equal(matchesCurated(row, curated), true, `${row.facilityName} <-> ${curated.name}`);
  }
});

test('street-suffix spelling differences do not break address agreement', () => {
  // Curated records write "Ct"/"St"/"Circle"; the roster writes
  // "COURT"/"STREET"/"CIR". normAddress reconciles both directions.
  assert.equal(
    matchesCurated(csv('Vita Bella Elderly Care', '4082 73RD STREET'), cur('Vita Bella Elderly Care', '4082 73rd St')),
    true,
  );
});

test('a matching name at a different address is rejected', () => {
  assert.equal(
    matchesCurated(csv('Vita Bella Elderly Care', '9999 Elsewhere Ave'), cur('Vita Bella Elderly Care', '4082 73rd St')),
    false,
  );
});
