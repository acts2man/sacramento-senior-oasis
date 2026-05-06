import { Helmet } from 'react-helmet-async';

interface JsonLdProps {
  data: object;
}

const JsonLd = ({ data }: JsonLdProps) => {
  // Escape `<` so a `</script>` substring inside JSON content can never close
  // the <script> tag early. JSON.stringify already escapes `"` and `\`.
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <Helmet>
      <script type="application/ld+json">{json}</script>
    </Helmet>
  );
};

export default JsonLd;
