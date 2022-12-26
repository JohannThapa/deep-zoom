import CloverIIIF from "@samvera/clover-iiif";
const id =
  "https://raw.githubusercontent.com/samvera-labs/clover-iiif/main/public/fixtures/iiif/manifests/sample.json";

  export default function Clover() {
    const manifestId = "https://manifests.collections.yale.edu/ycba/obj/199";
  
    return (
      <CloverIIIF
        id={manifestId}
        options={{
          renderAbout: false,
          showIIIFBadge: false,
          showInformationToggle: false,
          showTitle: true
        }}
      />
    );
  }
  