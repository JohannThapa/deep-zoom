// If you like my work, please consider supporting it at https://www.patreon.com/iangilman

// Drag an image to move it around. Drag the background to pan. 

var highsmith = {
    Image: {
        xmlns: "http://schemas.microsoft.com/deepzoom/2008",
        Url: "https://openseadragon.github.io/example-images/highsmith/highsmith_files/",
        Format: "jpg",
        Overlap: "2",
        TileSize: "256",
        Size: {
            Width:  "7026",
            Height: "9221"
        }
    }
};

var duomo = {
    Image: {
        xmlns: "http://schemas.microsoft.com/deepzoom/2008",
        Url: "https://openseadragon.github.io/example-images/duomo/duomo_files/",
        Format: "jpg",
        Overlap: "2",
        TileSize: "256",
        Size: {
            Width:  "13920",
            Height: "10200"
        }
    }
};

var viewer = OpenSeadragon({
    id: "openseadragon1",
    prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
    tileSources: [
        {
            tileSource: highsmith,
            x: 0
        },
        {
            tileSource: duomo,
            x: 1.1
        }
    ]
});

function areAllFullyLoaded() {
  var tiledImage;
  var count = viewer.world.getItemCount();
  for (var i = 0; i < count; i++) {
    tiledImage = viewer.world.getItemAt(i);
    if (!tiledImage.getFullyLoaded()) {
      return false;
    }
  }
  return true;
}

var isFullyLoaded = false;

function updateLoadingIndicator() {
  // Note that this function gets called every time isFullyLoaded changes, which it will do as you 
  // zoom and pan around. All we care about is the initial load, though, so we are just hiding the 
  // loading indicator and not showing it again. 
  if (isFullyLoaded) {
    document.querySelector('.loading').style.display = 'none';
  }
}

viewer.world.addHandler('add-item', function(event) {
  var tiledImage = event.item;
  tiledImage.addHandler('fully-loaded-change', function() {
    var newFullyLoaded = areAllFullyLoaded();
    if (newFullyLoaded !== isFullyLoaded) {
      isFullyLoaded = newFullyLoaded;
      updateLoadingIndicator();
    }
  });
});