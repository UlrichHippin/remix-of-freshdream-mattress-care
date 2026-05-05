import LegalPage from "@/components/LegalPage";

export default function Disclaimer() {
  return (
    <LegalPage
      title="Cleaning Disclaimer | FreshDream Mattress Care"
      description="Honest expectations about cleaning results for mattresses, sofas and rugs."
      heading="Cleaning Disclaimer"
    >
      <p>We always aim for the best possible result, but cleaning outcomes are not guaranteed.</p>
      <h2>What affects results</h2>
      <ul>
        <li>Age and depth of the stain.</li>
        <li>Type of fabric and mattress materials.</li>
        <li>Previous treatments or chemicals used on the item.</li>
        <li>Overall mattress condition.</li>
      </ul>
      <h2>Honest wording</h2>
      <p>Results depend on stain age, depth, fabric and mattress condition. Some older or deeper stains may improve but not disappear completely. We will always share an honest assessment before treatment.</p>
      <h2>Drying &amp; re-use</h2>
      <p>Estimated drying times are guidance only and depend on room ventilation and weather conditions.</p>
    </LegalPage>
  );
}
