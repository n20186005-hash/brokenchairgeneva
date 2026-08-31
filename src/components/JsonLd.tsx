type Props = {
  id?: string;
  data: unknown;
};

/** Renders a JSON-LD structured-data block in <head>/<body>.
 *  `<` is escaped to avoid breaking out of the script tag.
 */
export default function JsonLd({ id, data }: Props) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" id={id} dangerouslySetInnerHTML={{ __html: json }} />;
}
