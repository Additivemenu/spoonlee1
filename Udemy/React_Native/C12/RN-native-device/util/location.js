const GOOGLE_API_KEY = "AIzaSyDisIEVva5PXEEZkfpPvFTocpSdzKEIEy0";

export function getMapPreview(lat, lng) {      // helper function that constructs the Url to Google Map server
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}Y&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;

  return imagePreviewUrl;
}
