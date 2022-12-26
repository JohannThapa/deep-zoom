

import * as React from "react";
import OpenSeadragonViewer from "../../openSeadragonViewer";
import { dummy } from "../../utils/dummy";

const manifestUrl =
"https://iiif.stack.rdc.library.northwestern.edu/public/06/20/ea/ca/-5/4e/6-/41/81/-a/85/8-/39/dd/ea/0b/b1/c5-manifest.json";

export default function IffViewer() {
    return (
      <div>
     <OpenSeadragonViewer
    manifest={dummy}
    manifestUrl={manifestUrl}
    options={{
      showDropdown: true,
      showThumbnails: true,
      showToolbar: true,
      deepLinking: true,
      height: 800,
    }}
  />
      </div>
    );
  }