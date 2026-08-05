import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { writeFileSync, mkdirSync, readFileSync } from "fs";
import { componentTagger } from "lovable-tagger";
import { generateSitemap } from "./src/utils/sitemapGenerator";
import { auditLicenseClaims, formatLicenseAuditFailure } from "./src/utils/licenseAudit";
import { locations } from "./src/data/locations";
import { LICENSE_ENRICHMENT } from "./src/data/imported.generated";
import { LICENSE_CORRECTIONS } from "./src/data/licenseCorrections";

const sitemapPlugin = () => ({
  name: "generate-sitemap",
  buildStart() {
    const sitemap = generateSitemap();
    const outPath = path.resolve(__dirname, "public/sitemap.xml");
    mkdirSync(path.dirname(outPath), { recursive: true });
    writeFileSync(outPath, sitemap);
  },
});

/**
 * Licence verification gate.
 *
 * The build FAILS if any facility renders a licence claim the CCLD roster does
 * not substantiate — a licence number absent from the roster, or one whose
 * roster address disagrees with the record's own address.
 *
 * This is deliberately a hard failure rather than a warning. Licence
 * verification is the product's differentiator, this is YMYL content, and the
 * defect this gate exists to prevent shipped a green "verified" badge onto a
 * facility whose real licence was on probation. A warning would have scrolled
 * past in the Netlify build log.
 *
 * It also asserts that every entry in licenseCorrections.ts is redundant —
 * that the importer now produces those values on its own. An override that
 * silently diverges from a fixed importer is how the original bug returns.
 */
const licenseGatePlugin = () => ({
  name: "verify-license-claims",
  buildStart() {
    const csv = readFileSync(
      path.resolve(__dirname, "assisted-living-sacramento-area.csv"),
      "utf8",
    );
    const result = auditLicenseClaims(locations, csv, LICENSE_CORRECTIONS, LICENSE_ENRICHMENT);
    const failure = formatLicenseAuditFailure(result);
    if (failure) {
      this.error(failure);
    }
    const redundant = result.redundantCorrections.length;
    console.log(
      `licence gate: ${result.checked} licence claims substantiated against the CCLD roster` +
        (redundant > 0 ? `; ${redundant} correction(s) confirmed redundant` : ""),
    );
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    licenseGatePlugin(),
    sitemapPlugin(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
